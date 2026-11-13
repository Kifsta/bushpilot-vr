# Bush Pilot VR - Pose Lab 2 (posetool.html)

Live: https://kifsta.github.io/bushpilot-vr/posetool.html
Repo files: `posetool.html`, `posetool/items.glb` (the game's own meshes for every holdable), `posetool/defaults.json` (items, categories, grip shapes, the game's current poses), `posetool/qrcode.js` (qrcode-generator 1.4.4, MIT), `posetool/README.md` (this file).
Box tooling (not in the repo): `/workspace/posetool/`: `refresh.sh`, `extract.py`, `export.js`, `build2.py`, `src2/`, `decode.mjs`, and the tests `d2.js` / `d3.js` (desktop) and `v2t.js` (`?xrsim`).

## Items (52, exported from the game's committed index.html)
| Category | Items |
|---|---|
| HUNTING | `rifle` Rifle (stock hand), `rifleSup` Rifle (forend hand), `rlev` Rifle (lever loop), `bino` Binoculars, `round` Rifle Round (.44) |
| PAPERS | `clip` Clipboard, `map` Map, `card` Checklist (card) |
| COCKPIT | `stick` Stick, `thr` Throttle, `mix` Mixture (knob), `carb` Carb Heat (knob), `prime` Primer, `flap` Flap Lever, `trim` Trim (crank), `master` Master (switch), `mags` Mags Key, `valve` Fuel Valve, `plt` Panel Lights (knob), `ldg` Landing Light (switch), `pbrk` Park Brake (T-handle), `mic` Hand Mic |
| DOORS | `lf` Left Window (front), `lr` Left Window (rear), `rup` Right Door (upper), `rlo` Right Door (lower), `rcg` Cargo Door (handle), `belt` Seat Belt (buckle), `net` Cargo Net (anchor) |
| CARGO | `cg_parcel` Parcel (8-20 lb), `cg_sack` Sack (25-50 lb), `cg_crate` Crate (35-70 lb), `cg_fbox` Fragile Box (10-28 lb), `cg_cooler` Cooler (25-45 lb), `cg_medkit` Medicine Case (6-14 lb), `cg_dog` Dog Crate (40-65 lb), `cg_hens` Chicken Crate (18-32 lb), `cg_cement` Cement Bag (47-55 lb), `cg_feed` Feed Sack (45-55 lb), `cg_nails` Nail Keg (48-60 lb), `cg_fuel` Fuel Can (34-38 lb), `cg_outboard` Outboard Motor (two hands), `cg_generator` Generator (two hands), `cg_deer` Venison Carcass (two hands), `cg_bundle` Drop Bundle (15-35 lb), `cg_patient` Patient (140-200 lb) |
| FUEL | `noz` Fuel Nozzle, `up_tank` Long-Range Tank (hangar part), `up_tyres` Tundra Tyres 39" (hangar part), `up_pod` Cargo Pod (hangar part), `up_light` Led Landing Light (hangar part), `up_radio` Com Radio (hangar part) |

- Gripped controls (cockpit, doors, rifle, binoculars, clipboard, map, nozzle) use the game's `gripSolve` frame: the pose is relative to `gripFrame(k)`, and the default is the game's own solved hold.
- Carried items (round, checklist card, mic, belt, net, cargo, hangar parts) hang off the controller in the plain controller hand. Their default is the game's hold offset, and their fingers are the game's free-hand state (`c`, `th`, `tw`), converted to joints.
- The trim crank and the door handles are part of bigger meshes in the game, so the lab draws grey stand-ins from their grip shapes.
- These are not in the game, so they are not in the lab: knife, canteen, tools, an ammo-box hold (rounds come from the belt pouch), a hose hold (you hold the nozzle), and a COM-radio knob hold (the radio is only a hangar part).

## What Neil does
1. Open the link in the Quest browser and press ENTER VR. There are three panels: **1 PICK** (left), **2 EDIT** (middle) and **3 SEND** (right). There is also a view from the other side above them. Labels float over both controllers and always show what each button does right now. The strip at the bottom of each panel explains the button you are pointing at.
2. On PICK, choose a category tab and an item thumbnail, then LEFT / RIGHT hand.
3. Squeeze GRIP on the free hand:
   - Near a yellow ball, it grabs that finger joint.
   - Near an orange ball, it grabs a fingertip.
   - Near the blue ball, it grabs the wrist.
   - Anywhere else, it grabs the item.

   Move or turn your hand and the grabbed part follows. The sticks fine-tune it. B / Y is undo.
