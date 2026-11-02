import fs from 'fs';
const html = fs.readFileSync('/workspace/bushpilot-vr/index.html','utf8');
const phys = html.split('// === PHYSICS START ===')[1].split('// === PHYSICS END ===')[0];
const mod = phys + '\nexport { C, createAircraft, resetAircraft, stepAircraft, qRot, terrainHeight, qAxis };';
fs.writeFileSync('/tmp/phys.mjs', mod);
const { C, createAircraft, stepAircraft, qRot, terrainHeight, qAxis } = await import('/tmp/phys.mjs');
const dt = 1/120, mph = v => (v*2.23694).toFixed(1);
const att = a => { const f = qRot(a.q,[0,0,-1]), r = qRot(a.q,[1,0,0]);
  return { pitch: Math.asin(f[1]), roll: Math.asin(-r[1]), hdg: Math.atan2(-f[0], -f[2]) }; };
// simple autopilot helpers
function wingsLevelHeading(a, hdg0) { const t = att(a); a.ctl.ail = Math.max(-1,Math.min(1, -2.5*t.roll + 1.5*a.w[2]));
  a.ctl.rud = Math.max(-1,Math.min(1, -4*(t.hdg-hdg0)*-1 + 2*a.w[1])); }
// --- 1. idle at rest ---
let a = createAircraft();
for (let i=0;i<120*5;i++) stepAircraft(a,dt);
console.log('Idle 5s: moved', a.pos[2].toFixed(2),'m, y', a.pos[1].toFixed(3),'crashed',a.crashed, 'rpm', a.out.rpm.toFixed(0));
// --- 2. takeoff roll ---
a = createAircraft(); a.ctl.throttle = 1; let liftoff=null, unstick=null, t=0, z0=a.pos[2];
for (let i=0;i<120*40 && !a.crashed;i++) {
  t+=dt; wingsLevelHeading(a, 0);
  const v = a.out.V||0;
  a.ctl.elev = v < 16 ? -0.35 : (v < 22 ? 0.0 : 0.25);   // tail up, then rotate
  if (a.out.wow===0 && v>5) { if (!unstick) unstick = { d: z0-a.pos[2], t, v }; if (liftoff===null) liftoff = { d: z0-a.pos[2], t, v }; }
  if (liftoff && a.out.wow>0 && t < liftoff.t + 3) liftoff = null;   // v0.20: springy gear can skip off a bump first; liftoff = airborne for good
  if (liftoff && t > liftoff.t + 8) break;
  stepAircraft(a,dt);
}
console.log('Takeoff:', liftoff ? `liftoff after ${liftoff.d.toFixed(0)} m, ${liftoff.t.toFixed(1)} s, ${mph(liftoff.v)} mph` : 'NO LIFTOFF', `(first unstick ${unstick?unstick.d.toFixed(0)+' m':'-'})`, '| crashed', a.crashed, a.crashReason, '| 8s later alt', a.pos[1].toFixed(0),'m', 'speed', mph(a.out.V),'mph hdg', (att(a).hdg*57.3).toFixed(1));
// --- airborne helper ---
function airborne(V, alt, thr) { const b = createAircraft(); b.pos=[0,alt,-2000]; b.q=[0,0,0,1]; b.vel=[0,0,-V]; b.power = 0.06+0.94*thr; b.ctl.throttle=thr; return b; }
function altHold(b, h0, st) { const at=att(b); const tp = Math.max(-0.15,Math.min(0.25, 0.01*(h0-b.pos[1]) - 0.03*b.vel[1]));
  const e = 3*(tp-at.pitch) - 1.5*b.w[0]; st.i = Math.max(-1,Math.min(1, st.i + 0.4*e*dt)); b.ctl.elev = Math.max(-1,Math.min(1, st.i + e)); }
// --- 3. cruise full throttle ---
let b = airborne(40, 500, 1), st={i:0};
for (let i=0;i<120*240 && !b.crashed;i++){ altHold(b,500,st); wingsLevelHeading(b,0); stepAircraft(b,dt); }
console.log('Cruise full thr (240s alt hold): ', mph(b.out.V),'mph, alt', b.pos[1].toFixed(0),'m vs', (b.out.vs*196.85).toFixed(0),'fpm elev', b.ctl.elev.toFixed(2), 'alpha deg', (b.out.alpha*57.3).toFixed(1), 'rpm', b.out.rpm.toFixed(0));
// hands-off trim speed (power 55%)
b = airborne(30, 500, 0.55); for (let i=0;i<120*120;i++){ b.ctl.elev=0; wingsLevelHeading(b,0); stepAircraft(b,dt);} 
console.log('Hands-off, 55% power after 120s:', mph(b.out.V),'mph vs', (b.out.vs*196.85).toFixed(0),'fpm');
// --- 4. stall: idle, hold altitude until stall ---
b = airborne(35, 500, 0); st={i:0}; let stallV=null, minV=1e9;
for (let i=0;i<120*90 && !b.crashed;i++){ altHold(b,500,st); wingsLevelHeading(b,0); stepAircraft(b,dt);
  if (b.out.V<minV) minV=b.out.V; if (stallV===null && b.out.alpha > C.ALPHA_STALL) stallV=b.out.V; }
