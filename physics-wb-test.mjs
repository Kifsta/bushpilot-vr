// v0.25 weight & balance checks (node physics-wb-test.mjs). physics-test.mjs (no loading) must keep its md5.
import fs from 'fs';
const html = fs.readFileSync('/workspace/bushpilot-vr/index.html','utf8');
const phys = html.split('// === PHYSICS START ===')[1].split('// === PHYSICS END ===')[0];
fs.writeFileSync('/tmp/phys-wb.mjs', phys + '\nexport { C, WNB, massProps, createAircraft, stepAircraft, qRot, qAxis };');
const { C, WNB, massProps, createAircraft, stepAircraft, qRot, qAxis } = await import('/tmp/phys-wb.mjs');
const dt = 1/120, mph = v => (v*2.23694).toFixed(1), D = 57.2958, aw = (lo, hi, x) => Math.max(lo, Math.min(hi, x));
let fails = 0; const ok = (c, msg) => { console.log((c ? 'OK   ' : 'FAIL ') + msg); if (!c) fails++; };
const att = a => { const f = qRot(a.q,[0,0,-1]), r = qRot(a.q,[1,0,0]); return { pitch: Math.asin(f[1]), roll: Math.asin(-r[1]), hdg: Math.atan2(-f[0], -f[2]) }; };
const lvl = (a, h0) => { const t = att(a); a.ctl.ail = aw(-1,1,-2.5*t.roll+1.5*a.w[2]); a.ctl.rud = aw(-1,1,4*t.hdg+2*a.w[1]); };
const apply = (a, P) => { if (P) { a.mass = P.mass; a.cgz = P.cgz; a.I = P.I; } return a; };
const sameMass = arm => ({ mass: C.MASS, cgz: (arm - WNB.REF_ARM) * WNB.IN, I: [C.I_PITCH, C.I_YAW, C.I_ROLL], arm, lb: WNB.REF_LB });   // CG moved, weight unchanged
// ---- load cases ----
const REF = massProps(36), GROSS = massProps(36, [{ lb: 267, arm: WNB.REAR_ARM }, { lb: 50, arm: WNB.BAG_ARM }]),
  OVER = massProps(36, [{ lb: 400, arm: WNB.REAR_ARM }, { lb: 167, arm: WNB.BAG_ARM }]), LIGHT = massProps(6);
const fmt = P => `${P.lb.toFixed(0)} lb (${P.mass.toFixed(1)} kg) CG +${P.arm.toFixed(2)} in`;
console.log('Reference', fmt(REF), '| gross', fmt(GROSS), '| over', fmt(OVER), '| light', fmt(LIGHT));
ok(REF.mass === C.MASS && REF.cgz === 0 && REF.I[0] === C.I_PITCH && REF.I[1] === C.I_YAW && REF.I[2] === C.I_ROLL, 'empty solo + full fuel = the old 650 kg flight model exactly');
ok(Math.abs(REF.arm - 12.96) < 0.01 && REF.inEnv && GROSS.inEnv && !OVER.inEnv && OVER.over, 'TCDS envelope: reference & gross inside, 2000 lb over gross');
ok(Math.abs(GROSS.lb - 1750) < 0.5 && GROSS.arm > 17 && GROSS.arm < 18.5, `gross load CG +${GROSS.arm.toFixed(1)} (rear seat 267 lb + 50 lb baggage)`);
ok(LIGHT.arm < REF.arm && LIGHT.mass < REF.mass, `fuel burn-off: 6 gal left = ${fmt(LIGHT)}`);
// ---- takeoff roll (same technique as physics-test) ----
function takeoff(P) { const a = apply(createAircraft(), P); a.ctl.throttle = 1; let lo = null, t = 0;
  for (let i = 0; i < 120*60 && !a.crashed; i++) { t += dt; lvl(a); const v = a.out.V || 0; a.ctl.elev = v < 16 ? -0.35 : (v < 22 ? 0 : 0.25);
    if (a.out.wow === 0 && v > 5 && !lo) lo = { d: -a.pos[2], t, v }; if (lo && a.out.wow > 0 && t < lo.t + 3) lo = null; if (lo && t > lo.t + 3) break; stepAircraft(a, dt); }
  return lo ? { ...lo, crashed: a.crashed } : { d: 1e9, t: 99, v: 0, crashed: a.crashed }; }