4. On SEND, press SAVE, then COPY CODE. You can also photograph the QR code, or read out the numbered chunks.

On a PC: drag the gizmo (W = move, E = turn), click a ball to select a joint (Esc goes back to the item), Ctrl+Z / Ctrl+Y = undo / redo, and G = game view. A link ending in `#p=<code>` opens with that pose loaded.

### Fingers in 4 steps
1. Grab a fingertip (orange) and move it. The finger's joints behind it bend to follow (CCD IK on that chain, each joint limited to 2.6 rad from straight).
2. Grab a joint (yellow) and move or turn it. Moving it bends the joints before it; turning it turns that joint (the base knuckle only turns).
3. For fine control, trigger on a ball selects it. Then the right stick up/down = curl, right stick left/right = spread, left stick left/right = twist. The EDIT panel also has a 5 x 4 joint grid with CURL / SPREAD / TWIST +/- and a per-finger reset.
4. MIRROR TO LEFT/RIGHT copies the whole pose (item, wrist and every joint) onto the other hand.

### Other aids
- **GHOST**: a see-through copy of the game's current pose.
- **GAME VIEW**: the item where you use it:
  - binoculars at your eyes
  - rifle at the shoulder, with the other hand's glove
  - cockpit controls at their place in front of the seated eye, with the other controls ghosted
  - papers at reading distance
  - cargo at your side

  There, you move the glove on the item.
- **SPEED 1/4**.
- **SQUARE UP** (rounds the turn to 15 degree steps).
- Panel modes: FOLLOW (lazy drift after your head), STAY, or WRIST (one panel on the left controller, with the tabs at the top).
- Undo / redo, 80 steps.

## Frame convention (exact)
Every pose is **the item's frame expressed in the game's HAND SPACE of the hand named in the code**.
- Hand space = controller grip space * `HOFF`, where `HOFF = makeRotationX(HAND_TILT = 0.6)`.
  - Right hand: back of the hand +X, thumb toward -Z, fingers -Y, wrist +Y.
  - Left hand: X mirrored.
- Item frame:
  - Gripped controls: `gripFrame(kR / kL)`. bino / clip / map have a different frame per hand, and the lab handles this with each item's `rel` in defaults.json.
  - Carried items: the object's own root.
- `T = compose(pos, quat)`. The game's `st.Hc` = `T^-1`.
- **Wrist offset `w`** (optional): the glove relative to the controller. Glove = grip * HOFF * compose(w.p, w.q), and a carried item = glove * T. For a gripped control the glove stays on the control (`st.Hc`), and `w` only says where the controller sits relative to it.
- Mirror to the other hand: `p.x = -p.x; q = (x, -y, -z, w)`, and the same for `w`. The fingers stay unchanged, in both formats.