console.log('Stall (idle, level decel): critical AoA reached at', stallV?mph(stallV):'never','mph; min speed', mph(minV),'mph; analytic 1g Vs', mph(Math.sqrt(2*C.MASS*C.G/(C.RHO*C.WING_AREA*(C.CL0+C.CL_ALPHA*C.ALPHA_STALL)))),'mph');
// --- 5. idle glide (pitch-attitude speed hold) ---
b = airborne(32, 500, 0); st={i:0};
for (let i=0;i<120*60;i++){ const V=b.out.V||32, at=att(b), tp=-0.08+0.03*(V-32);
  st.i=Math.max(-1,Math.min(1,st.i+0.3*(tp-at.pitch)*dt)); b.ctl.elev=Math.max(-1,Math.min(1,st.i+3*(tp-at.pitch)-1.5*b.w[0]));
  wingsLevelHeading(b,0); stepAircraft(b,dt);}
console.log('Idle glide @', mph(b.out.V),'mph: sink', (b.out.vs*196.85).toFixed(0),'fpm, L/D', (b.out.V/-b.out.vs).toFixed(1));
// --- 6. careless: full power, no rudder on ground ---
a = createAircraft(); a.ctl.throttle=1; let maxH=0;
for (let i=0;i<120*12 && !a.crashed;i++){ a.ctl.elev = -0.5; stepAircraft(a,dt); maxH=Math.max(maxH,Math.abs(att(a).hdg)); }
console.log('No-rudder full power with tail up: max heading dev', (maxH*57.3).toFixed(0),'deg crashed', a.crashed, a.crashReason);
// --- 7. flaps ---
b = airborne(30, 500, 0); b.ctl.flap = 50; b.flap = 50; st={i:0}; stallV=null; minV=1e9;
const aSF = C.ALPHA_STALL - C.FLAP_DALPHA;
for (let i=0;i<120*90 && !b.crashed;i++){ altHold(b,500,st); wingsLevelHeading(b,0); stepAircraft(b,dt);
  if (b.out.V<minV) minV=b.out.V; if (stallV===null && b.out.alpha > aSF) stallV=b.out.V; }
console.log('Full flap (50) stall, idle level decel: critical AoA at', stallV?mph(stallV):'never','mph; min speed', mph(minV),'mph; analytic 1g Vs', mph(Math.sqrt(2*C.MASS*C.G/(C.RHO*C.WING_AREA*(C.CL0+C.FLAP_CL+C.CL_ALPHA*aSF)))),'mph');
b = airborne(25, 500, 0.55); b.ctl.flap = 50; b.flap = 50; for (let i=0;i<120*120;i++){ b.ctl.elev=0; wingsLevelHeading(b,0); stepAircraft(b,dt);}
console.log('Full flap hands-off, 55% power after 120s:', mph(b.out.V),'mph vs', (b.out.vs*196.85).toFixed(0),'fpm');
b = airborne(25, 500, 0); b.ctl.flap = 50; b.flap = 50; st={i:0};
for (let i=0;i<120*60;i++){ const V=b.out.V||25, at=att(b), tp=-0.12+0.03*(V-23);
  st.i=Math.max(-1,Math.min(1,st.i+0.3*(tp-at.pitch)*dt)); b.ctl.elev=Math.max(-1,Math.min(1,st.i+3*(tp-at.pitch)-1.5*b.w[0]));
  wingsLevelHeading(b,0); stepAircraft(b,dt);}
console.log('Full flap idle glide @', mph(b.out.V),'mph: sink', (b.out.vs*196.85).toFixed(0),'fpm, L/D', (b.out.V/-b.out.vs).toFixed(1));
a = createAircraft(); a.ctl.throttle = 1; a.ctl.flap = 15; a.flap = 15; liftoff=null; unstick=null; t=0; z0=a.pos[2];
for (let i=0;i<120*40 && !a.crashed;i++) { t+=dt; wingsLevelHeading(a, 0); const v = a.out.V||0;
  a.ctl.elev = v < 14 ? -0.35 : (v < 19 ? 0.0 : 0.25); if (a.out.wow===0 && v>5) { if (!unstick) unstick = { d: z0-a.pos[2] }; if (liftoff===null) liftoff = { d: z0-a.pos[2], t, v }; }
  if (liftoff && a.out.wow>0 && t < liftoff.t + 3) liftoff = null;
  if (liftoff && t > liftoff.t + 8) break; stepAircraft(a,dt); }