const T = [REF, GROSS, OVER].map(takeoff);
console.log(`Takeoff roll: ref ${T[0].d.toFixed(0)} m @ ${mph(T[0].v)} mph | gross ${T[1].d.toFixed(0)} m @ ${mph(T[1].v)} mph | over ${T[2].d.toFixed(0)} m @ ${mph(T[2].v)} mph`);
ok(T[1].d > T[0].d * 1.25 && T[2].d > T[1].d * 1.15 && !T[1].crashed, 'gross-weight takeoff roll longer, over gross longer still');
// ---- stall (idle, altitude hold until the critical AoA) ----
function stall(P) { const b = apply(createAircraft(), P); b.pos = [0,500,-2000]; b.q = [0,0,0,1]; b.vel = [0,0,-35]; b.power = C.IDLE_POWER; let si = 0, sv = null;
  for (let i = 0; i < 120*90 && !b.crashed; i++) { const at = att(b), tp = aw(-0.15, 0.25, 0.01*(500-b.pos[1]) - 0.03*b.vel[1]); const e = 3*(tp-at.pitch) - 1.5*b.w[0];
    si = aw(-1, 1, si + 0.4*e*dt); b.ctl.elev = aw(-1, 1, si + e); lvl(b); stepAircraft(b, dt); if (sv === null && b.out.alpha > C.ALPHA_STALL) { sv = b.out.V; break; } }
  return sv; }
const S = [REF, GROSS, OVER].map(stall);
console.log(`Stall: ref ${mph(S[0])} | gross ${mph(S[1])} | over ${mph(S[2])} mph (sqrt(W) predicts gross x${Math.sqrt(GROSS.mass/REF.mass).toFixed(3)})`);
ok(S[1] / S[0] > 1.08 && S[1] / S[0] < 1.14 && S[2] > S[1], 'stall speed rises with weight (~sqrt W)');
// ---- climb: full power, speed held at 31 m/s (69 mph) ----
function climb(P) { const b = apply(createAircraft(), P); b.pos = [0,300,-2000]; b.q = [0,0,0,1]; b.vel = [0,0,-31]; b.power = 1; b.ctl.throttle = 1; let si = 0, h0 = 0;
  for (let i = 0; i < 120*60; i++) { const at = att(b), tp = aw(-0.1, 0.35, 0.12 + 0.03*((b.out.V||31) - 31)); const e = 3*(tp-at.pitch) - 1.5*b.w[0];
    si = aw(-1, 1, si + 0.4*e*dt); b.ctl.elev = aw(-1, 1, si + e); lvl(b); stepAircraft(b, dt); if (i === 120*30) h0 = b.pos[1]; }
  return (b.pos[1] - h0) / 30 * 196.85; }
const Cl = [REF, GROSS, OVER].map(climb);
console.log(`Climb @ 69 mph full power: ref ${Cl[0].toFixed(0)} | gross ${Cl[1].toFixed(0)} | over ${Cl[2].toFixed(0)} fpm`);
ok(Cl[1] < Cl[0] * 0.8 && Cl[2] < Cl[1], 'climb rate falls with weight');
// ---- pitch: trim elevator, static stability, flare authority (same weight, CG at the fwd limit / ref / aft limit / past aft) ----
const CGS = [['fwd +10.5', sameMass(10.5)], ['ref +13.0', null], ['aft +20.0', sameMass(20)], ['tail-heavy +24', sameMass(24)]];
function trim(P) { const b = apply(createAircraft(), P); b.pos = [0,500,-2000]; b.q = [0,0,0,1]; b.vel = [0,0,-36]; b.power = 0.65; b.ctl.throttle = 0.65; let si = 0;
  for (let i = 0; i < 120*60; i++) { const at = att(b), tp = aw(-0.15, 0.25, 0.01*(500-b.pos[1]) - 0.03*b.vel[1]); const e = 3*(tp-at.pitch) - 1.5*b.w[0];
    si = aw(-1, 1, si + 0.4*e*dt); b.ctl.elev = aw(-1, 1, si + e); lvl(b); stepAircraft(b, dt); }
  return b; }