## Fingers: two formats
- **Grip state** (the game's own, unchanged from v1): `ja` (12 joint angles), `gT` / `gA` (thumb tip target / axis, right-hand space), `isp`, `dev`. buildHand uses these with `st.ge = 1`.
- **Joints `J`** (new): 15 local rotations, one per finger bone, in this order:

  `[index1, index2, index3, middle1..3, ring1..3, little1..3, thumb1, thumb2, thumb3]` = glove bones 2..16.

  - Each is the bone's frame relative to its parent bone. The parent of index1 / middle1 / ring1 / little1 / thumb1 is the palm (bone 1).
  - They are in RIGHT-hand terms, so one set fits both hands.
  - A left bone frame is `R_L = S * R_R * D` with `S = diag(-1, 1, 1)` and `D = diag(1, 1, -1)` (buildHand mirrors X and flips the width axis). This was checked numerically to 1e-15.
  - The bone starts are the game's: fingers at `(sx*0.033, -0.03, HF[f][0])` and the thumb at `(sx*TH_B.x, TH_B.y, TH_B.z)`, each bone running along its local +Y for `HF[f][1][j]` / `TH_L[j]`.
  - Curl is a negative turn about the bone's local Z.

## Code format (v2)
Base64url of compact JSON. Long codes are shown as numbered 100-character chunks plus a QR code, and both the lab and decode.mjs join the chunks in order.

`{v:2, i:item, h:'L'|'R', p:[0.1 mm], q:[1e-4], m:mode letter, d:dev*100, w?:[x,y,z (0.1 mm), qx,qy,qz,qw (1e-4)], J?:[45 ints: 15 rotation vectors in centiradians] | j:[12 centirad], t:[gT 0.1 mm], a:[gA 1e-2], s:isp*100}`

- A joints code is about 330 characters (4 chunks). A grip-state code is about 200.
- v1 codes still load.

`node /workspace/posetool/decode.mjs [--joints] [--frames] <code or Neil's whole message>` prints:
- `POSE_LAB.<item><hand> = { p, q, w?, J | ja/gT/gA/isp, dev }` and the mirrored line for the other hand
- `st.Hc`
- the wrist note
- with `--joints`: grip-state codes converted to J
- with `--frames`: every bone's absolute hand-space frame for both hands

## The hook the game needs
```js
const POSE_LAB = {};   // from decode.mjs
const _plP = new THREE.Vector3(), _plQ = new THREE.Quaternion(), _plS = new THREE.Vector3(1, 1, 1);
const plT = (key, out) => { const L = POSE_LAB[key]; return out.compose(_plP.fromArray(L.p), _plQ.fromArray(L.q), _plS); };   // item in (glove) hand space
const plW = (key, out) => { const w = POSE_LAB[key].w; return w ? out.compose(_plP.fromArray(w.p), _plQ.fromArray(w.q), _plS) : out.identity(); };   // glove on the controller
// 1) gripSolve(st, k, sx), first line: a POSE_LAB hold replaces the solver
function plSolve(st, key) { const L = POSE_LAB[key]; plT(key, st.Hc).invert(); st.dev = L.dev || 0; st.plJ = L.J || null;
  if (L.ja) { st.ja.set(L.ja); st.gT.fromArray(L.gT); st.gA.fromArray(L.gA).normalize(); st.isp = st.gp.isp = L.isp; } st.gp.u = false; }
// 2) after every buildHand(st, sx) of a hand that holds something (grip or carried): the per-joint fingers
const PL_FB = [[14, 15, 16], [2, 3, 4], [5, 6, 7], [8, 9, 10], [11, 12, 13]], PL_S = new THREE.Matrix4().makeScale(-1, 1, 1), PL_D = new THREE.Matrix4().makeScale(1, 1, -1);
const _plM = new THREE.Matrix4(), _plQp = new THREE.Quaternion(), _plQa = new THREE.Quaternion(), _plQb = new THREE.Quaternion(), _plV = new THREE.Vector3(), _plU = new THREE.Vector3();
function plFingers(st, J, sx) {   // J = 15 [x,y,z,w] local quats (right-hand terms)
  _plM.copy(st.R[1]); if (sx < 0) _plM.premultiply(PL_S).multiply(PL_D); _plQp.setFromRotationMatrix(_plM);   // the palm, right-hand terms
  for (let f = 0; f < 5; f++) { const ch = PL_FB[f]; _plQa.copy(_plQp);
    if (f === 0) _plV.set(TH_B.x, TH_B.y, TH_B.z); else _plV.set(0.033, -0.03, HF[f - 1][0]);
    for (let j = 0; j < 3; j++) { const k = ch[j]; _plQa.multiply(_plQb.fromArray(J[k - 2]));
      _plM.makeRotationFromQuaternion(_plQa).setPosition(_plV); if (sx < 0) _plM.premultiply(PL_S).multiply(PL_D); st.R[k].copy(_plM);
      _plV.add(_plU.set(0, f === 0 ? TH_L[j] : HF[f - 1][1][j], 0).applyQuaternion(_plQa)); } }
}
// in the hand update, right after buildHand(st, sx):   if (st.plJ) plFingers(st, st.plJ, sx);
// (the glove skin reads st.R, so nothing else changes; capsules (st.cap) for finger collisions come from hBone, so if you need them, rebuild them from st.R)
// 3) carried items: glove at grip * HOFF * plW(key), item at grip * HOFF * plW(key) * plT(key)
```
Clear `st.plJ` when the hand lets go. Grip-state poses (no `J`) need only step 1, as in v1.

## Defaults (what the lab starts from)
`refresh.sh` builds `_ptool.html` from `git show HEAD:index.html` (the **committed** game) and runs `export.js`. That script runs `gripSolve` per item and hand (a natural approach with the controller level, pointing ahead at the control) and stores `T = st.Hc^-1` and the solved fingers.
- If the rifle's lab solve leaves the fingers empty, they are filled from `RIFLE_POSES.*.lab`.
- Carried items get their hold offsets (`RND_HOLD`, `MIC_HOLD`, the card's grip offset, `BELT` / `NET` anchors, cargo side holds) and the plain-hand finger state.
- Rerun `refresh.sh` after any item, grip or model change (for example the v0.85 rifle), then commit `posetool.html` and `posetool/`.