console.log('Takeoff, 1 notch (15):', liftoff ? `liftoff after ${liftoff.d.toFixed(0)} m, ${liftoff.t.toFixed(1)} s, ${mph(liftoff.v)} mph` : 'NO LIFTOFF', `(first unstick ${unstick?unstick.d.toFixed(0)+' m':'-'})`, '| crashed', a.crashed, a.crashReason, '| 8s later alt', a.pos[1].toFixed(0),'m');

// ===================== v0.20 gear & tyre checks =====================
const D = 57.2958, aw = (lo, hi, x) => Math.max(lo, Math.min(hi, x));
const eye = a => qRot(a.q,[0,0.54,-0.09]).map((x,i)=>x+a.pos[i]);
// rest: spawn settle + 30 s engine off on four surfaces (jitter = max |v| over the last 5 s)
for (const [x,z,l] of [[0,0,'strip'],[2400,-2700,'paddock'],[-2240,-340,'meadow'],[60,-100,'rough']]) {
  const a = createAircraft(); a.engineOut = true; if (x || z) { a.pos[0]=x; a.pos[2]=z; a.pos[1]+=terrainHeight(x,z)+0.02; }
  let p0, late = 0; for (let i=0;i<120*30;i++){ stepAircraft(a,dt); if(i===240) p0=[...a.pos]; if(i>120*25) late=Math.max(late,Math.hypot(...a.vel),Math.hypot(...a.w)); }
  console.log(`Rest ${l}: drift after settle ${(Math.hypot(a.pos[0]-p0[0],a.pos[2]-p0[2])*1000).toFixed(0)} mm, jitter ${late.toExponential(0)} | bungee ${(a.gs[0].s*100).toFixed(1)} cm tyre ${(a.gs[0].d*100).toFixed(1)} cm tail ${(a.gs[2].d*100).toFixed(1)} cm crashed ${a.crashed}`); }
// taxi bumps: eye vertical acceleration RMS at 5 m/s
for (const [x,l] of [[0,'strip'],[40,'rough']]) { const a=createAircraft(); a.pos[0]=x; a.pos[1]+=terrainHeight(x,0); a.ctl.throttle=0.3; let le=null, lv=null, s2=0, n=0;
  for (let i=0;i<120*30;i++){ const v=a.out.V||0; a.ctl.throttle=aw(0,1,a.ctl.throttle+0.02*(5-v)); a.ctl.rud=aw(-1,1,4*att(a).hdg+2*a.w[1]); a.ctl.elev=0.5; stepAircraft(a,dt);
    const e=eye(a); if(le){ const vy=(e[1]-le[1])/dt; if(lv!==null&&i>1200){ const ay=(vy-lv)/dt; s2+=ay*ay; n++; } lv=vy; } le=e; }
  console.log(`Taxi ${l} 5 m/s: eye vertical accel RMS ${Math.sqrt(s2/n).toFixed(2)} m/s2`); }
// tail wheel: full-rudder turn, then a brake pivot (breaks out to castering) and straightening (re-locks)
{ const a=createAircraft(); for(let i=0;i<120*20;i++){ a.ctl.throttle=aw(0,1,0.25+0.1*(3-(a.out.V||0))); a.ctl.rud=1; a.ctl.elev=0.6; stepAircraft(a,dt); }
  console.log(`Turn full rudder 3 m/s: radius ${(3/Math.abs(a.w[1])).toFixed(1)} m, tailwheel ${(a.tw.psi*D).toFixed(0)} deg, castering ${a.tw.free}`);
  a.ctl.throttle=0.3; a.ctl.brake=0.8; let fr=0; for(let i=0;i<120*6;i++){ stepAircraft(a,dt); if(a.tw.free) fr++; }
  const yr=a.w[1]*D; for(let i=0;i<120*6;i++){ a.ctl.rud=aw(-1,1,3*a.w[1]); a.ctl.brake=Math.abs(a.w[1])>0.3?0.6:0; stepAircraft(a,dt); }
  console.log(`Pivot (full rudder + brake 0.8): yaw ${yr.toFixed(0)} deg/s, castering ${(fr/120).toFixed(1)} s of 6 | straightened: castering ${a.tw.free}, yaw ${(a.w[1]*D).toFixed(1)} deg/s`); }