const tr = CGS.map(([, P]) => trim(P));
console.log('Level-flight trim elevator (+ = up):', CGS.map(([n], i) => `${n} ${tr[i].ctl.elev.toFixed(3)}`).join(' | '));
ok(tr[0].ctl.elev > tr[1].ctl.elev && tr[1].ctl.elev > tr[2].ctl.elev && tr[2].ctl.elev > tr[3].ctl.elev, 'forward CG needs more up elevator, aft CG less');
// stick-fixed: from trim, a 3 deg/s pitch-up gust, elevator frozen; short-period restoring & how far alpha wanders after 6 s
function gust(b) { const e0 = b.ctl.elev, a0 = b.out.alpha; b.w = [b.w[0] + 0.15, b.w[1], b.w[2]]; let peak = 0, end = 0, n = 0;
  for (let i = 0; i < 120*6 && !b.crashed; i++) { b.ctl.elev = e0; lvl(b); stepAircraft(b, dt); const d = b.out.alpha - a0; peak = Math.max(peak, Math.abs(d)); if (i > 120*4) { end += Math.abs(d); n++; } }
  return { peak: peak * D, end: end / n * D }; }
const G = tr.map(gust);
console.log('Gust 0.15 rad/s, stick fixed - alpha peak / mean |dalpha| 4-6 s:', CGS.map(([n], i) => `${n} ${G[i].peak.toFixed(2)}/${G[i].end.toFixed(2)} deg`).join(' | '));
ok(G[0].peak < G[1].peak && G[1].peak < G[2].peak && G[2].peak < G[3].peak, 'aft CG: same gust throws the nose further (less pitch stability)');
ok(G[3].end > G[0].end, 'tail-heavy: the disturbance lingers / wanders more than forward CG');
// flare: power idle at 50 mph, full aft stick for 2.5 s: how much nose-up alpha the elevator can pull
function flare(P) { const b = apply(createAircraft(), P); b.pos = [0,300,-2000]; b.q = [0,0,0,1]; b.vel = [0,0,-22]; b.power = C.IDLE_POWER; let mx = 0;
  for (let i = 0; i < 120*2.5; i++) { b.ctl.elev = 1; lvl(b); stepAircraft(b, dt); mx = Math.max(mx, b.out.alpha); } return mx * D; }
const FL = CGS.map(([, P]) => flare(P));
console.log('Full-aft-stick flare from 50 mph, max alpha:', CGS.map(([n], i) => `${n} ${FL[i].toFixed(1)} deg`).join(' | '));
ok(FL[0] < FL[1] && FL[1] < FL[2], 'forward CG: less nose-up authority in the flare (nose-heavy)');
// on the ground: tail wheel load at rest
function rest(P) { const a = apply(createAircraft(), P); a.engineOut = true; for (let i = 0; i < 120*8; i++) stepAircraft(a, dt);
  return { tail: a.gs[2].Fn, main: a.gs[0].Fn + a.gs[1].Fn, crashed: a.crashed }; }
const RS = [...CGS.map(([, P]) => P), GROSS].map(rest);
console.log('At rest, tail-wheel load:', [...CGS.map(([n]) => n), 'gross'].map((n, i) => `${n} ${(RS[i].tail / 9.81 / WNB.LB).toFixed(0)} lb`).join(' | '));
ok(RS[0].tail < RS[1].tail && RS[1].tail < RS[2].tail && RS[2].tail < RS[3].tail && RS.every(r => !r.crashed), 'aft CG: the tail sits harder');
// over gross: the gear gives up earlier on a firm 3-point landing (650 fpm)
function land(P, sink) { const a = apply(createAircraft(), P); a.q = qAxis([1,0,0], 11/D); a.vel = [0,-sink,-15.6]; a.pos = [0,0,-20];
  a.pos[1] = -Math.min(qRot(a.q, C.GEAR[0].p)[1], qRot(a.q, C.GEAR[2].p)[1]) + 0.03;
  for (let i = 0; i < 120*6 && !a.crashed; i++) { const t = att(a); a.ctl.elev = a.out.wow ? 1 : aw(-1,1,2*(11/D-t.pitch)-1.5*a.w[0]); lvl(a); stepAircraft(a, dt); }
  return a.crashed ? a.crashReason : 'ok'; }
const L = [REF, GROSS, OVER].map(P => land(P, 3.3));
console.log(`3-point at 650 fpm: ref ${L[0]} | gross ${L[1]} | over ${L[2]}`);
ok(L[0] === 'ok' && L[1] === 'ok' && L[2] !== 'ok', 'over gross: a firm landing the legal load survives breaks the gear');
console.log(fails ? `${fails} FAILED` : 'ALL W&B TESTS PASS');
