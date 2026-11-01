import fs from 'fs';
const html = fs.readFileSync('/workspace/bushpilot-vr/index.html','utf8');
const phys = html.split('// === PHYSICS START ===')[1].split('// === PHYSICS END ===')[0];
const mod = phys + '\nexport { C, createAircraft, resetAircraft, stepAircraft, qRot, terrainHeight };';
fs.writeFileSync('/tmp/phys.mjs', mod);
const { C, createAircraft, stepAircraft, qRot } = await import('/tmp/phys.mjs');
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
a = createAircraft(); a.ctl.throttle = 1; let liftoff=null, t=0, z0=a.pos[2];
for (let i=0;i<120*40 && !a.crashed;i++) {
  t+=dt; wingsLevelHeading(a, 0);
  const v = a.out.V||0;
  a.ctl.elev = v < 16 ? -0.35 : (v < 22 ? 0.0 : 0.25);   // tail up, then rotate
  if (liftoff===null && a.out.wow===0 && v>5) liftoff = { d: z0-a.pos[2], t, v };
  if (liftoff && t > liftoff.t + 8) break;
  stepAircraft(a,dt);
}
console.log('Takeoff:', liftoff ? `liftoff after ${liftoff.d.toFixed(0)} m, ${liftoff.t.toFixed(1)} s, ${mph(liftoff.v)} mph` : 'NO LIFTOFF', '| crashed', a.crashed, a.crashReason, '| 8s later alt', a.pos[1].toFixed(0),'m', 'speed', mph(a.out.V),'mph hdg', (att(a).hdg*57.3).toFixed(1));
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