// brakes from 15 m/s
for (const [br,el] of [[0.5,1],[1,1],[1,0]]) { const a=createAircraft(); a.vel=[0,0,-15]; a.engineOut=true; let lk=0; for(let i=0;i<120*15&&!a.crashed;i++){ a.ctl.brake=br; a.ctl.elev=el; stepAircraft(a,dt); if(a.gs[0].lock) lk++; if((a.out.V||0)<0.05&&i>60) break; }
  console.log(`Brake ${br} from 15 m/s, stick ${el?'back':'neutral'}: ${(-a.pos[2]).toFixed(1)} m, wheels locked ${(lk/120).toFixed(2)} s, crashed ${a.crashed} ${a.crashReason}`); }
// landings: 3-point (attitude hold, full back on the ground) and wheel landings; crosswind roll-outs
function land(V, sink, pdeg, flap, wind, mode) { const a=createAircraft(); a.q=qAxis([1,0,0],pdeg/D); a.flap=a.ctl.flap=flap; a.wind=[wind,0,0]; a.vel=[0,-sink,-V]; a.pos=[0,0,-20];
  a.pos[1]=-Math.min(qRot(a.q,C.GEAR[0].p)[1],qRot(a.q,C.GEAR[2].p)[1])+0.03; let td=null, b=0, pw=0, mS=0, mD=0, dev=0, z0=0;
  for(let i=0;i<120*25&&!a.crashed;i++){ const t=att(a);
    a.ctl.elev = mode==='wheel' ? aw(-1,1,2*((a.out.wow?-0.01:0.035)-t.pitch)-a.w[0]) : (a.out.wow?1:aw(-1,1,2*(pdeg/D-t.pitch)-1.5*a.w[0]));
    if (mode==='hands off' && a.out.wow) { a.ctl.ail=0; a.ctl.rud=0; }
    else { a.ctl.ail=aw(-1,1,-2.5*t.roll+1.5*a.w[2]-(a.out.wow&&wind?0.8*Math.sign(wind):0)); const e=4*t.hdg+2.5*a.w[1]; a.ctl.rud=aw(-1,1,e); a.ctl.brake=td&&(a.out.V||0)<15?0.4:(Math.abs(e)>1?Math.min(1,Math.abs(e)-1):0); }
    stepAircraft(a,dt); if(a.out.wow&&!td){td=1; z0=a.pos[2];} if(td&&!a.out.wow&&pw) b++; pw=a.out.wow; mS=Math.max(mS,a.gs[0].s,a.gs[1].s); mD=Math.max(mD,a.gs[0].d,a.gs[1].d); if(td) dev=Math.max(dev,Math.abs(t.hdg));
    if(td&&Math.hypot(...a.vel)<0.3) break; }
  return `crashed ${a.crashed} ${a.crashReason} | bounces ${b} | max bungee ${(mS*100).toFixed(1)} cm tyre ${(mD*100).toFixed(1)} cm | roll-out ${(z0-a.pos[2]).toFixed(0)} m | max hdg dev ${(dev*D).toFixed(0)} deg`; }
console.log('Land 3-point 35 mph 300 fpm:', land(15.6,1.5,11,50,0,'3pt'));
console.log('Land 3-point 35 mph 600 fpm:', land(15.6,3.0,11,50,0,'3pt'));
console.log('Land 3-point 35 mph 750 fpm:', land(15.6,3.8,11,50,0,'3pt'));
console.log('Land wheel 50 mph 200 fpm:', land(22.4,1.0,2,0,0,'wheel'));
console.log('Land wheel 50 mph 500 fpm:', land(22.4,2.5,2,0,0,'wheel'));
console.log('Crosswind 10 kt 3-point, pilot:', land(15.6,1.0,11,50,5,'3pt'));
console.log('Crosswind 10 kt 3-point, hands off after touchdown:', land(15.6,1.0,11,50,5,'hands off'));
console.log('Crosswind 14 kt 3-point, hands off after touchdown:', land(15.6,1.0,11,50,7,'hands off'));
{ const a=createAircraft(); a.ctl.throttle=1; a.wind=[6,0,0]; let dev=0, lo=null, t=0;
  for(let i=0;i<120*30&&!a.crashed;i++){ t+=dt; const v=a.out.V||0, at=att(a); a.ctl.ail=aw(-1,1,-2.5*at.roll+1.5*a.w[2]-0.4*(v<20?1:0.3)); a.ctl.rud=aw(-1,1,4*at.hdg+2*a.w[1]); a.ctl.elev=v<16?-0.35:(v<22?0:0.25);
    stepAircraft(a,dt); dev=Math.max(dev,Math.abs(at.hdg)); if(a.out.wow===0&&v>5&&!lo) lo={d:-a.pos[2]}; if(lo&&a.out.wow>0) lo=null; if(a.pos[1]>15) break; }
  console.log(`Crosswind 12 kt takeoff, pilot: max hdg dev ${(dev*D).toFixed(0)} deg, crashed ${a.crashed}, climbing ${a.pos[1]>15}`); }
