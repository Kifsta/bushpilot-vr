# Bush Pilot VR – changelog (v0.11 onward)

Live: https://kifsta.github.io/bushpilot-vr/index.html. Regression baseline: `node physics-test.mjs | md5sum` = `eee6637ebfc2fcee37f23c2813779dd9` from v0.20 on (v0.11–v0.19: `f1e1607f804bf17b4877bad1bf04feaa`). Versions after v0.20 must not change it.

## v0.68.2 – rifle: the trigger hand comes from behind, along the stock
Neil, in the headset: "The wrist should be pointing straight up on the trigger hand. It would come from along the stock." The physics block is untouched (md5 `eee6637e…`). The controller-to-rifle angle (grip pitch −40°) and the recoil are unchanged.
- **Why it was wrong:** the wrist grip wrapped round the bore axis. That made the hand stand on top of the wrist with the palm down and the cuff pointing up, even though the controller hold put it behind.
- **New grip shape:**
  - The hand now wraps a post through the stock's wrist and the lever loop, tilted 16° back from vertical (the same tilt a natural pistol-style controller hold gives). Nothing is forced off your real hand's angle.
  - The forearm and cuff run back along the stock (cuff 16 cm behind the grip, level with it).
  - The back of the hand faces out and the palm lies against the stock. The knuckles stack up the wrist: index on top, little finger 6 cm lower.
  - The thumb lies over the top of the wrist. The index angles down into the guard onto the blade.
  - The middle, ring and little fingers go down through the lever loop and wrap it.
- Left-handed is the exact mirror image (same basis, back of the hand to the left).
- The solver gained a free axis for wrap grips and cylinder shapes (`wd`, `ax`). The other grips are unchanged.
- **Tests:**
  - New test t682 (7 checks): forearm direction, back of the hand, knuckle stack, and the wrist behind the grip, for the right and left hands.
  - t672's thumb check was eased (19 mm up, 66 mm back).
- **Screenshots:** /workspace/qa-v0682-{side-right,side-left,lefthand-side,shooter,behind,lever-mid}.png. Comparisons: qa-v0682-vs-reference.png (Neil's photo), qa-v0682-before-after-right.png, qa-v0682-shooter-vs-reference.png. Reference photos: /workspace/ref-rifle-pexels1.jpg, ref-rifle-pexels2.jpg.

## v0.68.1 – a proper menu: save / load, graphics, comfort, controls, audio
Neil: "...have menus for load/save, graphics and any other options you might think it needs." The physics block is untouched (md5 `eee6637e…`). The world RNG is unchanged.
- The wrist MENU board is now a tabbed menu: RESUME, SAVE / LOAD, GRAPHICS, COMFORT, CONTROLS, AUDIO. The buttons are big (64 px rows on a 0.8 × 0.5 m board). It opens on the tab you last used.
- **Save / load:**
  - SAVE NOW and LOAD LAST SAVE.
  - 3 slots, each with its date and time, the nearest strip and your cash, and SAVE HERE / LOAD buttons. The autosave shows the same info.
  - NEW GAME.
  - New game, load, and overwriting a used slot all need a second poke within 4 s. Load and new game restart the page; saving is held off until the restart.
  - Saves now carry `meta: { cash, loc }`. Old saves still load.
- **Graphics:** every row as before, plus a new QUALITY preset next to PERFORMANCE / BALANCED. The PERF strip shows only on this tab.
- **Comfort:** vignette, turning, stick on release, control labels, and a RECENTRE + SET HEIGHT button.
- **Controls:**
  - Dominant hand: LEFT moves the watch and its MENU to the right wrist and pokes with the left finger.
  - Haptics.
  - A button reference.
- **Audio:** master, engine + flight, ambient, and effects volumes. The engine, wind and rumble go through one bus, and clicks, shots and the horn through another.
- **Pointing:** besides the finger poke, point a controller at the board (an orange dot) and pull the trigger. The rifle can't fire while the menu is open.
- **Desktop:**
  - Esc or F2 opens the same board as a page overlay (click it). Leaving mouse-look with Esc opens it too.
  - ` still opens the old settings list.
- Everything is saved in localStorage (`bp_gfx`, `bp_menutab`, `bushpilot-save-slotN`).
- New test t681 (22 checks). t45 and t48 were updated for rows per tab.
- Screenshots: /workspace/qa-v068-menu-{desktop,vr-board,tab-resume,tab-save,tab-save-filled,tab-gfx,tab-comfort,tab-controls,tab-audio}.png.

## v0.68 – the wrist shows the menu only when you turn it to you
Neil: "Only have the menu context icon show up when the player turns their wrist." The physics block is untouched (md5 `eee6637e…`).
- v0.62 hid only the MENU button. The watch face itself still always drew the grey "MENU BELOW: SETTINGS" bar.
- Now that bar shows only while the wrist faces the headset (the same angle and distance hysteresis as the button), or while the menu is open. The wallet, job, fuel and status lines stay on the watch face all the time.
- New test t68 (5 checks): watch pixels with the wrist turned away and to you, status text kept, button hidden and shown.
- Screenshots: /workspace/qa-v068-watch-away.png, /workspace/qa-v068-watch-facing.png.

## v0.67.2 – rifle: clear sights, a real grip, lever on a button, easy loading
From Neil's headset test, with his reference photo of a hand on a lever rifle. The physics block is untouched (md5 `eee6637e…`). Recoil is unchanged.
- **Hammer in the sights:** with the hammer down, its top stood 6 mm into the sight line (y 57.8 mm against 51.7 mm). The spur is now cut to 5 mm under the sight line (top 46.7 mm; cocked 34.7 mm), so the rear notch and bead are clear either way. The sights are unchanged, so the zero is too.
- **Grip, as in the photo:**
  - The wrist grip shape takes in the lever's top bar, so the middle, ring and little fingers curl inside the lever loop round the wrist and the bar.
  - The palm sits 13 mm lower on the wrist.
  - The thumb wraps over the top of the wrist behind the hammer.
  - The index curls into the guard round the trigger blade (it only feels the blade, and a minimum curl hooks it), and still curls further with the pull.
- **Lever without letting go:** B (Y if the rifle is in your left hand) on the rifle hand works the lever: down and back up, out goes the case, the hammer cocks and the next round is chambered. While the rifle is held, that button doesn't do its usual job (B: reset, Y: board). The hand rides the loop down and back with the lever. The physical lever (support hand on the loop) and the one-handed flick still work.
- **Loading is forgiving:** bring a round's tip within **6 cm** of the loading gate, pointing within about **60°** of forward, from any side, lever open or shut. It snaps onto the gate and slides in (60 ms + 100 ms) with a click, the gate sound and a haptic tick. Before, it had to come from behind and outside the gate, inside 2.5 cm, with the lever shut. The belt pouch now gives a round from **17 cm** (was 12 cm).
- New test t672 (15 checks): hammer under the sight line and the eye-to-bead ray clear, thumb, index and finger placement, the lever button and a full cycle, the hand riding the lever, loading at 5 cm and 46°, no load at 7.6 cm or 72°, loads with the lever open, pouch reach. t67 updated for the new gate rule.
- Screenshots: /workspace/qa-v0672-sights-hammer-down{-before,}.png, qa-v0672-sights-cocked.png (gloves hidden: the sight picture alone), qa-v0672-grip-{right,left}{-before,}.png, qa-v0672-grip-top.png, qa-v0672-grip-vs-reference.png (Neil's photo beside the new grip), qa-v0672-lever-mid.png, qa-v0672-reload.png (a round at the gate, gloves hidden).

## v0.67.1 – binoculars: the view comes up before they reach your face
Neil (on Quest): "Have to put binoculars too close to headset so it clips through the camera." The physics block is untouched (md5 `eee6637e…`).
- **Before:** the 7x view came up when the eyepieces were within 17 cm of the headset in any direction. It was a small ring in the middle of the view, and the binoculars and your hands stayed drawn round it, right at your eyes and through the near plane.
- **When it comes up now:** with the eyepieces **12 cm or less** in front of the headset, measured along your view. They can be up to **7 cm off to the side** and must look within about 40° of where you look. It stays up out to **15 cm**, 9.5 cm to the side and about 57° (hysteresis, no flicker). Eyepieces more than 3 cm behind your eyes don't count.
- **While zoomed:** the binoculars aren't drawn. A head-locked black mask covers the whole view with **two overlapping round holes** (soft edges) showing the 7x picture, so nothing near your face shows round it. The magnification is the same as before.
- **Not zoomed:** the binoculars aren't drawn while any part of them is within **6 cm** of your eyes.
- New test t671 (14 checks): the on and off distances with hysteresis, lateral slop, aim, hidden while zoomed, hidden inside 6 cm.
- Screenshots: /workspace/qa-v0671-bino-{zoomed,zoomed-close,close-sideways}-{before,after}.png.

## v0.67 – rifle: old aim and reload feel, procedural grip, trigger the right way round
Neil: "Rifle: use the old aim/reload code (v0.10–v0.44) on the current model, keep the current recoil, procedural grips, and the trigger is backwards." The physics block is untouched (md5 `eee6637e…`). Recoil is unchanged.
- **Trigger:** the blade curved backwards. It is now mirrored about its pin so it curves forward, and it rotates with your trigger finger (the analog value), not only on a shot.
- **Procedural grip:** the stock's wrist grip shape now matches the measured wrist (and the lever loop below it). The fingers curl joint by joint round the wrist. The index reaches forward onto the trigger and curls a little more as you pull.
- **Ported from v0.9–v0.44:**
  - Pickup blend: the rifle moves from the rack (or the ground, or your back) into your hand over 0.12 s. A change of hold, such as the forend hand going on or off, blends over 0.08 s.
  - Shouldering: the stock's own pull is capped at 3 mm and 0.6° per 90 Hz frame. Hand motion passes straight through.
  - One-hand inertia: the muzzle lags a fast start or stop about the wrist (critically damped, and a steady swing has no lag).
  - Free hold: let go of the wrist while the forend is held and the rifle stays where it was in the forend hand (it can't fire). Grab the wrist again to carry on.
  - Ejected cases carry the rifle's velocity.
  - Loading gate: the round only goes in from behind and outside the gate, pointing forward, with the lever shut. In the last 5 cm it swings onto the gate axis, then slides in over 0.14 s. A full tube says MAGAZINE FULL (at most every 1.5 s) and you keep the round.
- Not ported: the old right-stick grip-angle adjust. The stick is snap turn and crouch now.
- New test t67 (20 checks): trigger direction and travel, index on the trigger, fingers curled, pickup blend, inertia and settle, free hold and regrip, gate cone (wrong angle and backwards rounds don't load), slide-in, MAGAZINE FULL.
- Screenshots: /workspace/qa-v067-rifle-{grip-right,grip-left,fore-left,grip-right-trigger}-{before,after}.png.

## v0.66 – nothing floating at the right door
Neil: "Floating handle on the right cockpit door again." The physics block is untouched (md5 `eee6637e…`).
- **The cause:** not the v0.49.1 batching bug, which is still fixed (every door and window part leaves the static batch when it moves). The floating "handle" was the **front bracket of the Cub's rifle rack** (v0.53). It is fixed to the cabin, but it sat on the right wall 15 cm aft of the handles, which is over the door and window panes. With the door shut it looked like part of the door. With the door or window open it hung in the air in the opening.
- **The fix:** that bracket now sits 2 cm behind the door post, on the fixed wall. The racked rifle doesn't move; it rests on the two brackets 18 cm apart.
- **The latch levers on the right door and window** also stood 2.5–4.8 cm off their panes, beside the handle blocks, with nothing joining them. Their pivots now sit on the door skin and the window glass. The left-side latches are unchanged.
- New test t66 (5 checks): no fixed cockpit part over the right door or window panes (on v0.65 it finds the bracket), and both right latch pivots on their panes, shut and open.
- Screenshots (seated): /workspace/qa-v066-door-{closed,lower-open,upper-open,both-open}-{before,after}.png. Also qa-v066-door-ghost-before/after.png: the door and window hidden, so anything left in the opening is a floater; before shows the bracket, after shows nothing. Plus qa-v066-door-open-wide-*.png and qa-v066-door-rack-*.png.

## v0.65 – binoculars: procedural grip, one hand or two
Neil: "Binoculars: procedural two-hand grip, fingers curl to the body." The physics block is untouched (md5 `eee6637e…`).
- Before, the binoculars hung off the controller with the hand in a generic half-closed 'hold' pose, and only one hand could hold them.
- **Procedural grip:** two new grip shapes on the barrels (GDEF `bR` / `bL`, cylinders r 21 mm). The right hand wraps the right barrel and the left hand the left, using the same solver as the cockpit knobs and the rifle: each finger curls joint by joint until it touches, and the thumb opposes.
- **One hand:** the barrel sits on the palm's grip line, so the hand stays where the controller is.
- **Two hands:** grab the other barrel with your free hand (on foot, or in the seat). The pair then spans both palms: its across axis runs palm to palm, and it looks along the average of both controllers' forward. Let go with one hand and the other keeps them; let go with both and they go back on the chest (in the Cub, their holder).
- Moving between one and two hands re-solves both grips on the new pose.
- New test t65 (14 checks): palm on the barrel axis, curled fingers, two-hand span and centring, hand-over on release.
- Screenshots: /workspace/qa-v065-bino-one-hand.png, /workspace/qa-v065-bino-two-hands.png, /workspace/qa-v065-bino-two-hands-top.png.

## v0.64 – clipboard pages
Neil: "Clipboard pages flipped by the trigger: Manifest, W&B (with graph), damage/maintenance, extras (fuel/endurance/V-speeds), keyboard alternative on desktop." The physics block is untouched (md5 `eee6637e…`).
- The kneeboard has a tab bar and four pages:
  - **1 JOBS**: the existing manifest.
  - **2 W&B**: the station table (the same rows as the loading card), the total against the gross, CG limits, payload left, and the envelope graph with the current point.
  - **3 CUB**: tach, landings, the 100-hour with a bar, oil / tyres / brakes / gear / engine bars, power cap, braking and the last touchdown rate.
  - **4 PERF**: weight, fuel, endurance at 65% and full power (and the current power when running), and the V-speeds scaled to this weight (book PA-18-150 figures × √(weight / 1750)).
- **VR:** the trigger of the hand holding the clipboard steps to the next page, once per pull. While you hold it, that trigger is not read as brake; the other hand's trigger still brakes.
- **Desktop:** with the clipboard held up (N), **.** / **,** turn the pages forward and back.
- The canvas still redraws only when its content key changes. Each page has its own key, so a flip or a change in the shown values redraws it.
- New test t64 (13 checks): desktop and VR flips, wrap-around, no brake from the holding hand, the endurance against the burn rate, the stall speeds below gross.
- Screenshots: /workspace/qa-v064-page-jobs.png, -wb.png, -cub.png, -perf.png.

## v0.63 – strips and roads on the ground, runway texture
Neil: "Some road strips and runways float above the terrain. Conform them to groundY per vertex / subdivide. Add a low-poly runway texture (grass/dirt, markings, edge markers, tyre tracks) for judging height on approach." The physics block is untouched (md5 `eee6637e…`). The world layout is unchanged: the instanced placement hash and the next rand() value match v0.62.
- **The cause:** the ground is drawn as flat triangles on a 40 m grid (120 m beyond 3 km). The ribbons sampled the ground only at their own vertices, every 8–10 m, and sat at fixed offsets, so they bridged dips and cut into rises. Measured against the drawn ground (terrainHeight):
  - Ridge (meadow) strip: a flat sheet, 1.6 m above the ground in places and buried in others.
  - Lodge strip: −0.37 to +0.39 m. Bush ribbons: −0.22 to +0.26 m. Roads: +0.12 m everywhere, up to 0.33 m. Halvorsen: up to 0.12 m.
- **The fix: exact conforming.** A new `conformPoly` cuts each ribbon polygon along the ground's triangle edges (the x, z and x + z lines of the 40 m grid; the 120 m grid lines are a subset). Every piece then lies on one flat ground triangle, and its corners at terrainHeight + offset are the surface itself.
  - Now every strip, runway, bush ribbon and road is within 0.03–0.05 m of the ground at every sample. The new test t63 checks all seven ribbon meshes.
  - Applies to the home strip, Ridge, Lodge, Dry Fork, Halvorsen, all bush-site ribbons and the roads. The Ridge tyre markers, threshold boards and windsock now stand on the ground too.
  - Cost: +1.8k triangles for the roads and +0.6k for the bush ribbons, about +0.8k in total once the strips that dropped triangles are counted. Draw calls are unchanged.
- **Runway texture (`runwayTex`):** one 128×1024 canvas over the whole strip, about 0.3 m a pixel, mipmapped with anisotropy 8. It has:
  - mown bands every ~8 m, which give flow and height cues on short final;
  - two worn tyre tracks, darker in the touchdown zones;
  - rough edges with white edge marks every ~19 m;
  - white threshold bars at both ends and aiming blocks.
  - Variants: grass for the home strip, Ridge, Dry Fork and Lodge (each keeps its own green tint); dirt for Halvorsen gravel; and an untinted gray that the bush ribbons' vertex colours multiply. Mown 'short' bush strips get the pattern; tracks, sandbars and shores get a plain texel.
  - The noise comes from a local generator, and the old grain textures are still drawn for their rand() calls, so nothing else in the world moves.
- Screenshots: /workspace/qa-v063-meadow-before.png / -after.png (the Ridge strip half-buried, then whole), /workspace/qa-v063-lodge-before.png / -after.png, /workspace/qa-v063-home-final-before.png / -after.png (short final with the markings).

## v0.62 – wrist MENU button only when you look at your wrist
Neil: "Wrist menu button: appears only when that wrist is turned toward the face." The physics block is untouched (md5 `eee6637e…`).
- Before, poking anywhere on the left wrist screen opened SETTINGS. A finger brushing the wrist while flying or loading could open it.
- **The MENU button:** a separate gold button now sits under the wrist screen. It shows only while the screen faces the headset.
  - Facing means the screen normal is within ~52° of the line to the eye (cos > 0.62) and the wrist is within 0.6 m.
  - It hides past ~68° (cos < 0.38) or beyond 0.75 m. The gap between the show and hide limits stops it flickering at the edge.
- Only the button opens or closes SETTINGS; the message screen ignores pokes. A fingertip already on the button's spot when it appears has to lift off first.
- The wrist footer reads "MENU BELOW: SETTINGS". The help overlay and CONTROLS describe the new gesture.
- Tests:
  - New t62 (13 checks): hidden turned away, shown facing, 60° stays, 70° hides, coming back from 60° stays off, 0.8 m hides, 0.5 m shows, 0.7 m stays, hidden or screen pokes do nothing, no press when it appears under the finger, the button opens SETTINGS.
  - t45's wrist test now faces the wrist and pokes the button.
- Screenshots: /workspace/qa-v062-wrist-facing.png (button shown) and /workspace/qa-v062-wrist-away.png (turned away, hidden).

## v0.61 – either hand works every cockpit control
Neil: "Both hands can use everything in the cockpit. The left hand can't grab the stick now." The physics block is untouched (md5 `eee6637e…`).
- **Stick and throttle, either hand.** The stick used to answer only the right hand, and the throttle only the left. Now:
  - Whichever hand squeezes on a control holds it.
  - Both can be held at once, in either combination.
  - The other hand can't snatch a control that is already held.
  - The yellow ring, the tip label, the procedural glove grip (wrap on the stick or throttle) and the haptics follow the holding hand.
- **Rudder:** the left thumbstick, or the right one when it is pushed further, so you can fly with the stick in your left hand.
- **Brakes:** the trigger of the hand that isn't on the stick. That is the left trigger, as before, unless the left hand flies.
- Switches, knobs, the flap T-grip, the trim crank, the windows, the map, the kneeboard and the card already worked with both hands; a new test covers every one.
- Tests: new t61 (20 checks). It covers:
  - Left-hand stick: aileron and elevator sense, and the grip pose.
  - Right-hand throttle together with the left-hand stick.
  - No stealing a held control.
  - Brake and rudder mapping, and the default hands unchanged.
  - Every switch ringing for both hands.
  - Master and panel light with either hand, and the windows.
  - t42 and t491 are unchanged and pass.
- Screenshot: /workspace/qa-v061-left-stick-right-throttle.png.

## v0.60 – no more z-fighting on cargo labels and signs
Neil: "Z-fighting on delivery boxes (labels) and shop signs - fix (offset/polygonOffset)." The physics block is untouched (md5 `eee6637e…`).
- **Cargo labels:** every label quad now sits at least 4.5 mm clear of whatever is under it; 6 mm off the face, more where tape or a tag is underneath. Before, the parcel and medkit top labels and the fragile-box front label were 1.5–2 mm from tape or stickers, and the carcass front label was 3 mm inside the body.
  - The cargo shader also pulls each label 0.15 % of its distance toward the eye, along the view ray. On screen it lands on exactly the same pixels; in the depth buffer it wins against the box face at any range, including through the binoculars.
  - Tape, stickers, tags and trim get the same pull, smaller: 0.03 % plus a little more for each later part, so a sticker's icon beats the sticker. This fixed the fragile tape that striped red and brown at 70 m.
  - Still one material, one draw call per piece. Measured gaps: parcel 5.0 mm, fragile 4.5 mm, medkit 5.5 mm, carcass 6.0 mm (it was buried by 3 mm).
- **Signs and boards:** depth-biased toward the eye with polygonOffset, so they stay clean at any range.
  - Painted site and town signs had their backboard face at exactly the same depth; a ray test found gap 0.000 m.
  - Job boards, the service and parts boards, the hangar sign and the emergency signs sat 2 mm off their backing.
  - None of these are batched, so draw calls are unchanged.
- Screenshots:
  - /workspace/qa-v060-labels70m-before.png / -after.png: cargo at 70 m through a 1.2° lens. Before, the fragile tape is striped.
  - /workspace/qa-v060-labels-before.png / -after.png: 14 m.
  - /workspace/qa-v060-sign-before.png / -after.png.

## v0.59.1 – quality pass
Neil: "Can you do a performance and quality pass." This is the quality half. A headless play-through covered every board type, loading and strapping, deliveries, special cargo, a hunt, an airdrop, fuel, rep up to the Halvorsen unlock, fitting an upgrade, and medevac/SAR call-outs. A text checker drew every canvas (boards, kneeboard, wrist, signs, service and parts boards) and flagged text that ran off the edge, was squeezed more than 1.25× or overlapped other text. Every save was reloaded from awkward moments, including damaged saves. The physics block is untouched (md5 `eee6637e…`).
- **Job boards:** the item line and the third line no longer squeeze long text down to about 70 % width. They try shorter versions first, then 2 px smaller, and only then squeeze.
  - Deliveries list "N PIECES" in place of the item list.
  - Hunts read "HUNT AREA: <herd>".
  - Airdrops read "AIRDROP: <who> AT <place> - KM - N BUNDLES".
  - Special cargo shows the bonus without the long explanation.
- **Kneeboard:**
  - Three jobs plus an emergency call is four entries. The fourth used to fall off the bottom; now a compact layout fits all four.
  - The emergency call is listed first.
  - The REQUEST and rep stars moved from the nav line, where they overlapped the distance and heading, onto the short due line.
  - The title, route, nav and cargo lines fit their width; the cargo line was cut at 40 characters.
- **Wrist:**
  - The current message used to show only its first 26 characters, and in VR the wrist is the only place you can read it on foot. It now word-wraps and shows two lines at a time, paging every ~2.6 s.
  - Long messages stay up long enough to page through (3 s minimum, 2.6 s per 50 characters).
  - The wrist shows five lines above the button (it was four, and the fifth drew under the button). The message comes before the maintenance or rep lines.
  - The cockpit info screen pages long messages the same way.
  - Code that set a fixed message time after `say` (radio calls, call-outs, notes, binoculars) now only lengthens it.
- **Messages:**
  - One hard knock on fragile cargo used to post three "JOLTED … DAMAGE n %" messages in three frames. Now one line updates in place.
  - Two deliveries in the same frame are both shown (joined, then paged); the first one used to be lost.
- **Emergency sign:**
  - Medevac calls have the name and the injury on their own lines; they ran together and were squeezed.
  - Shorter pickup line: "PICK UP AT X > DRY FORK CLINIC".
  - Shorter SAR line: "FIND THEM, DROP SUPPLIES OR FLY ONE OUT".
- **Save / load:**
  - A save with a damaged `foot` entry (not a list) threw at startup and the page never finished loading. It is now checked, and so are the Cub position and quaternion (finite numbers only).
  - The whole load is wrapped. A save that still can't be read starts a new game with "THE SAVE COULD NOT BE READ - A NEW GAME", not a blank page.
  - Checked and fine: 195 single-field corruptions of every sub-object, plus saves taken mid-airdrop (the bundle in the air counts as dropped), mid-upgrade fit (the part goes back on the floor), with a cargo piece in your hands (back on the ground), and during field dressing.
- **Zombie-era leftovers removed:**
  - Gone from the v0.40 town dressing and the v0.39/v0.38 sites: the spray paint ("BITTEN INSIDE", "NO SURVIVORS", "K-12?? HALVORSEN LIED"…), the bodies in the street, the body bags, the blood stains, and the plywood QUARANTINE board.
  - The checkpoint signs now read ROAD CHECK / FIRE SEASON / PERMITS PAST HERE and STOP / ALL VEHICLES / SHOW YOUR PERMIT. The ranger station's EVACUATE board now reads NO CAMPFIRES OUTSIDE PITS.
  - The removed helpers still take their random numbers, so every other object in the world is in exactly the same place (checked by hashing the world). This removes 15 meshes, 2.3k vertices, 15 canvas textures and ~2 KB of file.
- The help overlay says v0.59.
- Tests: t52, t53 and t54 accept the shorter board wording (`AIRDROP: …`, `HUNT AREA: …`).

## v0.59 – performance pass
The target is the Quest 3 browser at 72 Hz BALANCED (13.8 ms). Tools in `bpt/p59`:
- per-view draw / triangle / CPU / allocation / GC / texture-upload / shader-link counts, with source-line tags on every draw;
- a scripted 2-minute flight timeline;
- far-draw, program-switch and allocation (CDP heap sampling) probes.

The physics block is untouched.
- **The biggest cost: the towns were drawn everywhere.**
  - The v0.47 static batcher merged the town and site meshes (one mesh each, already distance-culled by `townTick`) into the 250 m cell of their *origin*. That made one 42.6k-triangle batch, always drawn.
  - These meshes now stay out of the batches, keep their own distance culling, and draw only within their range.
  - This takes 33–42k triangles off every view (static batches: 56.8k → 14.2k triangles).
- **Deer:**
  - The instanced far deer have their own material copy. They shared one with the item meshes, which made three.js rebuild the program parameters on every switch.
  - A far LOD past 260 m is a vertex-clustered copy built at load: deer 2098 → 296 triangles, stag 3670 → 430. This saves ~13k triangles over a herd from the air.
  - The terrain height is looked up only when a deer has moved.
  - The skinned-deer shader is compiled at load for all four light combinations. Before, it was a ~200 ms link the first time a herd came within 160 m; it was the only first-sight shader compile in the timeline.
- **Garbage:** `Math.hypot` allocates on every call in V8 (~5 KB a frame in the deer loop alone). All 107 calls outside the physics block now use a plain `hyp()`; the 11 inside it are untouched. Also:
  - the active-job list in the per-frame special-cargo, smoke and drop-hint loops reuses one array;
  - the latch loop no longer spreads a copy of the cockpit hands every frame;
  - per-frame allocation in flight went from ~134 KB to ~43 KB.
- **Distance culling:**
  - Cargo left on a pad: 350 m (2.5 km through binoculars).
  - The racked or dropped rifle: 250 m. Its 5 draws were drawn from 3.7 km away.
  - Boards were already off past 400 m; townsfolk past 200 m.
- **Canvas uploads:** at most one job-board repaint per half second, so arriving at a strip no longer stacks board redraws and uploads in one frame (a 14.6 ms spike in the timeline).
- Lights are unchanged (two dynamic lights, always in the scene, all combinations precompiled).
- Not done: putting the parked Cub's physics to sleep on foot. It is ~50 KB a frame of allocation, but it is the physics block.

Per view, before → after (SwiftShader headless, fixed 1/72 s, BALANCED). CPU is the JS time including the render submit. CPU is within the box's noise (a same-session re-run of the old build gave 1.98 / 1.55 ms for seatHome / climbForest, against 2.16 / 1.65 now):

| View | Draw calls | Triangles | CPU ms | Alloc KB / frame | GC / 120 frames | CPU spikes |
|---|---|---|---|---|---|---|
| seatHome | 80 → 85 | 278.0k → 244.9k | 1.72 → 2.16 | 134.9 → 121.3 | 4 → 5 | 1 → 5 |
| climbForest | 69 → 72 | 256.2k → 212.6k | 1.42 → 1.65 | 133.9 → 42.3 | 11 → 7 | 0 → 0 |
| seatOverDryFork | 87 → 87 | 211.6k → 188.2k | 1.45 → 1.57 | 122.2 → 44.3 | 12 → 8 | 0 → 0 |
| overPine | 48 → 49 | 199.5k → 165.6k | 1.26 → 1.44 | 83.1 → 82 | 12 → 13 | 1 → 0 |
| footHome | 33 → 34 | 165.1k → 129.1k | 1.05 → 1.26 | 64.9 → 65 | 11 → 9 | 0 → 0 |
| footRidge | 33 → 34 | 164.5k → 128.5k | 1.04 → 1.22 | 67.8 → 69.1 | 11 → 12 | 0 → 0 |
| footDryFork | 30 → 30 | 162.7k → 123.4k | 0.98 → 1.35 | 63.2 → 60.9 | 10 → 11 | 0 → 1 |
| herd60 | 49 → 50 | 203.2k → 168.3k | 1.18 → 1.4 | 67.7 → 66.5 | 12 → 12 | 0 → 0 |
| herdBino | 31 → 31 | 168.9k → 129.6k | 1.15 → 1.44 | 69.3 → 69.7 | 10 → 12 | 0 → 1 |
| footUpg | 49 → 51 | 173.2k → 141.5k | 1.15 → 1.37 | 65.5 → 65.8 | 11 → 8 | 0 → 0 |
| footHalv | 32 → 32 | 169.3k → 129.9k | 0.87 → 1.26 | 63.3 → 61.8 | 10 → 10 | 0 → 0 |
| overBurnt | 46 → 47 | 194.1k → 159.2k | 1.16 → 1.38 | 66.5 → 61.1 | 10 → 10 | 0 → 0 |
| footSar | 81 → 75 | 220.6k → 193.4k | 1.51 → 1.63 | 73.5 → 65.6 | 12 → 11 | 0 → 0 |
| sarBinoAir | 46 → 47 | 205.3k → 168.8k | 1.25 → 1.42 | 69.9 → 61.8 | 11 → 10 | 0 → 0 |

2-minute scripted flight (8640 frames: Home take-off, climb over the forest, Pine Flats, a herd, Lodge, Ranger, Ridge, back), before → after:

| | Before | After |
|---|---|---|
| CPU median ms | 1.6 | 1.5 |
| CPU p95 ms | 2.9 | 2.4 |
| CPU p99 ms | 4.9 | 4.6 |
| Spike frames (> 2× median) | 225 | 153 |
| Frames with shader links after load | 2 | 1 |
| GC events | 672 | 383 |
| Alloc KB / frame | 118.8 | 34.5 |
| Texture upload MB (2 min) | 24.1 | 24.3 |
| Draw calls median / max | 71 / 98 | 75 / 94 |
| Triangles max | 302335 | 255301 |

The remaining shader links are all at frame 0 (load). A few ~100 ms outliers in the after run line up with load from another process on the box. In isolation, a board, kneeboard and map repaint at those points costs 2–8 ms.

## v0.58 – townsfolk, medevac and search-and-rescue
Neil: "recurring townsfolk (named, simple low-poly figures at their strips/camps, short notes/radio lines that build small stories across jobs, tied to rep/requests), medevac jobs (stretcher/injured passenger loaded into the rear seat, W&B, time-critical, smooth flying matters), and search-and-rescue (find an overdue hiker/canoe party from the air using binoculars, mark/airdrop supplies or land nearby to pick up)." The physics block is untouched (md5 `eee6637e…`). Emergencies run on their own list, outside the job boards, so every board offer and every pay stays the same as in v0.57 (t54 and t56 pay checks pass unchanged).
- **Townsfolk:** 14 low-poly figures, each one merged body plus a waving arm.
  - One customer stands beside each of the 13 job boards: Old Pete, Foreman Dawson, Mrs Anders, Mae at the feed store, Prospector Joe, Trapper Bill, Ranger Kowalski, Dr Lindqvist, and the rest. Nurse Okafor stands by the Dry Fork pad.
  - They turn to face you within 12 m. Walk within 4 m and they wave and say hello. The hello depends on their rep tier ("OH. IT'S YOU." / "MORNING, NEIL." / "THERE'S MY PILOT!"), adds their current story line, and thanks you if you're carrying their request.
  - A hello waits for a quiet moment, so it never covers a message that is still showing.
- **Stories:** each story has four beats. A delivery or airdrop to that customer moves their story on one beat at rep 35, 50 and 65, then at 80 or after a rescue.
  - Each beat arrives as a NOTE a few seconds after the delivery message.
  - With the COM radio fitted, their latest radio line comes up every few minutes.
  - Beat 3 of four stories is a **scripted emergency**. It is the next call-out, it doesn't expire, and finishing it gives +10 rep and opens the last beat:
    - Old Pete: his granddaughter Lily goes up the Baldy trail alone (SAR).
    - The Ridge Crew: young Tommy and a chainsaw (medevac).
    - Mrs Anders: nephew Erik's canoe party is overdue on the Lower River (SAR, 3 people).
    - Prospector Joe: falls into his own sluice (medevac). His figure is missing from Creek Bar while he's the patient.
  - Mae's story leads to the valley clinic: Nurse Okafor starts work and the kids paint "NEIL'S FIELD". Ranger Kowalski puts you on the SAR roster.
- **Call-outs:** the first comes at 3 min of game time, then every 6–10 min after the last one ends. Unscripted ones expire after 12 min ("THE STATE HELICOPTER HAS THE MEDEVAC - STAND DOWN"). One emergency runs at a time, alongside your board jobs.
  - **The red EMERGENCY CALL-OUTS sign** stands on the left of the Home, Ridge, Lodge and Dry Fork boards. It shows the call, the pay and the time left. Poke it in VR, or press desktop **4**, to accept. When you're on an emergency, the same sign shows its status and a poke or 4 hands it over to the state helicopter (−6 rep; not possible once the patient is aboard).
  - **By COM radio** in the Cub (master on): `RADIO - RANGER KOWALSKI: "ALL PILOTS, MEDEVAC: …" (C TO TAKE IT)`. Press **C**, or poke the radio's face in VR. Without the radio you only hear about call-outs at a sign.
- **Medevac:** pick up at a strip, camp or bush site (bush sites go onto the map), and fly to the **Dry Fork clinic**.
  - Pay is $320 + $70/km + $30/km out from Home, roughly $500–900.
  - Due in 8 + 1.7 min per km.
  - The patient's condition clock runs for 30 + 2 min per km.
  - The casualty sits on a stretcher, waving. Walk up and they lean on you and follow at 1.25 m/s. At the Cub's door, with the Cub stopped and the engine off ("THEY WON'T WALK PAST A TURNING PROP") and the rear seat clear, they climb onto the rear seat.
  - **The patient** is a cargo piece on the rear seat: 140–200 lb, seated, blanket and dressing. Their weight goes into W&B automatically: the rear-seat row and the plan line move. They can't be lifted out, and they count as secured.
  - **Condition** drops 1/life per minute, at half that rate while they wait on the ground. Flying rough (cabin roughness above 0.2) makes it faster: at 0.5 it is ×2.2 and they cry out "FLY SMOOTHER". Flying with no belt (/) adds ×0.5. Warnings come at 50 % and 25 %.
  - **The handover:** shut down within 90 m of the Dry Fork pad and Nurse Okafor takes over. Pay = pay × (0.4 + 0.6 × condition), half if late. Rep goes through the normal job path.
- **Search-and-rescue:** an overdue hiker, hunter, canoe party or kayakers in one of 6 areas: Baldy Trail, Spruce Hills, East Woods, Lower River, Big Bend and East Lake. Each area has 3 spots found at load on flat dry ground or a river or lake bank, with the trees cleared round them.
  - Pay is $380 + $60/km. Due in 16 + 2.5 min per km.
  - Two 15–25 lb supply bundles appear on the pad of the strip you took it from.
  - The map and kneeboard show only a **450 m search circle**. The party is 60–280 m off its centre.
  - **Spot them:** fly within 150 m below 260 m AGL, or look through the **binoculars (V)** from up to 4 km. That gives "SPOTTED: ERIK'S CANOE PARTY - 3 PEOPLE WAVING AT LOWER RIVER, 460 M (BINOCULARS)", and an X on the map.
  - The party is a tent or a canoe and orange tarp, plus 1–3 people who wave at the Cub within 900 m.
  - **Airdrop:** use the v0.52 bundle drop (G, or push one out the door). A bundle that lands within 60 m and not in the water finishes the job: 60 % of the pay and +6 rep. Further away, or in the water: "THEY CAN'T GET TO IT".
  - **Or land nearby:** walk up, and one of the party climbs aboard just like a medevac patient. Fly them to the clinic for the full pay.
- **Map:** the call-out shows as a red ring with a ?, the found party as a red X, a medevac pickup as a red cross, and the clinic as a ring.
- **Kneeboard:** MEDEVAC / SEARCH + RESCUE entries with route, heading and distance to the pickup, search circle, party or clinic, condition, belt and due time.
- **Save** (still v55) adds `emg` (call, active job, story queue, story beats, next call). The patient stays aboard across a reload. A bad save is cleaned up, and no save means a fresh start. Story beats are saved with it.
- **Tests:** a new t58 (20 checks: figures, greeting, beats and notes, scripted call, first call, expiry, sign and key 4, radio and C, board offers untouched, pickup, prop, rear seat, W&B, condition rates, handover pay, SAR circle, proximity and binocular spotting, bundle within/outside 60 m, SAR land pickup, cancel rules, kneeboard, Joe hidden, save) was added to the suite.

- **Perf** (1280×720 headless, v0.57 → v0.58). emgTick (call-outs, casualty, condition, figures, signs) costs 0.005 ms a frame. Draw calls go up by 0–7 for the figures and red signs; triangles barely change. CPU reads +0.1–0.3 ms on most views, including views with identical draw calls (the herd), which is the shared box's run-to-run noise. A first v0.58 run while the box was busy read 0.2–0.6 ms higher everywhere.

| View | Draw calls | Triangles | CPU ms |
|---|---|---|---|
| Seat at home | 77 → 80 | 278k → 278k | 1.66 → 1.83 |
| On foot at the cabin | 54 → 54 | 268k → 272k | 1.12 → 1.40 |
| 60 m from a herd | 52 → 52 | 229k → 229k | 1.30 → 1.59 |
| Same, binoculars up | 38 → 38 | 212k → 213k | 1.28 → 1.59 |
| Over Pine Flats at 120 m | 94 → 94 | 257k → 257k | 1.50 → 1.59 |
| On foot by the home hangar | 60 → 60 | 267k → 267k | 1.33 → 1.46 |
| Over Burnt Hill, drop on | 93 → 93 | 235k → 235k | 1.42 → 1.54 |
| On foot at the Halvorsen board | 28 → 30 | 167k → 167k | 1.05 → 1.17 |
| By the Cub, all 5 parts on | 93 → 96 | 280k → 280k | 1.76 → 1.71 |
| On foot at the home board (Old Pete, red sign) | 61 → 64 | 272k → 270k | 1.55 → 1.60 |
| On foot at Erik's canoe camp (v0.57: empty bank) | 25 → 32 | 178k → 179k | 1.16 → 1.35 |

## v0.57 – plane upgrades: bought at the home hangar, carried out and bolted on
Neil: "plane upgrades bought at the home hangar and fitted physically (reuse full-game v0.32 upgrade code where useful): long-range tank, tundra tyres (rough-field ability, slight drag), cargo pod (extra baggage capacity, drag), LED landing light, COM radio, and plan/stub floats & skis … Effects only through existing W&B/drag/input paths or opt-in paths so the stock Cub physics md5 stays identical. Some upgrades gated by reputation/cash." The physics block is untouched (md5 `eee6637e…`). With nothing fitted, the Cub gets exactly the stock CD0, gear and surface values, and t57 checks that a fly-out after fitting everything and taking it all off again is the same bit for bit.
- **The hangar parts board** stands on the hangar's outside wall next to the service board. Poke a row in VR, or press desktop **1-7** at the board. It has 7 rows. Parts are **cash only**, and three are **gated by rep**:

| Part | Price | Needs | Weight (arm) | Effect |
|---|---|---|---|---|
| LED landing light | $380 | – | 3 lb | Beam 450 m / 0.42 rad / 520 (stock 260 / 0.3 / 220) |
| COM radio | $650 | – | 4 lb (−8 in) | Customers call you with offers. Late jobs cost −4 rep instead of −8 |
| Cargo pod | $1,150 | Dry Fork rep 55 | 30 lb (+42 in) | A closed 100 lb belly locker. CD0 +0.003 |
| Tundra tyres 39" | $1,450 | Ridge Crew rep 35 | 14 lb (−2 in) | Rough ground roll ×0.78 and bumps ×0.4. Hard-landing limit 2.4 m/s (stock 2.0). CD0 +0.002 |
| Long-range tank | $2,100 | Lodge rep 55 | 22 lb (+26 in, right wing) | +16 gal aux that feeds the mains. CD0 +0.001 |
| Amphibious floats / wheel-skis | – | – | – | Listed as NOT IN STOCK YET (a later version) |

- **Fitting is physical.** A bought part waits on the hangar bench or floor. Carry it to the Cub, and a green outline shows its spot. Hold it there and it clicks on loose. Then drive the bolts home: 2 for the light and radio, 4 for the tank, pod and tyres.
  - **VR:** grip the part to carry it. To tighten, grip a bolt head and twist your wrist (270° per bolt, with a ratchet click every 30° and haptics).
  - **Desktop:** press **E** to pick a part up, **E** at the Cub to put it on its spot, then **E** once per bolt.
  - Parts go on and come off only **at the home hangar**: on foot, with the Cub stopped within 45 m and the engine off. The pod must be empty to take it off.
  - The board's REMOVE button puts a part back on the floor. Fuel left in the aux tank is credited at the home drum price.
- **Mounts and models** are ported from the full-game v0.32 upgrade code: the tank under the right wing, the pod under the belly, the light in the left wing's leading edge, the radio under the panel, and the bigger tyres (same axle, +5 cm radius).
- **How each effect plugs in** (all opt-in, outside the physics block):
  - Weights go in as W&B loads. The W&B card gets PARTS, AUX and CARGO POD rows.
  - Drag is added to C.CD0. All five parts take it from 0.050 to 0.056.
  - The tyres change the C.GEAR radius and the SURF roll and bump values off-strip.
  - The light uses the landing-light spotlight's settings.
  - The radio uses the existing rep and message paths.
- **Long-range tank:** the drum fills the mains first, then the aux ("TANKS FULL - 36 GAL + 16 AUX"). With the master on, the aux feeds the mains at 0.25 L/s whenever they drop below 90 %. The HUD fuel line shows `+x.x AUX`, and the aux fuel's weight goes into W&B.
- **Cargo pod:** a new cargo zone. Light pieces up to 100 lb fit (no dog crates). They count as secured and don't slide. In VR, load and unload it by hand. On desktop, press E standing on the left side of the Cub by the pod.
- **COM radio:** static chatter every 20–45 s. Every 75 s or so, a customer calls about the best offer you haven't heard yet, with requests first (`RADIO - MRS ANDERS: "NEIL, WE ASKED FOR YOU - MEDICAL SUPPLIES FROM DRY FORK, $562. SEE YOU AT THE BOARD"`).
- **Plan for floats and wheel-skis (a later stage):** they would swap the gear (C.GEAR contact points and a water or snow SURF type) on the same opt-in path. Floats need a water contact model and docking at lakes, and skis need snow surfaces on the glacier strips. They are on the board as "NOT IN STOCK YET".
- **Save** (still v55) adds `upg` (fitted, owned, aux fuel). Older or bad saves load as a stock Cub. A part that was half bolted on when you saved is back on the floor.
- **Fix:** the v0.57 radio patch (84fe4dc) briefly hid the early-delivery +2 rep bonus behind a comment. It was fixed two commits later.
- **Tests:** a new t57 (21 checks: stock identity, board and gates, desktop and VR fitting, home-only fitting, each effect, the aux fill and feed, pod limits, radio rep and calls, removal, save) was added to the suite.
- **Perf** (1280×720 headless, v0.56 → v0.57). upgTick (parts, ghost, bolts, radio, board) costs 0.001 ms a frame. The Over Pine Flats CPU jump was noise on the shared box: a re-run of that view alone gave 2.09 ms (v0.56) and 2.04 ms (v0.57).

| View | Draw calls | Triangles | CPU ms |
|---|---|---|---|
| Seat at home | 77 → 77 | 278k → 278k | 1.80 → 1.78 |
| On foot at the cabin | 54 → 54 | 273k → 274k | 1.52 → 1.55 |
| 60 m from a herd | 52 → 52 | 229k → 229k | 1.79 → 1.86 |
| Same, binoculars up | 37 → 39 | 211k → 215k | 1.65 → 1.62 |
| Over Pine Flats at 120 m | 94 → 94 | 257k → 257k | 1.69 → 3.29 (re-run: 2.09 → 2.04) |
| On foot by the home hangar | 59 → 60 | 267k → 267k | 1.53 → 1.93 |
| Over Burnt Hill, drop on | 93 → 93 | 235k → 235k | 1.67 → 2.01 |
| On foot at the Halvorsen board | 28 → 28 | 167k → 167k | 1.24 → 1.35 |
| By the Cub, all 5 parts on (v0.56: stock) | 92 → 93 | 279k → 280k | 1.78 → 1.98 |

## v0.56 – reputation and unlocks: per-customer rep, requests by name, the Halvorsen board
Neil: "reputation per town/customer (on-time, condition, accuracy raise it; late/damaged/lost lower it), unlocking new strips/towns (e.g. Halvorsen Station board), bigger and better-paying jobs, and regular customers who ask for you by name. Show rep on boards/kneeboard/wrist. Leave the R reset key as is." The physics block is untouched (md5 unchanged), and R works as before.
- **Rep 0–100 per customer:** each strip's town or crew (THE STRIP STORE, THE RIDGE CREW, THE LODGE, DRY FORK FEED + SUPPLY, HALVORSEN AG-BIO), each bush camp's customer and each airdrop party. Everyone starts at 30 (NEW). Tiers: UNHAPPY < 15, NEW < 35, KNOWS YOU < 55, TRUSTED < 75, REGULAR. Shown as 5 stars.
  - On time +5 (+7 with over 40 % of the deadline left); late −8.
  - Special cargo and venison add (condition − 0.75) × 16, from +9 for perfect down to −4 for broken or spoiled. Heavy freight +1, a request +2.
  - Airdrops: (average bundle share − 0.6) × 25, from +10 on the X down to −15 all lost; −8 more if late.
  - Cancelling −2.
  - The delivery, airdrop and cancel messages name the customer and the change, and any new tier.
- **Better pay:** offers to a customer above 50 pay +1 % per 2 rep (+25 % at 100). At the starting rep every offer is exactly the v0.55 offer (t56 checks 200 bit for bit), so the earlier pay tests are unchanged.
- **Regulars ask for you by name:** at 75+, about 40 % of a customer's freight jobs are **REQUEST** jobs (gold badge, `"ASK FOR NEIL" - MAE AT THE FEED STORE`; `?pilot=NAME` changes the name). They pay +35 % on top, and a light request carries up to twice the load (at most 320 lb, heavy over 120 lb), paid for the weight. Hunts and airdrops are never requests.
  - Average offer: $261 at rep 30, $274 at 60, $358 at 85 (29 % requests, averaging $419 and 121 lb), $381 at 100.
- **The Halvorsen station board (a new strip):** the 13th board, with a pad, across the gravel strip from the fenced Ag-Bio compound. It is appended after the bush sites, so every other board keeps its seeds.
  - It starts **closed**: a "NO CIVILIAN CONTRACTS" notice with a bar for your Dry Fork rep. Its offers can't be taken, no job goes there, and it isn't on the map.
  - At **Dry Fork 55** ("DRY FORK VOUCHED FOR YOU", on the delivery message) it opens and goes on the map. Its jobs (lab samples, seed lots, station stores) and jobs to it pay **+30 %** (an average of $355 from there).
- **Display:** each board footer shows the town's rep, stars, tier and pay bonus, and each offer shows its customer's stars. The kneeboard shows stars and REQUEST on each job. The wrist and HUD show `REP <TOWN> <n> <TIER>` (the board you're at on foot, or your next job's customer in the seat), placed after messages so the wrist's four lines still show them.
- **Save** (still v55) adds `rep` and `unl`, and request offers keep their flag. Older or bad saves load at 30 and locked; a new game resets it all.
- **Tests:** a new t56 (18 checks: lock, default-rep identity, deltas, airdrops, pay, requests, unlock, display, save). t50, t52 and t52h now count 13 boards, and the t54 pay sample uses the 12 original boards.
- **Perf** (1280×720 headless, v0.55 → v0.56). statusText + kbLines with rep cost 0.02 ms a frame.

| View | Draw calls | Triangles | CPU ms |
|---|---|---|---|
| Seat at home | 76 → 77 | 278k → 278k | 1.94 → 1.91 |
| On foot at the cabin | 53 → 54 | 268k → 272k | 1.69 → 1.51 |
| 60 m from a herd | 52 → 52 | 229k → 229k | 2.11 → 1.88 |
| Same, binoculars up | 39 → 38 | 215k → 213k | 1.85 → 1.68 |
| Over Pine Flats at 120 m | 94 → 94 | 257k → 257k | 1.83 → 1.73 |
| On foot by the home hangar | 59 → 59 | 267k → 267k | 1.78 → 1.63 |
| Over Burnt Hill, drop on | 93 → 93 | 235k → 235k | 2.14 → 1.89 |
| On foot at the Halvorsen board | 26 → 28 | 166k → 167k | 1.39 → 1.30 |

## v0.55 – running costs: paid fuel, oil, tach hours, wear, damage, the home hangar
Neil: "fuel purchase at strips with differing prices, oil use, engine hours, tyre/brake wear, hard-landing damage, repairs and 100-hour service at the home hangar; costs balanced against job pay so money matters but the player isn't stuck". The physics block is untouched (md5 unchanged). Wear and damage act only on the pilot's inputs before the physics steps: a throttle cap, a brake scale, a rudder pull on the ground, and the existing engine-out flag when seized. All of these are identity on a healthy Cub (t55 flies the same 5 s bit for bit with the hook on and off).
- **Fuel you pay for at four red drums**, paid as it flows:
  - **HOME $6.40/gal**, **RIDGE $7.30**, **LODGE $8.90** and **DRY FORK $5.80** (the town depot).
  - The new drums sit by the job boards, each with a fuel + oil board, and the paper map prints the prices.
  - When you stop pumping you get a receipt (gallons, cost, wallet). The wallet stays in whole dollars, with cents carried over.
  - Away from home it is cash only. **The home drum always gives 12 gal on account**, even when you are broke past the hangar's limit. That is about 30 km at cruise, enough to reach the farthest job and come back, so you are never stuck.
- **The Cub's log:** tach hours (running 20× real time: 3 min = 1 h), the 100-hour clock, oil, tyres, brakes, gear and engine damage, and landings. It starts at 1262.4 h with the 100-hour due in 37.6 h, 5.5 qt of oil, tyres at 85 % and brakes at 90 %.
- **Oil:** a 6 qt sump using about 1 qt per 12 h.
  - Below 4 qt the oil pressure gauge reads low and the temperature reads high. Below 3 qt the engine wears, and below 2 qt you lose 25 % power.
  - At 0.3 qt the engine **seizes** (engine out). R brings you home, and a repair fixes it.
- **100-hour service:** you are warned at 95 h. Past 110 h the engine runs rough (92 % power) and slowly wears.
- **Tyres and brakes:** tyres wear as you roll, on firm touchdowns and when skidding under hard braking; brakes wear with use. Worn brakes (below 20 %) and bald tyres (below 10 %) brake weaker.
- **Hard landings:** the touchdown sink is measured on the frame the wheels come down. Above 2 m/s (about 400 fpm) the gear bends: 28 % at 590 fpm. Bent gear pulls the Cub to one side on the ground. The physics crash limit (about 790 fpm) is unchanged.
- **Crashes** cost salvage plus a ferry home ($250 + $80/km from home), bend the gear and damage the engine (more for a prop strike or nose over). They can put you into debt.
- **The home hangar:** an open shed on the left of the home strip with a bench, oil, tyres and a tool chest. Its **service board** (poke, or desktop 1-4) shows the log and sells:
  1. An oil top-up ($9/qt).
  2. Tyres and brake pads, priced by wear ($240 + $180 when fully worn).
  3. Repairs ($1,200 × gear damage + $2,600 × engine damage, +$400 if seized).
  4. The **100-hour service** ($420, including an oil change).
  - It runs an **account up to $600**, and job pay clears it. Oil at home is never refused below 4 qt. The Cub must be parked nearby with the engine off.
  - The strip boards sell oil only, at $10–12/qt.
- **The HUD and wrist** get a maintenance line only when something needs attention (OIL LOW, 100-HR DUE / OVERDUE, GEAR DMG, ENG DMG, TYRES WORN, BRAKES WORN, ENGINE SEIZED). The engine log repeats the warnings every 45 s while you fly.
- **Balance:** across 433 sample jobs the average pay is $198. Fuel, oil, the 100-hour reserve and tyre and brake wear come to about $45 per job (23 %), and mistakes (a hard landing $300+, a crash $400+ plus repairs) cost more.
- **Save v55** adds the log (`eco`). Older saves load with the starting log.
- **Perf** (1280×720 headless, v0.54 → v0.55):

| View | Draw calls | Triangles | CPU ms |
|---|---|---|---|
| Seat at home | 75 → 76 | 277k → 278k | 2.29 → 1.87 |
| On foot at the cabin | 53 → 53 | 270k → 270k | 1.46 → 1.49 |
| 60 m from a herd | 52 → 52 | 228k → 229k | 1.98 → 2.00 |
| Same, binoculars up | 38 → 38 | 213k → 212k | 1.64 → 1.72 |
| Over Pine Flats at 120 m | 91 → 94 | 256k → 257k | 1.82 → 1.79 |
| On foot by the home hangar | 55 → 59 | 266k → 267k | 1.43 → 1.58 |
| Over Burnt Hill, drop on | 90 → 93 | 234k → 235k | 1.85 → 1.91 |

  The hangar is one merged mesh plus its sign. Each board adds a draw call within 300 m, and each new drum 1–2. ecoTick costs 0.0008 ms a frame. The box was loaded during these runs, so CPU varies by ±0.3 ms.
- **Tests:** a new **t55** (22 checks):
  - The stations and prices.
  - The healthy-Cub identity and the damaged-Cub difference.
  - Each wear effect on the inputs.
  - Tach and oil rates and the seizure.
  - Synthetic and real-physics touchdowns, brake wear, crash cost.
  - Paid fuel at home and at Dry Fork, cash-only away from home, and the 12 gal home safety net with the range check.
  - All four hangar board buttons, the money and parking checks, and a strip oil board.
  - The map prices, the HUD warnings, the save round trip, the cost / pay balance, and no errors.

  reload and t54 now expect save v55.

## v0.54 – airdrops
Neil: "airdrops (open door/window in flight, push bundles out, streamer bundles fall with physics, scored by distance to a target smoke/X; airdrop jobs on boards to sites/camps you can't land at, e.g. a stranded hiker or fire crew; pay by accuracy and bundle condition)". No weather or wind; the physics block is untouched (md5 unchanged).
- **Five drop sites with no strip**, picked by a terrain search: 900 m or more from any strip, on steep ground, in the woods or on a river bank.
  - The **STRANDED HIKER** on BALDY RIDGE, the **SURVEY PARTY** on EAST SPUR, the **FIRE CREW** on BURNT HILL (burnt snags, yellow shirts), the **TRAPPER** in DEEP WOODS and the **CANOE PARTY** on the LOWER RIVER.
  - Each has an orange panel **X** on the flattest dry spot, and a camp 12 m away with a tent, people waving and packs. All five sites are one merged mesh (5.4k vertices).
  - Trees, bushes and rocks are cleared within 18 m of the X and 10 m of the camp.
- **Signal smoke:** orange puffs rise from a pot beside the X, only while your drop is on and only at the nearest active site within 6 km. It is one Points draw with fog, and no wind. Inside 1.5 km you get a spoken hint.
- **Airdrop jobs** are about 14 % of board offers, from any strip to one of the three nearest sites within 7 km.
  - Each job is 2–4 **streamer bundles** of 15–35 lb.
  - Pay is 90 + lb + 40/km, ×1.25 on a deadline.
  - The board shows a blue AIRDROP badge and `AIRDROP TO THE FIRE CREW AT BURNT HILL (NO STRIP) …`. The map shows an orange X with a smoke puff and a dashed line, and the kneeboard gives `DROP n KM  HDG nnn` and `n/n DROPPED`.
  - You can't cancel once a bundle is out.
- **Out the door:** open both right halves first (the upper window up under the wing, the lower door down; desktop 1 and 2).
  - **Desktop G** pushes the bundle nearest the door. It leaves at the plane's velocity plus 1.6 m/s to the right.
  - **VR:** reach back, grab a bundle, put your hand out through the door and let go. It leaves with your hand's speed. With the door shut it settles back in.
  - Weight and balance lose the bundle's weight as it goes.
- **Fall physics:** fixed 1/120 s steps with gravity and quadratic drag (the streamer gives about 24 m/s terminal speed). Bundles hit trees and the terrain. One that hits a tree is slowed, knocked about and marked "through the trees". The streamer is a camera-facing ribbon that follows the bundle and lies out behind it on landing. Landed bundles stay as decor (the last 16).
- **Scoring:**
  - Accuracy is full within 10 m of the X and falls to 35 % at 150 m. Past 250 m, or in water, the bundle is lost.
  - Condition is 1 − (impact speed − 12)/30, minus 0.1 through trees. A bundle's share is accuracy × (0.5 + 0.5 × condition).
  - When the last bundle is down the job pays its pay × the average share (half if late), and the spoken message gives the average distance and condition.
  - For example, from 30 m AGL at 28 m/s released 55–60 m short, the bundle lands in about 1.5 s, 20–35 m from the X, at about 75 % condition.
- **Save v54:** a bundle in the air when you save is stored as where it will land (predicted). Older saves load.
- **Perf** (1280×720 headless, v0.53.1 → v0.54):

| View | Draw calls | Triangles | CPU ms |
|---|---|---|---|
| Seat at home | 74 → 75 | 275k → 277k | 1.73 → 1.73 |
| On foot at the cabin | 52 → 53 | 266k → 268k | 1.27 → 1.51 |
| 60 m from a herd | 51 → 52 | 226k → 228k | 1.77 → 1.70 |
| Same, binoculars up | 38 → 38 | 214k → 213k | 1.54 → 1.60 |
| Over Pine Flats at 120 m | 90 → 91 | 254k → 256k | 1.71 → 1.62 |
| Over Burnt Hill, drop on, smoke up | 85 → 90 | 232k → 234k | 1.58 → 1.76 |

  The site mesh is +1 draw call (+1.8k triangles), and the smoke + streamer adds up to 4–5 near a site. The smoke tick costs 0.008 ms a frame. CPU differences of ±0.2 ms are within run-to-run noise.
- **Tests:** new **t54** (20 checks: sites, tree clearing, generator and pay, board / accept / kneeboard / map, smoke range, door gating, G drop + W&B, fall + score, cancel block, a lost bundle + finish pay + decor, the scoring curve, water and trees, save mid-fall, VR grab / door shut / hand-speed release, save v54, no errors). **t54clear** has joined the suite. t50, t52, t52h, t53 and reload now leave airdrop jobs out of their generator checks and expect save v54. The full suite passes; md5, W&B and lint (25) are unchanged.

## v0.53.1 – fixes
- **`MYS_SITES.clear`** now indexes the `xz` triples correctly (`xz[i*3]`, `xz[i*3+2]`) at all 4 places. Trees and rocks round the mystery sites are cleared where intended.
- **The venison carcass** is a low-poly deer lying on its side: tied legs, head and neck, and an opened belly. It replaces the game bag; size, weight and label are the same.

## v0.53 – lever rifle, deer hunting jobs, binoculars
Neil: "Put the upgraded gun model and mechanics in. Some missions require hunting deer in the forests. Add binoculars too." No weather or wind; the physics block is untouched (md5 unchanged).
- **Lever-action carbine** (`assets/lever-rifle.glb`, Winchester 1892 style) with the full game's mechanics on the new model: 7-round tube plus chamber, a lever that ejects the case, cocks the hammer and chambers the next round (hammer down = no shot, empty = dry click), a loading gate, and animated hammer, trigger and gate. The sight line runs from the rear blade over the bead top (raised to 0.0517 m so it clears the receiver).
  - **Ballistics:** 400 m/s, drag and gravity in fixed 1/240 s steps, zeroed at 50 m. It hits terrain, trees, the cabin and deer, with dust, wood, leaf or blood puffs and muzzle smoke.
  - **Racks:** one on the cabin wall and one on the Cub's right cabin wall. Climbing in racks a rifle you carry. There's an **ammo box** by the cabin: $10 for 20 rounds.
  - **VR:** grip the stock's wrist, the forend with the other hand, and a virtual shoulder stock when it comes to your cheek. Pinch the lever loop and swing it, or flick the rifle. Rounds come from the belt pouch into the gate. The trigger fires in the rifle hand only. Let go at a rack to rack it, over your shoulder to sling it.
  - **Desktop:** T take / rack / sling, LMB fire, RMB aim down the sights, X lever, Z load.
- **Deer** (Quaternius Deer + Stag back, CC0): six herds (about 20 animals) in forest meadows.
  - **LOD:** an animated skinned pool for the nearest 8 within 160 m (animation at 1/3 rate past 60 m), one instanced bind-pose draw per species out to 900 m, frozen past 1.5 km.
  - **Behaviour:** they graze, look up, and bolt from you (sight scaled by speed and crouch), from a low plane, or from a shot (once its sound reaches them). Head and chest shots drop them; a body shot wounds and they run. Scattered herds respawn.
- **Field dressing:** hold E (VR: hold grip) by a downed deer for 3 s while you have a hunting job. It becomes a **VENISON CARCASS** of 100–150 lb, two-hand cargo that is perishable from that moment. With no job: "NOBODY HAS ORDERED VENISON".
- **Hunting jobs** (about 14 % of board offers) from the lodge, the elk camp, the ranch and the Dry Fork butcher. They pay well (bush ×1.2, deadline ×1.25). The board shows `1 DEER (~100-150 LB) - HUNT AREA ON THE MAP` with a HUNT badge, and the map draws an orange dashed circle with a hoof. The kneeboard shows `HUNT` and the area. You can cancel one until you've dressed a deer for it.
- **Binoculars:** on your chest on foot, in a holder by your right knee in the Cub. Raise them to your eyes for a 7× view, a 384 px render target drawn every other frame with no shadows (desktop V: fov 10). They read out deer count and range, and spotting a bush site within 1.5 km puts it on the map.
- **Save v53** stores the rifle (place, tube, chamber, pouch) and hunting jobs. Older saves still load.
- **Fixes found while testing:**
  - The binocular holder grab used an aliased temp vector, which grabbed the binoculars from anywhere in the cockpit and broke cockpit grabs.
  - Vital hits now register through the body sphere and across bullet steps.
  - The recoil and stock springs are substepped (they diverged at slow frames).
  - Sling-on-release used a clobbered temp vector.
- **Perf** (1280×720 headless, v0.52.1 → v0.53):

| View | Draw calls | CPU ms | Deer ms |
|---|---|---|---|
| Seat at home | 71 → 74 | 1.69 → 1.96 | |
| On foot at the cabin | 45 → 52 | 1.27 → 1.59 | |
| 60 m from a herd | 45 → 51 | 1.29 → 1.81 | 0.16 |
| Same, binoculars up | 45 → 37 | | |
| Over Pine Flats at 120 m | 83 → 90 | | 0.04 |

- **Tests:** new t53 (34 checks: models, ADS sight alignment, zero, lever / gate / dry fire, ammo box, racks + boarding, LOD, flee, gunshot scare, chest / body shots, hunt jobs on board / map / kneeboard, dressing → cargo → paid delivery, save / load, VR grips / lever / gate / trigger / sling, binoculars VR + desktop, bush-site spotting). t45, t51, t52h and reload updated for v53.
- **Known (pre-existing, not touched):** `MYS_SITES.clear` indexes `xz[i*2]` though `xz` holds triples (fixed in v0.53.1).

## v0.52.1 – baggage limit on the W&B status line
- **The W&B card status line now checks the baggage bay limit.** With more than 50 lb in the baggage bay it says **BAGGAGE OVERLOAD** (amber), not WITHIN LIMITS beside the "BAGGAGE OVER 50 LB MAX" footer. The order is OVER GROSS, then CG AFT / FWD OF LIMIT, then BAGGAGE OVERLOAD, then WITHIN LIMITS.
- **The takeoff-roll reminder** (throttle up on the ground) now includes `BAGGAGE OVERLOAD n LB (MAX 50) - MOVE SOME TO THE REAR SEAT`, together with any over-gross, CG or loose-cargo warnings.
- **Tests:** a new t52h check (20 pass) covers the card status, the footer and the spoken reminder. md5, W&B tests, lint 25, t50, t51 and reload all pass.

## v0.52 – bush sites; light and heavy jobs
Unprepared landing spots with customers, found by flying low, marked on the paper map, with jobs to and from them. Neil's cargo-weight decision ships as its own commit: a mix of LIGHT parcel runs and HEAVY freight. No weather or wind; the physics block is untouched.
- **8 bush sites** (`BUSH`, appended to `DLV_STRIPS` with `site: true`). Each was placed by a terrain search (`sitesearch.mjs` plus an in-browser water-distance scan): the centreline stays within slope limits, and sandbars and shores stay 12–55 m from the water without running into it. The ground isn't flattened (`terrainHeight` is unchanged), so the gear rolls on the real slope and the rough surface. Only the two short strips are mown (`MOWN`).

| Site | Type | Customer | Length | Notes |
|---|---|---|---|---|
| CREEK BAR | sandbar | prospector camp | 190 m | |
| FISH CAMP BAR | sandbar | fish camp | 210 m | |
| NW LAKE SHORE | lake shore | trapper cabin | 200 m | |
| EAST LAKE SHORE | lake shore | boathouse | 200 m | |
| GOAT BENCH | mountain ridge bench (about 10 %) | Lost Lode mine | 170 m | one-way, land uphill |
| ELK MEADOW | meadow | elk camp | 220 m | one-way (departing uphill met rising ground) |
| RANGER STRIP | graded short strip | ranger station | 160 m | windsock |
| RANCH STRIP | graded short strip | ranch | 180 m | windsock |

  - **Each site** has a customer camp built for its trade (for example a mine adit with a tin shack, ore cart and tailings; a trapper's cabin with fur stretchers; a corral with saddles at the elk camp; a fire cache at the ranger station; a hay shed at the ranch), a small job board and a yellow pad. The camp side is picked by score (flatness, away from water). Painted corner rocks or a graded ribbon mark the strip, or two worn wheel tracks in the grass on the meadow and the bench.
  - **Trees** are cleared from the strip (+40 m), from a 260 m funnel off each end, and within 24 m of each camp.
  - **All 8 camps are one merged mesh and all ribbons and tracks are another**, so the sites cost 2 draw calls plus a windsock.
- **Discovery.** Sites start unknown. `bushTick` (every 0.5 s) finds one when you're within 400 m and less than 250 m above it, on foot or flying. You get `FOUND CREEK BAR - SANDBAR ~190 M - PROSPECTOR CAMP - ON YOUR MAP NOW`; the bench and the meadow add `ONE-WAY: LAND UPHILL HDG nnn`. Found sites are saved (save v52; v45, v50 and v51 saves still load).
- **Map.** Found sites are drawn by type and labelled with the customer, type, length and `1-way`, with per-site label offsets so they don't overlap. An active job to an unfound site draws a dashed **?** circle (320 m radius) whose centre is 90–210 m off the real spot.
- **Jobs.** From the four airfields, about 50 % of jobs go to bush sites; from a site, 25 % go on to another site. Bush ends pay ×1.2. The board says `(FIND IT)` for unfound destinations, and shows the type and length (`LAKE SHORE 200 M`) on line 3. The kneeboard says `SEARCH 2.9 KM HDG 315` until it's found, then gives the type and length.
- **Measured on the sites** (real flight model, 1/120 s step, gear pitched to the local slope):

| | Empty (pilot + full fuel) | Max gross 1733 lb |
|---|---|---|
| Lift-off distance, all 8 sites | 55–109 m | 129–194 m, no crashes |
| Landing stop (all 8) | 50–127 m | |

  Strip lengths are 160–220 m, so the heavy end is tight on purpose. Watch your weight going into the bench.
- **Light and heavy jobs** (separate commit). Every job is **LIGHT** (20–80 lb; `dlvCapL` trims the light templates) or **HEAVY** (about 150–400 lb).
  - **Heavy templates:** CEMENT (bags), FEED (sacks), BUILDING SUPPLIES (nail kegs and lumber), AVGAS (fuel cans), OUTBOARD MOTOR, GENERATOR. They use the new cargo kinds cement, feed, nails, fuel, outboard and generator. Pieces weigh 34–60 lb; the outboard and the generator are **two-hand** pieces (130 lb or less).
  - **Mix:** about 45 % of new jobs are heavy (`DLV_HP`; measured about 30 % once special cargo takes its share). A board with no heavy job gets one forced when it's dealt (`dlvInit` / `dlvCheck`).
  - **Pay:** heavy pays round((40 + 0.45 × lb + 30 × km) × deadline 1.3 × bush 1.2). 30 % have a deadline.
  - **The class shows** as a LIGHT / HEAVY badge on the board, at the start of the kneeboard line (`HEAVY 241 LB - ...`) and in the top-right corner of every shipping label. Saves from before v0.52 get their class from the weight (over 120 lb is heavy).
  - **Payload warning.** `dlvRoom()` = 1750 − the W&B plan's gross. A job heavier than that shows `OVER PAYLOAD AT n GAL: MAX x LB` in red on the board. The W&B card footer shows `PAYLOAD LEFT x LB`, or `OVER MAX GROSS 1750 BY x LB` (which now takes priority over the baggage-limit line, so it's never hidden).
  - **Carrying.** In VR, one grip on a two-hand piece marks it pending; it lifts when the second hand grips, and rides at the hands' midpoint (5 cm below). Let go with either hand to drop it. On desktop, E puts it ON THE HAND TRUCK. Walking speed drops to 0.8 when carrying more than 35 lb and to 0.5 over 80 lb.
  - **Every heavy job fits physically** in the Cub: 120 of 120 generated jobs, loaded by `cgLoadAny`.

| Template | Weight range |
|---|---|
| OUTBOARD MOTOR | 156–184 lb |
| CEMENT | 196–370 lb |
| AVGAS | 176–259 lb |
| FEED | 198–317 lb |
| GENERATOR | 174–238 lb |
| BUILDING SUPPLIES | 196–316 lb |

  - **What heavy feels like** (HOME strip, full fuel, real flight model):

| Load | Takeoff roll | Climb |
|---|---|---|
| Empty | 129 m | 965 fpm |
| LIGHT 21 lb | 130 m | 938 fpm |
| HEAVY FEED 241 lb | 178 m (+38 %) | 643 fpm (−33 %) |

- **Perf** (swiftshader, the final v0.52 build vs v0.51.1, same views; box load about 6–7):

| View | v0.51.1 | v0.52 |
|---|---|---|
| Seated, facing forward | 66 draw calls, 262.7k triangles, 1.79 ms | 71, 266.7k, 1.79 ms |
| Seated, facing west | 55, 262.2k, 1.61 ms | 61, 266.3k, 1.60 ms |
| On foot at CREEK BAR | 73, 221.7k, 1.56 ms | 79, 225.8k, 1.65 ms |
| Over GOAT BENCH | 16, 160.7k, 1.21 ms | 20, 164.5k, 1.19 ms |

  An isolation probe puts v0.52's own cost at +3 draw calls (the 2 merged site meshes and a windsock); the rest is the extra board, pad and visible terrain or tree chunks in those views. The delivery tick, with the 0.5 s discovery check, is 0.05 ms or less.
- **Tests:**
  - **t52:**
    - Site layout: 8 sites with camps (one mesh), boards and pads.
    - Usable ground: slope, bumps, cross slope; the one-way low end; dry (beside the water, not in it); no trees; graded short strips vs rough.
    - Flying: empty and max-gross lift-off and climb-out from every strip in each allowed direction; heavy loads lengthen the lift-off.
    - Discovery: found by low overflight, not from 600 m up or 1.5 km away; by walking; the uphill heading really is uphill.
    - Map and nav: unfound sites hidden; FIND IT; the search circle has the site inside but off-centre; kneeboard SEARCH, then pad and type.
    - Jobs: about half go to sites (all 8 get some); site jobs mostly go back to the main strips; +20 % bush pay, main pay unchanged; special cargo still about a third; delivery to a site pad pays.
    - Save and reload, including v0.51 saves and junk ids; discovery tick < 0.02 ms and 2 draw calls; no console errors.
  - **t52h:**
    - Weights: 20–80 / 150–400 lb; about 30 % heavy; carryable pieces; pay formulas.
    - Every board starts with a heavy job and refills one; every heavy job fits; heavy clearly lengthens the roll and flattens the climb; light is within 12 % of empty.
    - Payload warning at full tanks (317 lb), gone with less fuel; LIGHT/HEAVY on the board, kneeboard and labels; W&B over-gross and payload-left lines.
    - VR two-hand hold, lift and drop; desktop hand truck and walking speeds; the class saves, and old saves derive it; no console errors.
  - **Updated:** t50 (12 boards), t51 (×1.2 bush pay), t511 (the `LIGHT|HEAVY n LB -` pieces line) and reload (save v52).
  - **All pass:** md5 unchanged, W&B tests, lint 25, feel 5/5, feelpage, t42–t4911, t50, t51, t511, t52, t52h, reload; r404 shows only the favicon.
- **Screenshots:** `deliv-v052-*.png`. For each site, an aerial on approach and the view standing at its board. Also the heavy board, the board, kneeboard and map canvases, the heavy freight on the home pad, the generator and fuel cans in the Cub, and the W&B card.

## v0.51.1 – the paper map is back, kneeboard, shipping labels; cargo-physics check
Neil's headset feedback.
- **The paper map was black. It's drawn again.** Since v0.45 (the blank slate), `drawMap()` had lost its last lines, including `return c`, so the map texture got no canvas and rendered black in the holder and in the hand.
  - Restored: the terrain hachures and contours, rivers, lakes, roads, strips, towns and places, plus the north arrow, scale bar, title, notes and fold creases.
  - The leftover "zeds" notes from the zombie era are gone.
  - **New on the map:** every strip with a job board is marked with a gold square and JOBS. Every active job draws a dashed line in its tag colour from origin to destination, rings the destination pad, and labels it with its number and title.
  - The marks go on a copy of the drawn map, which is redrawn and re-uploaded only when the set of active jobs changes.
- **Kneeboard clipboard** on your left thigh: a board with a metal clip and a lined sheet listing every active job.
  - Each entry shows its tag colour bar, number and title, pay, and FROM > TO.
  - Then the live distance and heading from the Cub to the destination pad (`3.3 KM  HDG 090`), and the pieces and total weight.
  - Then the deadline (`DUE IN 11 MIN`, `LATE - HALF PAY`), or for special cargo its meter (`FRAGILE DAMAGE 0%`, `PERISHABLE FRESH 90%`, `LIVE CALM 100%`).
  - Finally the status: ON THE HOME STRIP PAD, `2/2 IN THE CUB - STRAPPED` (or `n LOOSE` in red), or `n/m DELIVERED`.
  - VR: squeeze grip on it to lift it up in front of your eyes; let go and it goes back on your thigh. Desktop: N in the plane holds it up, and N again puts it back.
  - The sheet is one 512 x 704 canvas, checked every 0.5 s while you're in the plane and redrawn only when its text changes (distance to 0.1 km, heading to 5°). That's 2 meshes.
- **Shipping labels on every piece.** A white label on the front face (the back face for the dog crate, whose front is the wire door) and a smaller one on top. Each shows `TO` and the destination in big letters (RIDGE, LODGE, DRY FORK, HOME), the job colour as a stripe and top band, the weight, and the special-cargo icon: a red wine glass for fragile, a blue snowflake for perishable, a paw for live animals.
  - All labels live in one 1024 x 528 atlas: 16 slots of 256 x 128, plus a white strip for the unlabelled faces. All cargo shares one vertex-coloured Lambert material with the atlas as its map.
  - Each piece's mesh is its kind's shared geometry plus two label quads, merged, so it is still **one draw call per piece**. A slot is drawn once when the piece appears and freed when it is delivered or removed.
- **Cargo and the flight model: verified, nothing was missing.** Every frame the game loop calls `wbUpdate()` before `stepAircraft()`. That turns every piece aboard (at its station; a loose piece at its current spot) into `massProps()` loads, so `ac.mass`, `ac.cgz` and `ac.I` (pitch, yaw and roll inertia about the shifted CG) all reach the flight model.
  - The physics block turns those into acceleration (F/m), moments about the shifted CG (r × F on lift and drag), the angular response (I) and the gear sink limit.
  - New checks in the live page (feelpage): an empty Cub gives exactly 650 kg, cgz 0 and the stock inertias. 150 lb gives 718 kg, cgz +7.4 cm and pitch inertia 1141. A loose 40 lb parcel sliding aft in the bay moves the CG live. A takeoff run on the game's own `ac` (with `wbUpdate` between steps) gives the same roll as the offline numbers.
  - The offline cargo-feel benchmark (feel.mjs) runs the real physics block with the real `massProps` and the same autopilot for every load:

| Load | Weight | CG | Takeoff roll | Liftoff | Climb, full power, 58 mph | Stall (idle, 1 g) | Elevator to trim, 67 mph level | Pitch rate 0.5 s after +0.15 elevator | Roll rate 0.5 s after 0.4 aileron | I pitch / roll |
|---|---|---|---|---|---|---|---|---|---|---|
| Empty (pilot + full fuel) | 1433 lb | +12.96 in | 120 m | 52 mph | 885 fpm | 42.3 mph | +0.005 | 8.5 °/s | 17.9 °/s | 1100 / 950 |
| 150 lb strapped (50 bag + 100 rear seat) | 1583 lb | +15.87 in | 150 m (+25 %) | 54 mph | 758 fpm (−14 %) | 44.5 mph | −0.032 | 9.8 °/s | 18.3 °/s | 1141 / 952 |
| Max gross, aft (50 bag + 267 rear) | 1750 lb | +17.89 in | 191 m (+59 %) | 56 mph | 635 fpm (−28 %) | 46.8 mph | −0.060 | 10.4 °/s (+21 %) | 18.6 °/s | 1161 / 953 |
| Max gross, "fwd" (317 lb on the floor, +25 in) | 1750 lb | +15.14 in | 193 m | 56 mph | 636 fpm | 46.8 mph | +0.005 | 9.6 °/s | 18.5 °/s | 1111 / 953 |

  - Before and after are the same numbers: nothing in the flight model changed, and `node physics-test.mjs | md5sum` is still `eee6637ebfc2fcee37f23c2813779dd9`. That test builds its Cub without `a.mass` / `cgz` / `I`, which is exactly the empty-load reference (`massProps` returns C.MASS, cgz 0 and the C inertias), so zero cargo is bit-identical. It bakes in no payload.
  - Why a load can feel weak: typical jobs are 20–80 lb, which is 1–6 % of the Cub's weight, and the effects scale with it (a 60 lb job adds about 10 % to the takeoff roll). Every cargo station (rear seat +37, floor +25, baggage +57) is aft of the solo CG (+12.96), so cargo can only move the CG aft. The most nose-heavy the Cub gets is solo with nothing aboard.
  - Roll inertia hardly changes because cargo rides on the centreline. Real Cubs behave the same way, and fuel in the wing tanks matters more there.
  - Near max gross the differences are clear: half again the takeoff run, a quarter less climb, 4–5 mph higher stall, nose-down trim, and a livelier pitch with the CG aft.
- **Perf:** (swiftshader, the same seated views on v0.51 and v0.51.1, 3 jobs aboard): looking back at an empty cabin, 51 → 51 draw calls; facing forward, 66 → 66; looking back at the strapped load, 56 → 56 (+12 triangles of labels); looking down at the left thigh and cargo, 60 → 62 (the kneeboard's paper and board). Labels cost no draw calls. The 1024 x 528 atlas uploads only when a piece is created; the kneeboard's 512 x 704 sheet and the map's 1024 x 768 copy upload only when their content changes. The delivery tick, with the 0.5 s map and kneeboard checks, averages 0.01–0.09 ms a frame (t511: 0.007 ms with no change). CPU 1.34–1.89 ms in both versions, which is noise on the shared box.
- **Tests:**
  - t511 (22 checks): the map has paper tone and detail and isn't black; north arrow; job-board squares; the active destination gets marked; the map re-uploads only on job changes.
  - Labels: a unique slot per piece; one shared material; front + top quads merged; slot text drawn; slots freed on delivery and not leaked over a save/reload.
  - Kneeboard: lists every active job with all fields; redraws only on change; on the thigh and in the grab targets; status follows loading and straps; desktop N; a VR grip lifts it and releasing puts it back.
  - Tick cost; no console errors.
  - feel.mjs (5 checks on the table above) and feelpage (5 live-game checks).
  - All earlier tests pass: t42–t4911, t50, t51, reload.

## v0.51 – special cargo: fragile, perishable, live animals
About a third of the jobs on the boards are now **special cargo**. They pay more but come with a condition meter that sets the final pay. Special jobs have no deadline; perishables run on their own clock.
- **Fragile (+30 %): GLASSWARE (2 boxes), RADIO SET (1), EGGS (3).** Cardboard boxes with a red FRAGILE band and a white label (10–28 lb each).
  - Damage comes from jolts: touchdowns, bumps and yanks. The measure is a fast-smoothed load factor (0.08 s) minus a slow one (1 s); anything over 1.2 g above the slow one counts. A steady, eased-in steep turn doesn't hurt, but sustained pulls over 3.5 g wear it slowly.
  - Knocks also count: loose cargo hitting the walls, up to 30 % per knock. So does a drop: a piece landing faster than 1.2 m/s, e.g. dropped 2 m ≈ 60 %. A crash breaks it all.
  - A crunch plays and a message appears at each 25 % step. Pay × (1 − average damage).
  - Measured with the real flight model: a 1.2 m/s touchdown does nothing, and a 3 m/s arrival dents the eggs about 20 %.
- **Perishable (+25 %): FRESH FISH (cooler, 10 min + 2 min/km), ICE CREAM (cooler, 6 + 2/km), MEDICINE (2 med kits, 14 + 2/km).**
  - Freshness runs down in real minutes from the moment you take the job. It runs at half rate while you're airborne more than 150 m above the ground (cool air), so climb.
  - Messages at half fresh and when spoiled. Pay × (0.4 + 0.6 × fresh); spoiled pays 20 %.
- **Live animals (+35 %): A DOG (wire-door crate, 40–65 lb) and CHICKENS (two slatted hen crates).**
  - The animal is visible inside its crate. The dog looks about, the hens bob, and both get livelier when upset.
  - Rough flying upsets them: anything off a smooth 1 g, plus side force from skids. Knocks and drops upset them too, with a bark or cluck each time. They calm slowly in smooth air.
  - Barks and clucks repeat about once a second while it's rough. Pay × (1 − 0.6 × stress).
- **Meters everywhere:**
  - The board shows the special note on each offer (`FRAGILE - KNOCKS + G DOCK PAY (+30%)`, `PERISHABLE - FRESH 22 MIN (+25%)`, `LIVE ANIMALS - FLY SMOOTH (+35%)`) and the live meter on a taken job.
  - The wrist wallet line lists special jobs first, with their meter (`$150  1 JOB >LODGE CALM 76%`, `DMG 25%`, `FRESH 64%`).
  - The delivered message says why the pay is what it is.
- **Straps drawn only when needed:** the rear seat belt is only drawn with cargo on the rear seat or floor, and the baggage net only with cargo in the bay. That's 2 draw calls saved with an empty Cub. A strap with no cargo under it can't be grabbed.
- **Cargo specific force:** with cargo aboard but no measurable acceleration (first frame, teleports), the cabin now reads a resting 1 g instead of a stale value, so a freshly loaded dog isn't startled by a zero reading.
- **Save v51:** special jobs save their type, life, freshness and stress, and pieces save their damage. v50 and v45 saves still load.
- **New sounds:** `bark`, `cluck`, `crunch`.
- **Perf:** (swiftshader, the same seated views on v0.50 and v0.51, best of 8 samples each): looking back at an empty cabin, 53 → 51 draw calls (belt + net hidden); facing forward empty, 66 → 66; looking back at two strapped jobs, 56 → 56; with a dog crate, two hen crates and two med kits aboard, 61 calls (each animal is one extra mesh, so +1 per live crate). CPU 1.25–1.93 ms in both versions, within run-to-run noise on the shared box. The delivery tick with special cargo aboard costs 0.01–0.05 ms a frame (t51: 0.012 ms).
- **Tests:**
  - t51 (34 checks): special share (25–45 %) and all 8 titles; pay bonuses; perishable life formula; no deadline.
  - Pets inside the live crates; straps hidden with no cargo and drawn per zone.
  - Parked frames hurt nothing.
  - Fragile: steady 3 g = 0, a 4.5 g jolt damages and a 2.2 g bump doesn't, jolt damage within 30 % between 72 and 30 Hz, a 1.8 m/s knock = +30 %, a 2 m drop docks the pay to match, undamaged pays the full bonus.
  - Perishable: ground and aloft rates, 70 % pay at half fresh, spoiled 20 %, medicine kits.
  - Live: turbulence upsets the dog and it barks, smooth air is quiet and calming, a knock gives a bark, half calm pays 70 %, hens cluck and the wrist shows CALM.
  - A crash smashes fragile cargo; save round trip; real 1.2 and 3 m/s touchdowns through the flight model; tick cost; no console errors.
  - t50 still passes (25), and the reload test now expects a v51 save.

## v0.50 – bush delivery: job boards, physical cargo, straps, wallet
The zombie theme is gone. This is the first stage of the **bush package delivery** game (Neil's pick: job board, physical cargo loading, special cargo, unprepared sites, airdrops, economy, reputation, upgrades, characters and emergencies; no weather or wind pressure). v0.50 is the core loop: take a job, load and strap the cargo, fly it out, set it down, get paid.
- **Job boards.** HOME STRIP, RIDGE STRIP, LODGE and DRY FORK each have a wooden job board on two posts and a yellow pad with a black X.
  - A board offers three contracts from that strip. Each shows the job, the destination strip and distance, the total weight and the pieces, the pay, and an optional deadline in game minutes (+40 % pay).
  - VR: poke **ACCEPT** with a fingertip. It arms when your finger is clear of the paper and fires once on touch, like the Settings board. Desktop: stand by the board and press 1–3.
  - Up to 3 jobs at once. A taken job turns green and shows where its cargo is and the time left. CANCEL works while all of its cargo is still on the pad.
  - Offers come from a seeded generator, keyed to the running job number, so a reloaded board shows the same jobs.
- **Physical cargo.** Accepting a job puts its pieces on the origin pad:
  - parcels (8–20 lb, taped cardboard);
  - sacks (25–50 lb, burlap with a red band);
  - crates (35–70 lb, slatted wood).
  - Each piece has a coloured job tag that matches the job's bar on the board. A piece is one vertex-coloured mesh with one shared material.
  - VR: squeeze grip on a piece to carry it (either hand) and let go over the rear seat, rear floor or baggage bay to load it there. Let go anywhere else and it falls to the ground or pad.
  - Desktop: E picks up the nearest piece in front of you. E by the Cub loads it (heavy pieces on the rear seat, light ones in the baggage bay, else wherever it fits). E elsewhere sets it down, and E by the Cub with empty hands takes the last unstrapped piece out.
  - Climbing in with a piece in your arms puts it in the back.
- **Strap-down.** The rear seat lap belt and the baggage net from the full-game branch's v0.25 cargo code are the strap anchors. Squeeze the buckle or the net anchor to buckle or undo it. Desktop: / does both.
  - A strapped piece can't be taken out until you undo it.
- **Real weight and balance.** Each piece is a load at its station: rear seat +37 in, floor +25, baggage +57 (50 lb limit).
  - It goes through the existing `massProps()` into `ac.mass` / `ac.cgz` / `ac.I`, the same W&B inputs the flight model always had. The physics block is untouched (md5 unchanged).
  - A piece held in your hands in the seat rides at +11.
  - The laminated W&B card gains REAR SEAT / BAGGAGE / FLOOR rows (LOOSE in red until strapped, baggage red over 50 lb).
  - The full-game W&B reminder is back: one warning when the throttle goes up on the ground while over gross, out of CG limits, or with 10 lb or more of loose cargo.
- **Loose cargo shifts.** This is the v0.25 full-game loose-cargo model, adapted. Unstrapped pieces slide, hop and float with the specific force the airframe feels: hard braking, full power, skids, rough ground, and a hard landing (over 2.3 g makes them bounce).
  - Pieces bump the walls and bulkhead with a thump in the hands, and a piece can slide off the rear seat onto the floor. The CG follows them.
  - Strapped pieces never move.
- **Delivery.** Set every piece of a job down on the destination's yellow pad and the job completes. The customer takes the cargo, the wallet is paid (half pay if the deadline passed), a cash-register ping plays, the game saves, and the board posts a new job.
- **Wallet on the wrist board.** The top line of the left-wrist screen is now gold: the cash and your most urgent job (destination and minutes left, e.g. `$150  2 JOBS >DRY FORK 11M`). It is also the first line of the desktop HUD. The wrist lines are now 16 px (the wallet line 14 px bold) so four fit above the SETTINGS button. New games start with $150.
- **Save v50.** New `dlv` save field: wallet, game clock, job counter, every board's three jobs, every piece of cargo (ground position and yaw, or zone and spot in the Cub) and both straps.
  - Saves soon after a take / load / set-down / strap, and straight away on payment.
  - Migration: a v45 save (v0.45–v0.49.1) still loads its Cub, fuel, time and on-foot spot, and starts a fresh $150 wallet with new boards.
  - A held or falling piece is saved where it is, as lying on the ground.
- **New sounds:** `thud` (cargo set down or shifting) and `cash` (paid).
- **Placement:** the boards and pads are clear of the roads, buildings and windsocks, and the trees, bushes and rocks near them are cleared the same way the v0.38 sites clear theirs. Boards and pads are plain Lambert, so the static batcher merges them. Only the four 512 x 352 paper canvases are extra draw calls, and boards more than 400 m away are hidden.
- **Perf** (swiftshader, the same views on v0.49.1 and v0.50, two jobs accepted): on foot facing the home board and pad, 42 → 49 draw calls (the board's paper plus one per cargo piece; the pad and posts batch), +0.6k triangles, CPU 1.56 → 1.92 ms. Seated facing forward with the cargo loaded, 42 → 44 calls (belt and net), CPU 1.45 → 1.49 ms. Looking back at the load, 67 → 74 calls. The delivery tick costs 0.01–0.04 ms a frame.
- **Tests:**
  - t50 (25 checks): poke accept (once per touch), the 3-job limit, cancel rules, a VR grip carry and release onto the rear seat, desktop E carry and load, gross = 1433 + cargo, baggage at +57, `ac.mass` / `cgz` / `I` equal to `massProps` with the cargo, belt buckle grab, strapped pieces locked, loose baggage sliding to the bulkhead under power, a hard-landing hop, a real flight-model hard landing (loose baggage moves 11–14 cm, the belted load doesn't), delivery and pay, half pay when late, save-field round trip, delivery tick cost, and no console errors.
  - The reload test now expects a v50 save, checks that wallet, jobs, loaded cargo and the belt survive a real reload, and that a v45 save migrates.

## v0.49.1 – stick stays put, thumb fixed
- **The stick stays where you let go of it** (Neil: "Make the stick stay where it is when the player lets go as opposed to centering.").
  - Settings > Stick on release now defaults to **STAYS**. A released stick keeps its deflection: the stick mesh, the aileron and elevator inputs the flight model gets, and the knob position all stay put, and the glove lets go.
  - Re-grabbing picks up from the held position with no jump in inputs or knob.
  - **CENTRES** is still available.
  - Saved settings from before v0.49.1 that hold CENTRES (the old default) switch to STAYS once. Settings now save as version 49, so CENTRES chosen after that sticks.
- **Glove thumb fixed** (Neil: "Some of the glove thumb geometry is not correct").
  - **Twisted thumb.** The thumb bones took their roll from the hand's wrist axis projected across each bone. Between the proximal and distal segments that flipped by 170–260° in every pose, so the blended joint ring twisted into a pinched neck, and the metacarpal rolled 9–60° depending on the pose. Now the metacarpal's roll comes from a fixed nail direction, and the next two bones carry it by minimal rotation. Twist is now 0° in all poses, and the nail side faces out at 50–62° from the back-of-hand plane.
  - **No web.** The thumb came out of the heel of the palm as a separate stalk. Now the index-facing side of the metacarpal and thumb base is drawn onto the palm's thumb-side edge and skinned partly to the palm, which forms a leather web that follows the thumb.
  - **Thumb colours** (leather pad and web, fabric over the nail) now come from the thumb's own frame.
  - **Left-hand bone frames** now mirror the right hand's, matching the WebXR joint convention. In v0.49 a tracked left hand (Quest hand tracking) would have shown its glove rolled half a turn on every bone.
  - Both gloves were checked for inside-out faces (positive enclosed volume) and gaps or spikes at joints.
- **Door and window handles move with their panes** (Neil: "the latch levers on the right door and right window stay floating"). The handle blocks were static-batch members. When several pieces of one pane started moving in the same frame, each batch drop cleared the attribute's pending upload ranges before adding its own, so only the last piece's collapse reached the GPU. The others stayed drawn where the closed door or window had been, with the latch lever apparently left beside them. Now the ranges add up (three.js clears them after the upload). The latch levers are also drawn after the panes move each frame, where before they lagged one frame. All four (right window, door, left front, left rear) are checked.
- **Throttle 4 cm forward, quadrant bar clear of the map holder.** The grey quadrant bar on the left wall (the "armrest") reached 6 cm into the map holder and ran mostly ahead of the knob. It now runs exactly under the knob's travel, which puts it 2.4 cm aft of the holder. The knob sits 4 cm further forward at idle and full. The grab zone, label, haptic stops, procedural grip and travel all follow the knob.
- **Tests.**
  - t491 (13 checks): the default, release holding the inputs, the mesh and the flight-model inputs, the glove letting go, a re-grab with no jump, moving on from the held position, CENTRES still centring, and the migration.
  - t49 has 2 new thumb checks (twist, nail angle).
  - t42 now tests CENTRES explicitly and STAYS as the default.
  - t4911 (13 checks): all four panes' batched pieces are dropped and uploaded in the same frame, the latch levers follow their handles in the same frame, the throttle is 4 cm forward, and the bar runs under the travel and clear of the map holder.

## v0.49 – flying gloves (Neil: "Can you make the hands look like flying gloves.")
- **New glove model.** The 34 boxes are replaced by one low-poly pilot flying glove per hand: 930 triangles, flat-shaded and faceted. It has:
  - a shaped palm and back of the hand (superellipse sections), a thenar pad, and knuckle ridges with a seam across them;
  - tapered six-sided finger segments with knuckle, PIP and DIP bumps;
  - a thumb whose root blends into the heel of the palm to form the web;
  - leather fingertip caps with a seam ring;
  - a short flared gauntlet with a dark strap band, a raised velcro tab and a snap, and a dark inside at the cuff.
- **Colours.** A fabric (Nomex) back and a contrasting leather palm and fingertips, with a small per-panel tone variation. New setting **Gloves: SAGE / BLACK / TAN** (board and desktop panel, saved). SAGE is the default: sage Nomex with a tan leather palm.
- **Same skeleton.** The glove is skinned to the existing 17 hand bones: rigid per-segment frames plus a 50/50 blend on the shared joint rings, with 2-bone blending in the vertex shader (17 matrix uniforms). v0.46 procedural grips, the poke pose, the relaxed idle, the soft stop and hand tracking are unchanged. Every joint ring belongs to both bones, so curling cannot open a gap. Finger and thumb roots are pulled inside the palm, so they stay buried in every pose.
- **Cost.** One mesh and one material per hand (2 draw calls, previously 1 instanced call for both). 1,860 triangles for both, previously 408. Per frame it writes 34 preallocated matrices and allocates nothing. The mesh is built once, lazily, and stays in the cockpit-carried frame (v0.46.1), so there is no far-from-origin jitter.
- **Tests.** t49 (15 checks): triangle budget, draw calls, watertight / no gaps across idle, point, fist, stick, mag key, mixture and primer poses, joints not collapsing, the glove following the bones, the index tip at the poke point, little sinking into held controls, the mirrored left glove, palettes and saving, no per-frame allocations, a hidden hand not being drawn. t46.1 now checks the glove skin matrices.

## v0.48 – Quest GPU pass (Neil: "It was down to 40 after take off")

**Part 1: what gets drawn once you are airborne**
- **The ground is vertex-lit** (Settings > Terrain shading, default FAST+GRAIN). The hemisphere and sun light are worked out per vertex with the same maths as Lambert, and the faces stay flat because the ground already has face normals. The fragment shader only does the grain texture, vertex colour and fog. Per-pixel lights are still needed for the landing light and for shadows, so those switch the ground back to FULL by themselves. Both looks are compiled at load. FAST+GRAIN and FULL screenshots differ only at the spinning prop. The grain texture's anisotropy drops from 4 to 2 unless FULL is set.
- **Scenery instances are culled by size and 3D distance.** Every instanced type (bushes, rocks, posts, bales, tyres, poles, houses as well as trees) is now distance-managed. Small things are drawn out to 900 × their size (about 1.5 px on a Quest 3), measured in 3D, so from 600 m up they simply aren't sent. Previously bushes and rocks were drawn out to 1.8 km, and posts and bales always.
- **The forest thins with height.** The every-3rd-tree band starts closer the higher you are (down to 55 % of the distance by 1200 m AGL), and an every-6th band starts at twice that distance.
- **Fewer, smaller instance uploads in flight.** The cull lists rebuilt every 40 m, which meant about 1 MB of uploads every 0.8 s at cruise. Now they rebuild every 40 m + 0.2 × AGL, and only the drawn part of each buffer is uploaded.
- **No batch hitch when something first moves.** When a batched part starts moving (seen on the takeoff roll), its triangles are now collapsed in place with one small upload. Before, the whole cell was re-merged, which cost 27–35 ms on desktop and probably several times that on Quest.
- **Defaults (BALANCED):** render scale 90 % (it was 100 %), refresh 72 Hz (it was AUTO), Terrain shading FAST+GRAIN. A saved settings copy that still holds the old defaults (100 % / AUTO) moves to the new ones once. The Forest setting gains OFF.

**Part 2: find it in the headset, and cope automatically**
- **PERF strip on the wrist Settings board.** It shows:
  - fps, frame ms, worst frame, CPU ms, draw calls and triangles;
  - the foveation the XR layer actually reports (`fixedFoveation`, or UNSUPPORTED), the layer type and framebuffer size, the refresh rate (and the supported list), MSAA and the render scale;
  - the Auto resolution step, the drawn instance count and the ground shading.
- **Settings board:** 10 rows a column, frame-rate rows first, plus new **PERFORMANCE** and **BALANCED** preset buttons (also on the desktop panel).
- **Auto resolution** (new setting, default ON). After more than 1 s over budget (1.2 × the frame time at the session's refresh rate), it steps down: 85 % viewport + foveation HIGH, then 75 % + forest 75 %, then 65 % + forest 55 %. After about 10 s on budget it steps back up; if it bounces, the wait doubles (up to 80 s).
  - The viewport is reduced live with WebXR `requestViewportScale`, requested just before three.js reads each view's viewport. The PERF strip says whether the headset honoured it.
  - Turning the setting off, or leaving VR, restores full resolution.
- **Audit findings** (desktop, see the tables in the report):
  - The ground was the largest fill cost, and about two thirds of that was its per-pixel shader.
  - Next came small scenery instances that are sub-pixel from altitude, and the forest's vertices.
  - MSAA 4x and shadows are the most expensive switches. Shadows are off and their map is not allocated by default.
  - Per-frame JS in flight stays under 0.2 ms; the panel and wrist redraws are the largest.
  - The heap is flat across a simulated flight (it returns to baseline after GC).
  - The only flight-specific hitches were the cull-list uploads every 0.8 s and a batch re-merge on the takeoff roll. Both are fixed in part 1.
- **Prewarm:** every panel-glow / landing-light / terrain-look combination is now compiled at load. v0.47 only compiled both-on and both-off, so the landing light alone by day still compiled new shaders.
- Tests: new `t48` (22 checks: defaults and migration, shadows not allocated, ground looks and fallbacks, no compile on the landing light, size / height culling, rebuild spacing, in-place batch drops, board hit-tests and presets, PERF strip, Auto resolution step logic).

## v0.46.1 – Headset fixes: steady hands, a primer that stays put

Fixes from Neil's headset test (shipped on top of v0.47 part 2).

- **Hands shimmered and jumped while the Cub was moving.** The glove mesh lived in world coordinates, so its instance matrices carried the aircraft's world position (kilometres) in float32, and so did the view matrix it was multiplied by. The GPU subtracts the two huge numbers and loses the low bits. That makes the hand wobble against the cockpit by millimetres near the strip and more the further out you fly (about 1.6–2.6 mm at 23 km). The cockpit itself was steady because three.js forms its model-view matrix in double precision on the CPU.
  - The hand pose maths was already in sync with the plane: physics, then the plane transform, then this frame's controller poses, then hands, then render. A new test measures the hand-to-cockpit and hand-to-stick offset frame to frame while flying fast and turning, and finds about 1e-11 m of change.
  - Fix: the glove mesh is now carried in your own frame (`xrOffset`, inside the cockpit rig) and its instances are written relative to it, using this frame's plane pose. As drawn, the error is now under 0.0001 mm anywhere on the map.
  - There is exactly one hand mesh; the test checks this.
  - The shadow map (when shadows are on) refreshes every frame again while anything moves. v0.47's half-rate refresh made moving shadows step.
- **The primer flicked between LOCKED and UNLOCKED while pumping.** Root cause: the lock was read from your wrist roll at all times. The unlock reset the twist reference to your twisted wrist, and relocking accepted a 40° twist in *either* direction whenever the plunger was within 4 mm of home. So every time a stroke bottomed out, relaxing or rolling your wrist relocked it. The next roll unlocked it again.
  - Now locking and pumping are separate. While the plunger is out more than 5 mm, the twist reference follows your hand, so wrist roll means nothing.
  - Locking needs the plunger fully home (under 1 mm) and a twist back the way it unlocked: past 30°, with 10° of hysteresis, held for 150 ms. Unlocking needs the same deliberate held twist.
  - Twisting further open just rides the stop.
- Tests: new `t461` (hand rigidity and float32 draw error at speed in a turn 23 km out; a single hand mesh; primer: brief or small twists, ten pump strokes with ±35° jittery wrist roll, twisting with the plunger out, relock and hysteresis). `t44` now holds its primer twists for 150 ms.

## v0.47 – Frame-rate pass (Quest 3: steady 72 / 90 Hz)

Neil: "Do whatever you need to bring it back to a good fps".

**Profile (v0.46, desktop / swiftshader, so the counts are exact but the times are only relative).**
- JS per frame was already small: physics, cockpit, hands, chunks and audio together come to well under 0.1 ms. The big costs were draw-call submission (×2 eyes in VR) and per-pixel shading.
- Every lit pixel paid for four lights, including an unlit point light and an unlit spot light.
- The clouds were alpha-blended for their whole lifetime.
- The far plane was 14 km, while the haze ends at 8.5 km.

**Part 1 changes**
- **Static batching.** Plain-coloured Lambert meshes are baked to vertex colours and merged into one mesh per look: the Cub's parts (cockpit and airframe, not your hands or rig) in one group, and the world's scenery per 250 m cell. The originals stay put on a hidden layer and are watched. The first time code moves, hides, recolours or rewrites one (a knob, a needle, a window), it goes back to drawing itself and its batch is rebuilt without it. So everything that animates still animates. The build takes about 40 ms once, half a second after load. Watching costs about 0.005 ms a frame. `?nobatch` turns it off for comparing.
- **Lights only while lit.** The panel-glow point light and the landing-light spot light are only in the shaders while they are on. Both shader variants are compiled at load, so switching has no hitch. By day, every lit pixel now does two lights instead of four.
- **Opaque clouds.** No blending and no sorting. They fade out with a 4×4 ordered dither when you fly into one, instead of alpha.
- **Far plane at the haze.** The far plane is now just past the fog end (8.75 km at default settings, never below 7.3 km, so the stars and moon stay in). Past the fog end everything is sky colour anyway.
- **Less per-frame work.**
  - Forest / rock compaction no longer allocates a typed-array view per instance.
  - The panel info screen only re-uploads when its text changes (it was every 0.25 s).
  - Instanced scenery has `matrixAutoUpdate` off.
  - With shadows on, the shadow map refreshes every other frame.
- **Numbers.** Draw calls / triangles, v0.46 → v0.47: cockpit 91/277k → 64/305k, 600 m 86/260k → 63/291k, on foot 55/269k → 47/304k, town 131/266k → 84/266k. Render submission (desktop ms): cockpit 1.26 → 0.40, town 0.85 → 0.57. Triangles go up a little where merged cells can no longer be culled piece by piece. That is a deliberate trade: Quest 3 is limited by draw calls and pixels long before triangles.
- **Visuals:** the same. Batched vs unbatched screenshots differ by under 1.3 % of pixels, and only at anti-aliased edges and the spinning prop.

**Part 2 changes**
- **No per-frame shader re-picking.** The prop-blur disc was double-sided and transparent, so three.js drew it in two passes and re-chose its shader program twice every frame. It is now drawn in a single pass, which looks the same for a flat disc. Nothing else re-picks shaders per frame now.
- **One latch material.** The window latches shared a material between instanced and plain meshes, which made the GPU switch programs back and forth. They now have their own copy.
- **Empty scenery chunks are hidden,** so they cost nothing.
- **Tile-split forest and grass: measured and left off.** Splitting the instanced forest, rocks and grass into tiles so that each tile is frustum-culled is available as `?tile=N` (tile size in metres). It cut triangles by only 5–20 %, but multiplied draw calls by 1.5–2.7× (for example, at 1500 m tiles: cockpit 64 → 151, town 80 → 214). On Quest that is a bad trade, so the default is off.
- **No LOD / impostors.** Trees are already 10–60-triangle instances that thin out with distance, and town buildings are merged into the 250 m cells. Impostors would add draw calls and texture fetches for no gain.
- **Defaults kept.** Render scale stays at 100 %, and foveation is already at its maximum (HIGH) by default. If a scene still drops frames, see "Frame rate" in CONTROLS.md.

## v0.46 – Procedural hand grabbing

Neil: "I want the hands to procedurally grab the knobs realistically".

- **Your hand now takes hold of each control by its own shape.** The preset snap poses (fist, pinch) are gone for the stick, throttle, flap T-grip, trim crank, primer T-handle, mag key, fuel valve pointer, mixture, carb heat and panel-light knobs, the MASTER rocker, the landing-light toggle, and the four window / door handles.
- **On grab, the glove lines up with the control.**
  - Wrap grips (stick, throttle, flap T, primer T, trim knob, window handles): the hand's finger-width axis lies along the grip, the palm sits on it at the grip's radius, and it slides along the grip to where your hand is. How far round the grip your hand goes is set by your wrist, so it matches how you reached.
  - Pinch grips (key, valve pointer, small knobs, rocker, toggle): the hand keeps your wrist angle with the knob between thumb and index.
  - A flat handle's depth under the palm is worked out from your hand angle.
- **The fingers close joint by joint until they touch.** Knuckle, middle and tip joints curl in turn until a bone touches the control's shape: a capped cylinder or a box, sized per control. On a pinch, the ring and little fingers tuck. The thumb opposes, pulled onto the far surface with its metacarpal swung round to reach it. Thin grips (primer T, trim knob) close tighter than the fat stick grip.
- **The fingers stay on and roll with the control.** The grip is stored in the control's own frame. The hand turns with the mag key through every detent and into the START spring, comes out with the mixture / carb / primer knobs, tilts with the stick, swings with the flap lever and window frames, and orbits the trim crank's spinning knob without twisting.
- **Blend in and out:** 100 ms smoothstep from your free hand to the grip and back when you let go.
- Unchanged:
  - The idle hand: relaxed, thumb tucked, following your real fingers (trigger = index, grip = lower fingers).
  - Squeezing with nothing to hold still points the index for pokes.
  - START keeps its pointed finger, and the checklist card keeps its hold.
  - Hand tracking.
- **Cost:** one solve per grab takes about 0.06 ms (desktop, swiftshader). Holding costs one matrix product a frame, with no allocations: all scratch vectors and the per-hand arrays are made once. Draw calls and triangles are unchanged (91/277k cockpit, 85/264k at 600 m, 55/269k on foot, 131/266k in town).
- **Tests:** new t46 (15 checks).
  - Every control gets finger contact, with no bone inside the shape and the thumb on the surface.
  - Thin grips close tighter.
  - Stick: blend in partway at 56 ms and done by 125 ms; it rides the stick; solved once per grab; blends back out to the free hand.
  - The hand turns with the mag key, comes out with the mixture, wraps the flap T-grip, and orbits the trim crank.
  - Idle and point poses.
  - Cost, and no console errors.
- Physics md5, W&B, t42–t45 and the reload test all pass unchanged.

## v0.45 – Blank slate: the Cub, the valley and the map

Neil: "Can we create a blank slate. Remove all game mechanics bar the aeroplane and map and systems required to fly the plane. Remove wind."

**The full game is safe.** v0.44 as it was, with zombies, the survival loop, the story and the weather, is tagged **`v0.44-full`** (commit `acd14f3`) and kept on the branch **`full-game`**, both pushed to GitHub. `git checkout v0.44-full` (or `full-game`) brings it all back, `assets/` included. `main` carries on from the blank slate.

**Kept**
- The Super Cub: the flight model (the physics block and its md5 baseline did not change), engine cold start, mixture / carb / primer / mags, fuel burn with sputter and engine-out, gear and tyre physics, and weight and balance (empty plane, pilot and fuel).
- The whole v0.42–v0.44 cockpit: the roof flap handle and trim crank, the 3D panel and gauges, the key, primer, valve, latches, toggles and labels, the gloves, the haptics.
- Walking, getting in and out, the paper map and its cockpit holder, all of the terrain: mountains, rivers, forests, the cabin, lodge, Dry Fork and research station strips, the towns, farms and sites as plain scenery. Sky and clouds. Settings.

**New**
- A new game starts **on foot beside the Cub** at the cabin strip (`?plane` starts you in the seat).
- **Refuel pump:** a red drum and hand pump beside the Cub's parking spot. Taxi back to it, stop, shut down and grip a wing filler cap (desktop G by a cap). It pumps 3 L/s while you hold on. A reset now tops you up to 25 % only.
- **Time of day is fixed:** Settings → Time of day (EARLY / MORNING / AFTERNOON / LATE / SUNSET / NIGHT, default MORNING). The sun, sky, shadows and panel lights follow it, but the clock never runs.
- **VR settings:** poke the screen on your left wrist to open a SETTINGS board in front of you, then poke rows to cycle them. Desktop: ` / F2 as before.
- **New save** (`bushpilot-vr-blank-v1`): where the Cub is parked, fuel, time of day, and on foot or aboard. Old saves are ignored, never loaded.

**Removed (the code is deleted, not just switched off)**
- **Weather and wind:** no wind field, gusts, turbulence, ridge lift, rain, fog, storms or lightning, and no weather radio. Nothing feeds `ac.wind`, which stays [0, 0, 0]. The windsocks hang limp.
- Zombies, the depot horde, animals and wolves, hunting and dressing.
- Loot, items, the inventory, pack, belt and pockets. Knife, canteen, rifle, bow and arrows, hatchet, hammer, wrench, torch, compass, binoculars. Melee and force-pull. Crafting and the field guide (settings moved to the wrist).
- Hunger, thirst, stamina, health, sleep, spoilage and food.
- The story, the clues, the survivors, the radio, the tutorial notes and the forest wake-up opening.
- Fortifying (boards, nails, the gate, the generator), and the dusk deadline and day / night clock.
- Fuel scarcity (avgas / mogas drums and taps, siphoning, cans, mogas detonation). Cub upgrades (long-range tank, tundra tyres, cargo pod, LED light, COM radio). Cargo loading and straps, strongboxes, flares.
- `assets/items.glb` and `assets/animals/*.glb` are no longer loaded and have been deleted from the repo (the tag still has them).

**Numbers**
- `index.html`: 873,775 → 405,848 bytes (−54 %), 8,756 → 4,202 lines.
- Draw calls / triangles (desktop, swiftshader, default settings), v0.44 → v0.45: cockpit 132/318k → 91/277k, 600 m 109/302k → 85/264k, on foot 97/310k → 55/269k, in a town 219/313k → 131/266k.
- Deleting code that drew from the seeded random streams moves some later scenery (trees, rocks, some town props) a little compared with v0.44. The terrain, rivers and strips are unchanged.

**Tests:** `physics-test.mjs` md5 unchanged (`eee6637e…`), W&B ALL PASS, t42 / t43 / t44 (assertions about removed systems dropped), new t45 (15 checks: start by the Cub, removed systems gone, wind stays zero, no .glb loads, time-of-day setting, desktop walk, pump fill both ways, wrist settings, desktop cold start and takeoff), reload (fresh start, old save ignored, the plane and on-foot saves survive), and no console errors apart from the favicon 404.

## v0.44 – Cockpit hands, part 3: key, primer, valve, latches, cabin structure

- Mag key is a real ignition key (chrome bezel, brass bow) that you turn by rolling your wrist through OFF / R / L / BOTH, then on into a spring-loaded START. START cranks the engine while you hold it (the spring buzzes back at you), and when you let go it springs back to BOTH with a click. The START button and the Space key still work. The key's label shows START.
- Primer is locked in. Roll your wrist a quarter turn to unlock it (click and buzz), then stroke it: every full pull-out and push-in adds one shot, using the same cold-start maths as before. Push it home and twist it back to lock it. Tapping it still gives one shot, and so does the P key.
- Fuel selector: a tapered red pointer handle on a boss. It turns by wrist roll, with a firm detent click at OFF and ON and a bump at the end stop. The fuel system has a single feed (the main tank, plus the aux tank when the v0.32 long-range tank is fitted), so the positions stay OFF / ON. The label says ON - MAIN + AUX when the aux tank is fitted.
- Door and window latches: each of the four (right upper window, right lower door, left front and rear sliding windows) has a latch lever next to its handle. While shut they are latched: squeeze the handle and roll your wrist about 35° until it clacks free, then open it as before. Shut it and let go, and it latches again. Keys 1-4 and getting out work the latches for you. The four levers are one instanced mesh.
- Toggles (MASTER rocker, landing-light bat) snap over with a spring and a little overshoot, and the key, fuel valve and primer handle snap to their detents. Fingertip flicks and grip both work, as before.
- Hand poses: the START button gets a pointed index finger. Knobs, the key and switches keep the pinch, and the stick, throttle, flaps and window handles keep the fist.
- Cabin structure, one merged mesh: a grey-green 4130 tube frame (longerons, windscreen and door posts, rear window posts, sill tubes, diagonals, roof carry-through tubes, skylight frames), wood stringers in the rear cabin, a fabric headliner with bows over the rear seat, and a front-seat harness (shoulder straps, lap belt halves, buckle, anchors). New placards in the panel atlas: FASTEN SEAT BELTS / NO SMOKING, the door latch instructions, and the window latch instructions with BAGGAGE 50 LB MAX.
- The instrument panel wear speckles and chips are toned down (about 35% fewer, fainter), and the glass glint is a little subtler.
- Perf (v0.43 → v0.44): cockpit 130 → 132 draw calls / 317k → 318k tris (the cabin frame and the latch levers are one call each); alt600 107 → 109 / 302k; foot 96 → 97 / 310k; town 217 → 219 / 313k.
- Tests: physics md5 unchanged (eee6637e...), ALL W&B TESTS PASS, RELOAD PASS, t42 28/28, t43 4/4, new t44 22/22: key through every position into START and spring-back, primer lock / unlock / strokes / relock, valve twist with detent and stop, window and door latches, desktop keys working the latches, toggle snap overshoot, fingertip poke, START with a pointed finger, cabin mesh. No save-format change (the latch and primer-lock state is not saved; both reset to locked).

## v0.43 – Cockpit hands, part 2: 3D instrument panel

- Instruments look like real 3D gauges, not screens: every dial sits in a machined bezel with a flange, a recessed cup, a lip and four screws, under glass with a soft glint that slides as your head moves. Needles stand about 4 mm off the face, and a painted shadow under the rim adds depth.
- Painted instrument panel with worn paint, rivets, a glare pad and placards (PA-18 SUPER CUB, CARB HEAT IN RAIN!, TACH, FUEL, OIL), plus a compass correction card.
- New OIL gauge (pressure on top, temperature below) that follows the engine. The FLAPS/warning info window is now a smaller framed display.
- Panel lights: a new PANEL LT rheostat (OFF / DIM / BRT) in the switch strip. Twist it with your hand or press K in the plane. It only works with the MASTER on, and at night it gives the gauges a warm glow.
- Wet compass rebuilt: an amber-glass housing, and a card that lags and swings past the heading, tilts with pitch, roll and the ball, and shivers with the engine.
- The glove soft stop now stops on the front of the bezels.
- Perf: all gauge faces, the switch strip and placards now share one texture atlas mesh, and the bezels and glass are one mesh each. Cockpit 135 → 130 draw calls (v0.42 → v0.43), 311k → 317k tris; alt600 112 → 107 / 301k; foot 96 / 309k; town 221 → 217 / 312k.
- Tests: physics md5 unchanged (eee6637e...), ALL W&B TESTS PASS, t42 28/28, t43 4/4 (oil needles, K panel lights, master-gated tint, compass swing), RELOAD PASS. No save-format change.

## v0.42 – Cockpit hands, part 1: overhead flaps, trim crank, stick and throttle feel
- **Flap handle moved to the roof.** It hangs from a new overhead console on the windscreen top bow, above your head to the left, like an overhead Johnson bar. Reach up, grab the black T-grip with either hand, and pull it **down** through the notches 0 / 15 / 30 / 50°. Push it up to retract. Each notch has a clunk, a firm buzz and a notched quadrant plate the pawl drops into. The handle stays close to its notch while you hold it, and you feel a bump at both end stops. It drives `ctl.flap` exactly as before. Desktop `[` / `]` are unchanged and now play the clunk too. The old left-wall lever and its quadrant plate are gone.
- **Overhead elevator trim crank** beside the flap handle. Grab the knob and wind it: anticlockwise as you look at it = nose up. Three turns end to end, eight clicks a turn, and a white pointer slides along a slot next to it. Trim is a bias on the elevator (up to ±30 % of travel) that the stick doesn't show. It is applied around the physics step, so the flight model is untouched. Desktop: hold **PageDown** (nose up) / **PageUp** (nose down). It resets to neutral with the plane.
- **Stick:** the stick now pivots about its floor mount under your hand, so the grip stays under your glove. It has round-cornered travel limits (full aileron and full elevator together reach about 84 % of each) and a bump when you hit the stop. **Let go and it centres** (about 0.4 s). Settings has a new **STICK ON RELEASE: CENTRES / STAYS** row for the old behaviour. New model: rubber grip with finger ridges, cap, leather boot on the floor. Still one draw call.
- **Throttle:** a proper push-pull knob on a stem out of the wall slot, with a light tick every 10 % and a firm stop with a click at idle and full.
- **Gloves stop at the instrument panel.** A free hand can no longer sink through the panel, switch strip or card holder. The glove rests on the face, but the poke and grab maths still use your real hand, so pushes, flicks and START work as before. If your hand goes more than 18 cm in (a tracking glitch), it is let through.
- **Control labels:** a small tag by your hand names the control you are holding or have ringed, and its state: MASTER ON, MAGNETOS BOTH, FLAPS 30°, THROTTLE 45%, ELEVATOR TRIM NOSE UP 3, DOOR OPEN and so on. The tag is redrawn only when its text changes, and costs one draw call while it shows. Turn it off with Settings > **CONTROL LABELS**.
- **Settings** page now has 17 rows (9 per column).
- **Overhead console** (one mesh): plate, front lip, flap hanger with a notched quadrant, trim boss and indicator slot, dome light. Its placard (FLAPS – PULL DOWN 0 15 30 50 / TRIM NOSE DN / UP) is on the console's underside, so you can read it when you look up.
- Tests: new t42 cockpit test with 28 checks (simulated controllers): flap ring and grab with each hand, four notches down, retract, haptics count, trim one turn = +1/3 and back, trim bias on the elevator only, stick directions, corner limit, knob under the hand, centring and STAYS, throttle travel, ticks and stops, ring + grip on the master switch, label text, labels off, glove soft stop, desktop flap and trim keys. Save → real reload passes. Physics md5 unchanged; W&B tests pass.
- **Perf** (box test views, calls / tris): cockpit 132 / 310k → 135 / 311k; 600 m 109 / 294k → 112 / 295k; foot 96 / 309k (same); town 218 / 304k → 221 / 306k. The moving flap lever, trim crank and trim pointer are a draw call each; the stick (was 2 calls) and throttle are 1 each.

## v0.41.1 – Cleanup
- **Fix (since v0.36): reloading the page with a saved game crashed on start.** Loading a save tried to restore the weather before the weather system existed ("Cannot access 'WX' before initialization"), which stopped the game script. Now the saved weather is applied once the weather is built. Saves made since v0.36 load again.
- Depot fence: still solid; it was the test that was wrong. Since v0.38, other places (checkpoint fences, sheds, strongboxes) also add solid walls, so "exactly 5 solid runs" stopped being true. The fence's five runs are now listed on their own (`DEPOT_FENCE`), and the test walks into every run from both sides. The full t34 round trip (save, real reload, new game) is back in the regression suite, plus a separate reload check.
- Strongboxes: each is now one baked vertex-coloured mesh (one draw call), rebaked while the lid swings open. Town view back to 89 calls (v0.40: 88, v0.41: 99).

## v0.41 – Tools
- **Binoculars** (fire lookout, ranger station): in VR hold them up to your eyes for a 7x view inside a dark ring (the world around stays still, so it is comfortable); desktop **7** zooms. They name the place you are looking at, its distance, and how many dead are moving there. They clip to a new chest-strap home on the harness.
- **Flare gun + flares** (medevac crash, strongboxes): fire it up and a red flare hangs under a chute for ~30 s. Every walking zombie within 250 m heads for it, except ones already right on you. One shell at a time: an empty pull reloads from a box of FLARES (3 per box) in your kit. Desktop **8**.
- **Crowbar** (sawmill, a car on the east road) and **six steel strongboxes**, padlocked: in the Cutler and Hollis sheriff's offices, the ranger station, the mine, the motel office and the army checkpoint. Put the claw to the lock and pull the trigger: three heaves and the hasp tears out. Inside are ammo, medkits, flares, a water filter or lamp oil. Desktop **C** within reach. Opened boxes stay open in your save.
- **Handheld radio** (checkpoint, ranger station): the cabin set's broadcasts anywhere. Trigger or desktop **9**. It clips to the left chest strap.
- **Fishing rod** (campground, hunting cabin): telescopes out in your hand. Face open water and trigger to cast a float. When it bobs under ("A BITE!"), trigger again within ~2.5 s: usually a trout or grayling, i.e. raw meat at your feet. Walking off reels in. Desktop **0**.
- **Map pencil** (cabin workbench): trigger or desktop **H** marks a numbered grey X on your map where you stand. You get 12; the oldest is rubbed out.
- Field guide: a TOOLS YOU CAN FIND page (TOOLS tab) and entries for every new item; weights on the W&B card; flares and the pencil fit belt pouches.
- Save: strongbox state and pencil marks are saved. Older saves get the tools placed in the world on load.
- Fix: a saved item count (a box of flares, a single board) no longer overwrites the item's name in the save, which had made such items vanish on load.
- Perf: foot/cockpit/alt unchanged. Town view +11 draw calls (the Cutler sheriff's strongbox).

## v0.40 – Lived-in towns, roadside detail and a journal

Props and placement, not fidelity: the towns now look like people lived there and left in a hurry.

- **Towns (Cutler, Dry Fork, Hollis):** wooden power poles with crossarms and sagging wires down both sides of the main street; street lamps; a green town sign with the population at both ends; a ROAD CLOSED barricade of striped sawhorses at one end and a sandbag line with a plywood QUARANTINE board at the other.
- **Houses:** a mailbox at the gate, a shed out back (it is solid), and a washing line with clothes still on it.
- **Shops:** a dumpster with bin bags spilling out.
- **Spray paint on walls** ("HELP", "SAFE ZONE - EAST PASS", "WE'RE IN THE CHURCH", "K-12?? HALVORSEN LIED"...). It is one transparent decal per wall.
- **On the street:** paper and clothes, two bodies with blood stains, a wrecked car with both doors open, and a burned-out barrel.
- **Roads:** a power line on poles runs along the main east road and the north–south road (147 poles, one instanced draw call, with wires that sag between them). It leaves gaps through towns, places and the home strip, and over water.
- **Roadside:** farm mailboxes with family names at the end of each farm track; a green guide sign at the crossroads (HOLLIS 2.6 km / CUTLER 1.6 km / DRY FORK 2.0 km, and on the back HOME STRIP, CHURCH and SAFE ZONE: EAST PASS); seven cars abandoned on the roads, some in the ditch, with doors open and bags dropped beside them.
- **Journal (UI):** a new field-guide page before Settings lists every town and place (22) with a tick box. A place ticks itself off when you walk, drive or fly low (under 150 m) near it, and you see "NEW PLACE: PINE MOTEL (5 of 22 in your journal)". Visited places get a green tick on the map. The right page shows both story threads (Sarah, and the Halvorsen file) with what is done, plus the day count.
- **Save:** a new `vis` list. Older saves load with an empty journal.
- **Perf (desktop test views, calls / tris):** foot 105 / 312k, town 88 / 277k, cockpit 139 / 313k, alt 169 / 319k. That is up from 102 / 304k, 80 / 265k, 136 / 304k and 167 / 311k. The town view gets about 8 draw calls for signs and spray decals.
- **Physics:** the md5 is unchanged and the W&B test passes.

## v0.39 – Six new places

New points of interest. Each one has its own map label, loot spots and zombies, and trees are cleared off it. Each place is a single merged mesh, distance-culled like the towns, with painted signs.

- **River bridge** (church road, just SW of home): a steel-and-timber span with railings, piers and abutments and LOAD LIMIT signs. A pickup is stopped on the deck with its door open, and a sedan has gone through the rail. You can walk and drive on the deck; a groundY override puts the floor at deck height.
- **Clearwater sawmill** (east bank, ~1.2 km north of home):
  - an open mill shed with a carriage, a headrig with its blade and a log still on the carriage
  - a green chain, lumber on stickers, log decks and a teepee burner with sawdust piles
  - an office shack, a log truck and a log loader
- **Silver King mine** (west plateau, ~1050 m):
  - a timber headframe with its sheave, a hoist house with a stack and an ore bin with a chute
  - an adit portal in a rock face, track and ore carts (one tipped)
  - tailings, a powder magazine with a DANGER EXPLOSIVES sign, a bunkhouse and a truck
- **Pine Ridge ranger station** (west of the river, NW of home):
  - a brown and green Forest Service office with a porch and a boarded door, a garage and a green patrol pickup
  - a radio mast, a flagpole with a tattered flag, a water tank, an outhouse and a woodpile
  - a FIRE DANGER: EXTREME board whose back reads "EVACUATE TO CUTLER"
- **East Lake campground** (west shore): six campsites with tables, fire rings, tents (some down), sleeping bags and coolers, plus an RV with an awning, a pickup with a camper shell, a camp-host trailer, vault toilets, a bear bin, and a dock with an upturned canoe.
- **Pine Motel** (north road): eight rooms with a walkway canopy (two doors boarded) and an office. Also a pole sign reading NO VACANCY, a parking lot with striped bays and nosed-in cars, ice and soda machines, a tipped housekeeping cart, a dragged-out mattress and a green, half-empty pool.
- **Map:** labels were nudged so the bridge, motel and campground don't collide with STRIP and other labels.
- **Saves:** a v0.38 save gets loot at the new places. Loot whose item types are defined later in the file (nails, boards, bandages, filters) now spawns once the world is built, before a save is restored. Tree clearing for the v0.38 sites now also runs before the save loads.
- **Perf (headless, 1024×576, calls/tris):** foot 102/304k, town 80/265k, cockpit 136/304k, alt 167/311k (v0.38: 98/293k, 80/263k, 132/294k, 166/307k).
- Test t39 (56 checks) added to the regression run. Physics md5 is unchanged.

## v0.38 – The Halvorsen file (mystery)

- **Story:** a second thread runs beside Sarah's: why the valley died and why you didn't. It has five clues, and each one points to the next. The radio and the Cub's COM give the next lead every other call. Clues are marked in blue pencil on the map, with a "THE HALVORSEN FILE" list at the bottom right.
  1. **Medevac crash** (west of the river, NW of the hollow): a Huey down in snapped timber. The flight log on the litter names the patient: the Cub pilot (you), bitten, given two doses of K-12 by Dr M. Keene, and diverted at the checkpoint.
  2. **Army checkpoint** (Dry Fork road, ~2000,80): a jersey-barrier chicane, sandbags, MG mount, tents, a truck, a watch platform, a light tower and a queue of abandoned cars. The radio log covers the grain cars held, the spore dust, no aircraft out, and the line overrun.
  3. **Co-op grain elevator** (east of Dry Fork): silos, headhouse, an enterable scale-house office, a rail siding with hopper cars and spilled grain. A recall manifest for seed lot HB-7 is on the desk.
  4. **Halvorsen Ag-Bio Research Station 4** (up the valley past Hollis): a fenced compound with a guard booth, a walk-in lab (Building A), greenhouses of dead wheat, a decon tent, body bags, a burn pit and a radio mast. It has its own gravel strip with a windsock and avgas. Tape 1 is on the reception desk.
  5. **Cold room**: tape 2 is from Mara Keene. Something is waiting for you there. Captions play in order, then a "HALVORSEN FILE" reveal card appears. If you have the file, the Sarah ending card adds a line about the cure.
- New items: CLIPBOARD and TAPE (micro-cassette recorder). Captions prefixed TAPE: use the radio style.
- All four places have loot and zombies. Trees and forest instances are cleared from the sites and the strip.
- BASICS page: a new "Clues" block.
- **Saves:** a new `mys` field. Older saves start at clue 1 with the medevac lead already on the map. Places added since the save get their loot.
- **Perf (headless, 1024×576, calls/tris):** foot 98/293k, town 80/263k, cockpit 132/294k, alt 166/307k (was 96/287k, 80/260k, 130/288k, 162/296k). Each site is one merged mesh, distance-culled.
- Test t38 (33 checks) added to the regression run. Physics md5 is unchanged.

## v0.37 – New story opening and tutorial
- **You wake in a forest.** A new game starts in a camp in a thick pine grove about 460 m west of the cabin, across the river: a blue tarp lean-to, sleeping bag, cold fire ring, an empty pack and a stump with a tin can. You have a bow and six arrows, an empty canteen, a brass compass and a note from "M.": you were bitten, you didn't turn, head east to the cabin and the airstrip, the plane is there. (The mystery behind it comes in v0.38.)
- **The way east:** three stone cairns mark the route, and a windfall log crosses the river. About 330 more grove trees and 70 riverbank trees are added in the existing two tree draw calls; they use their own random stream, so the rest of the world is unchanged.
- **Diegetic tutorial:** 14 steps taught by pencilled notes on the caption strip, with a reminder every 70 s: read the note, move, use the compass, shoot the bow, fill the canteen, forage huckleberries (new food), deal with one lone zombie on the way, take the knife and the rifle from the cabin bench, craft, board up (hammer, nails and boards by the woodpile), sleep (allowed from 16:00 during this step), fuel the Cub (two cans by the hangar, she starts with 14 L), start the engine and fly. Steps latch in any order and each one has a skip condition, so you can't get stuck. When you finish, Sarah Webb calls on the radio and the v0.33 story carries on.
- **New compass:** a modelled brass compass whose needle settles north with damping and wobbles if you tilt it. Desktop key **6** shows it in view.
- **Caption strip:** messages longer than the wrist display (22 characters) now show in full on a small panel low in your view. Paper with a handwritten font for notes, radio-green with monospace for radio calls. It fades out with the message.
- **Saves:** tutorial progress is saved (optional `tut` field; the save format is still v34). Older saves count the tutorial as done. `?intro` forces the opening and `?nointro` skips it.
- Field guide BASICS page: new "Compass" note.
- Perf (headless, draw calls / tris): foot 96 / 287 k, town 80 / 260 k, cockpit 130 / 288 k, alt 162 / 296 k. That's +15 k tris from the grove (same draw calls) and +1 call for the camp mesh when it's in view. Physics md5 unchanged.

## v0.36 – Weather and wind
- **Five kinds of weather:** clear, overcast, rain, fog and thunderstorms. Each spell lasts about 4–9 real minutes, then blends into the next over about a minute. What comes next follows a weather chain tied to the clock: fog likes dawn, storms like afternoons, and day 1 stays gentle (no storms, no rain before 15:00). A fresh game starts on a fine morning with a light westerly.
- **Wind is real air for the Cub.** The wind field at the plane is fed to the flight model as the air's own velocity, so airspeed ≠ ground speed, headwinds shorten the take-off, and crosswinds make you crab and weathervane on the ground. The field has:
  - a prevailing direction and speed (mostly from the west), with a log height profile: slower near the ground, about 1.6× stronger aloft
  - gusts
  - ridge lift on the windward side of slopes, sink plus rotor turbulence in the lee
  - mechanical turbulence near the ground
  - storm turbulence and drifting downburst cells

  When the Cub is parked with the engine off and nobody aboard, she's tied down and the wind doesn't move her. Sit in her in a storm and she may shift.
- **Storms are dangerous:** severe turbulence, downbursts, ~800 m visibility, lightning every 6–20 s with thunder delayed by the distance (sound at 340 m/s). Flying above about 120 m AGL in a storm risks a **lightning strike**: it hurts you and kills the radio. On foot on high ground (above about 650 m), a bolt can land right beside you.
- **Visuals:**
  - the sky and fog go grey under cloud, with an overcast deck overhead
  - sun and sky light dim
  - clouds darken
  - rain streaks slant downwind; one draw call, none inside the cockpit or buildings
  - the ground darkens when wet and dries afterwards
  - visibility drops to ~1.5 km in rain and ~300 m in valley fog
  - lightning bolts and sky flashes
- **Windsocks** on all four strips are now proper striped socks that swing to the wind and fill out (straight out at 15 kt, limp when calm).
- **Sound:** rain hiss outdoors, drumming on the roof when you're in the cabin, cockpit or a building, gusty wind that rises with the wind speed, and rolling thunder.
- **Radio:** the cabin radio and the Cub's COM now read a **valley weather report** between the other chatter. It gives the current weather, the wind (e.g. "WIND 270 AT 12 GUSTING 19 KNOTS") and what is moving in next. Fire and smoke drift with the wind.
- **Settings:** new **Weather: DYNAMIC / ALWAYS CALM** row (calm = clear, no wind; good for testing or a relaxed flight). URL `?wx=clear|overcast|rain|fog|storm` pins a state for testing.
- **Saved:** weather, what's next, wind and wetness. Older saves load with the fine start. Exiting the plane, parking/saving and lake/zombie checks now use ground speed, because airspeed isn't zero at rest in a wind.
- Field guide BASICS page: new "Weather & wind" note.
- Perf (headless, defaults = clear, draw calls / tris): foot 96 / 272 k, town 80 / 245 k, cockpit 130 / 272 k, alt 161 / 280 k, unchanged from v0.35. A storm adds 3 calls (rain, cloud deck, bolt) and ~50 tris.
- Physics md5 unchanged (wind is fed in through the existing `a.wind` input, zero by default); wb test passes.

## v0.35 – Settings menu, real shadows, grass, belt swap, propeller fix
- **Settings menu** (field guide GUIDE page → SETTINGS ›, or desktop ` / F2). 14 options: shadows OFF/LOW/HIGH, render scale 70–140 %, foveation, draw distance, tree density, grass, clouds, haze, MSAA, refresh rate 72/90/120, haptics (moved here), comfort vignette, snap 30°/45°/smooth turning, and an FPS/ms/draw-call counter. Saved in this browser (`bp_gfx`); `?gfx=k:v,...` overrides for testing. **Defaults are the v0.34 look and cost**, so turn things up one at a time with the FPS counter on to see what the Quest can take.
- **Real sun shadows** (off by default). A shadow map follows you on foot, or the plane in flight, and snaps to texels so it doesn't shimmer. LOW is 1024 px over ±28 m; HIGH is a soft 2048 px over ±64 m. The Cub, cabin, trees, props and zombies cast shadows; terrain only receives them.
- **Grass** (off by default): instanced 5-blade tufts round you, tinted to the ground underneath. They only grow on fields, meadows and forest floor, not on the strip, wheat, dirt, rock, snow, water or floors. They rebuild in slices as you walk, so there's no frame hitch, and switch off above 40 m AGL.
- **Clouds HIGH** adds a second, drifting cloud layer.
- **Belt swap:** the **knife is now on your RIGHT hip** and the **canteen on your LEFT**. The ammo pouch sits just behind the knife.
- **Propeller fix:** it is now a proper twisted, two-blade wooden/metal prop with yellow tips. It stops at a random angle, and the grey disc only fades in once it's spinning (it used to show as a grey disc even when stopped).
- Perf (headless, defaults, draw calls / tris): foot 96 / 271 k, town 80 / 245 k, cockpit 130 / 272 k, alt 161 / 280 k. That's 2 fewer calls than v0.34 everywhere. With shadows+grass+clouds HIGH, the main pass adds +1 call and +15 k tris; the shadow pass is extra and costs about one more depth render of the nearby casters.
- Physics md5 unchanged; wb test passes.

## v0.34 – Solid fences and a full world save
- **Built fort pieces are solid on foot.** You can't walk through nailed fence panels, door boards, the smokehouse or generator-shed walls, or the gate when it's shut. Open the gate (E nearby, or the latch in VR) to go through. Ghost (unbuilt) pieces and the open gate stay passable. The **fuel depot's chain-link fence** is solid too; go in through the gap on its west side.
- **You never get trapped.** If you nail up a panel while standing in it, you get pushed out to whichever side you're nearer. Cabin walls stay passable, as before. Boarding the door from outside just keeps you outside. Zombie movement is unchanged. The check is a cheap circle-vs-board test that only runs near the fort and the depot.
- **The whole world saves** in this browser (localStorage). This replaces the v0.33 story-only save. Saved:
  - Pack, belt, pouch, quiver and rifle ammo (tube, spare, chambered, fouling)
  - Health, food, water, stamina, the day and the time
  - Where you stand (or that you're in the cockpit)
  - Where the Cub is parked and its fuel, including the aux tank and the mogas share
  - Every item: taken, dropped (with its position), on the bench, in the Cub's cargo zones or the pod. Fuel cans, canteens, food spoilage and smoke clocks are kept.
  - What's left in every drum, depot tank, car, truck and the wreck
  - Fort boards and their damage, the gate, the generator (fuel, on/off), the tarp, the rain barrel, the smoking rack
  - Story and upgrades
- **Looted spots stay looted.** Each item remembers which spot it came from, so the existing respawn rule (everything taken and you more than 500 m away for 4 minutes) works exactly as before across a reload.
- **When it saves:** every 60 s, and shortly after you sleep, land and stop, nail a board, or find a clue. It also saves when the tab or headset browser goes to the background. A save of about 300 items is about 25 KB.
- **Field guide, last page, "SAVED GAME":** shows the last save time and day, a **SAVE NOW** button, and a **NEW GAME** button. NEW GAME asks you to poke it a second time within 5 s, then wipes the save and restarts. The cover page has a "SAVE / NEW GAME" link to it. `?nosave` still plays without reading or writing a save.
- **Old saves:** a v0.33 save (story and upgrades) loads as before. Everything else starts fresh, and it saves in the new format (v34) from then on.
- **Not saved:** zombies and animals (they respawn as usual), carcasses, campfires, arrows stuck in things, a nail half-driven or a board in your hand, and a flight in progress. If you save mid-air, you load in the cockpit where the Cub was last parked, with the fuel you had.
- Perf unchanged (four views identical). Physics regression md5 and W&B tests unchanged.

## v0.33.1 – Hotfix: loading arrows in VR
- **Grabbing the bow string now nocks an arrow.** With the bow in one hand and arrows in the quiver, grab the string near the nock point with the other hand: one arrow comes out of the quiver onto the string (nock click + haptic, "ARROW NOCKED (n IN THE QUIVER)"). Keep holding and pull back to draw. Before this it only said "NO ARROW", although the controls promised it.
- **Arrow bundles go into the quiver in VR.** Gripping a bundle (by hand or force grab) puts its 6 arrows straight into the quiver with a message. Before, only the desktop pick-up did this. A bundle gripped in VR could end up in the pack and never become usable arrows. Bundles dropped into the pack go to the quiver too, and any old bundles already in the pack move over when you pick up the bow. If the quiver is full (24), you just hold the bundle.
- **The quiver shows on your back** as soon as you have the bow or any arrows.
- **Nocking a hand-held arrow is easier:** it nocks within 18 cm of the string (was 12 cm). If you let go of it within about 28 cm of the string, it nocks instead of going back to the quiver.
- **Picking up the bow says the count:** "BOW – n ARROWS IN THE QUIVER – GRAB THE STRING WITH YOUR OTHER HAND TO NOCK ONE".
- Arrow flight, draw and damage are unchanged. Physics regression md5 and W&B tests are unchanged.

## v0.33 – Find the family
- **A story to follow.** Sarah Webb and her kids Tom and Lily are out there somewhere. You find them through five clues:
  1. **The cabin radio** (it needs the generator running) plays broken calls through static. Hearing one puts a red ring on your paper map: first, the **lodge**.
  2. **A note at the lodge** sends you to the **fire lookout**.
  3. **A photo at the lookout** names **Jim Hale** at the **ranch**.
  4. **Jim Hale**, a survivor standing at the ranch, turns to face you and talks when you walk up to him. He sends you to the **Cutler radio tower**.
  5. **A note at the Cutler tower** says there's a **safe zone past the east pass**.
  6. **The crossing:** fly within about 450 m of the east pass saddle with **at least 150 L aboard**. The stock tanks hold 136 L, so you need the **long-range tank** from v0.32 and both tanks full. With too little fuel you get a warning instead.
- The ending is a card in front of you ("SAFE ZONE – you found Sarah, Tom and Lily"). After that the radio thanks you, and you can keep flying.
- **The radio:** it alternates story fragments with the usual chatter. About a fifth of the words are lost to `...KSSH...` static, but never the place name. The COM radio (v0.32) in the Cub picks up the same calls in the air.
- **The map:** each clue you've heard gets a red ellipse and a label on the paper map. A list in the corner ticks clues off as you find them.
- **Notes and the photo** are real items with handwriting on them. Pick them up (grip, or `G`/pack) to read them.
- **Saving:** story progress, fitted parts and found parts save in this browser (localStorage key `bushpilot-vr-save`) on every clue and every bolted-on part, and load on start. Add `?nosave` to the URL to play without saving.
- The story textures upload at load, so nothing hitches when you first see a note.
- Physics regression md5 and W&B tests are unchanged.
- **Rendering** (standard views): on foot 98 / 271,386, town 80 / 244,824 (+3 calls, +162 tris: the note and Jim near Cutler), cockpit 132 / 272,086, 600 m up 163 / 279,672.
- **Known limits:**
  - The ending is a card, not a flown leg, and no fuel is taken for the crossing.
  - Jim is a simple standing figure with no animation; his lines are text.
  - Loose items (other than parts and story clues) and the fort aren't saved.

## v0.32 – Cub upgrades from found parts
- **Five parts to find** (one of each in the world, they never respawn):
  - In the **Dry Fork hangar**: a **cargo pod**, **bigger tundra tyres** and an **LED landing light**, plus a **wrench** on the bench.
  - At the **plane wreck**: its **COM radio** and a **long-range tank**.
  - Another wrench rides in the old truck.
- **Fitting is hands-on.** Carry the part to the Cub while it's stopped and you're on foot. A green outline shows where it goes; bring the part there and it clicks on loose. Then bolt it on:
  - **Wrench:** put the socket on a yellow bolt head and turn your wrist. About 270° drives one bolt home, with ratchet clicks.
  - **Hammer:** drive the bolt heads in, 2–3 solid blows each.
  - **Desktop:** `E` by the Cub fits a part from your pack (or one lying by the plane). `V` with a wrench drives one bolt; with a hammer it takes two hits.
  - One part at a time. Parts can't be taken off yet.
- **What each part does** (every part goes through the weight-and-balance model):
  - **Long-range tank** (under the right wing, 22 lb): +60 L, so 196 L in total. Fill it at the wing caps as usual. The HUD shows `+AUX n L`. Drag +0.001.
  - **Big tundra tyres** (12 lb more): 6 cm more tyre on the same axle. They roll more easily and take less than half the bumps on rough ground, paddocks and meadows. Drag +0.002.
  - **Cargo pod** (under the belly, 30 lb): holds up to 100 lb at +30 in, outside the cabin.
    - VR: let go of an item at the pod door to stow it; grip there to take back the last one.
    - Desktop: `E` at the door loads everything except tools; with nothing to load, `E` unloads into the pack.
    - Drag +0.003.
  - **LED landing light** (left wing leading edge, 3 lb): the `L` beam is brighter, wider and reaches further (520 vs 220 intensity, 450 m vs 260 m).
  - **COM radio** (under the panel, 4 lb): in the air with the master on you hear static and the broken broadcasts through your headset.
- The W&B card gains a **FITTED PARTS** row and a **CARGO POD** row. Fitted parts are one merged mesh on the Cub (+1 draw call, ~750 triangles with all five, nothing when stock).
- The stock Cub (nothing fitted) is unchanged: same drag, gear, surfaces and fuel. The physics regression md5 and the W&B tests are the same.
- Note: the stock Cub already had 35" tundra tyres (v0.20) and a landing light, so these parts improve on them rather than adding them.
- **Rendering** (standard views, stock): on foot 98 / 271,386, town 77 / 244,662, cockpit 132 / 272,086, 600 m up 163 / 279,672. These are the same as v0.31.
- **Future work:** floats and skis. They need water and snow contact in the physics, so they aren't in this build.
- **Known limits:**
  - Parts are simple shapes.
  - You can't remove a part.
  - Upgrades weren't saved between sessions in this build (v0.33 adds saving).

## v0.31 – Fuel economy
- **Avgas is scarce now.** Loot cans are part-full (6–24 L) or empty, and a looted can only comes back 30% of the time. A reset (R / crash) no longer fills the tanks: you keep what you had, topped up to a quarter if nearly dry; the same after dying.
- **Where fuel comes from**:
  - **Drums** (blue = avgas, red = mogas) with a hand pump: two at the home strip (30 L and empty), one at the ridge strip (35 L), the lodge's three (60, 25, 0 L), four in the new hangar (80/50/20/0 L) and six at the fuel depot. Hold a can to the spout (3 L/s), or `E` on desktop.
  - **Hangar** on the east side of the Dry Fork strip (new POI, 3 zombies): open to the strip, drums, bench and shelves, a hose and two cans.
  - **Fuel depot** next to it (new POI, guarded by 10 zombies): fenced yard with a west gate, a 300 L avgas tank and a 500 L mogas tank on saddles with taps, a guard shack, sandbags, a floodlight and drums.
  - **Siphoning** with a new **hose** item (1.2 lb; at gas stations, the ranch, the barn, the truck, town gas stations, the hangar and the depot): the plane wreck still has 45 L of avgas in its right wing; the truck (35 L) and the parked town cars (6–30 L each) have **mogas**. In VR, hold the hose to the filler with one hand and the can in the other, lower than the tank: 1.5 s of sucking, then 0.6 L/s. On desktop, `E` with a hose and a can starts or stops it (stay within 3 m).
- **Pouring**: in VR you now tip the can over the wing filler; the flow builds from 40° to full at 90°, and you see the stream. Empty cans are kept (refill them) instead of vanishing.
- **Mogas**: the tanks track how much car fuel is in them (it burns off in proportion). Above ~20% mogas the engine can stumble at high power (cough, a moment of lost power), so mix it with avgas. The HUD, fuel gauge (`MOGAS n%`) and W&B card show the mix.
- **Countable fuel**: the W&B card lists mogas % and the spare litres in your cans, and every can weighs what's in it (0.72 kg/L). Trading with survivors is not in yet.
- The burn rate is unchanged and the physics regression md5 is the same.
- **Rendering**: all drums are one instanced mesh (+1 draw call, ~5k triangles); the stream and hose are drawn only while used.
  - Standard views: on foot 98 / 271,386, town 77 / 244,662, cockpit 132 / 272,086, 600 m up 163 / 279,672 (v0.30: 97 / 266,206, 75 / 239,278, 131 / 266,906, 162 / 274,492).
- Known limits: no trading yet; tanks and drums are simple shapes; you walk through the depot fence.

## v0.30 – Fortify the cabin
- **Build it up with your hands.** Carry a **hammer** plus **boards** and **nails** near the cabin and green ghosts show where the next piece goes (red = no boards left). Grip at a ghost to hold a board there; it snaps into place. Swing the hammer onto each nail head: harder swings drive a nail further (2–4 hits); a weak swing in VR can bend a nail, which pops out and gets replaced. Let go before it's nailed and the board drops (unused nails come back).
- **21 build spots, 182 pieces**:
  - North and east windows (new frames and dark glass, 2 boards each) and the door (3 boards).
  - A fenced yard (14 panels round the cabin) with a **gate** on the west side; grip the latch to swing it open or shut.
  - **Rain catcher** over the barrel: 2 rails plus a tarp (1 cloth, ties itself on). The barrel refills every 30 s instead of 90 s.
  - **Smokehouse** (3 walls and a roof): food in it (or in the bench stash once it's built) stops ageing.
  - **Generator shed** (2 walls and a roof). Carry a **generator** there and let go in the shed (48 lb, too big for the pack; on desktop G drags it in from up to 40 m once the shed is built). It burns 0.8 L of fuel a game hour (holds 12 L); pour a fuel can at its cap. Flip the switch for a yard light.
  - **Cabin radio** on the bench: needs the generator running. Static now, and the odd broken message (the story comes in v0.33).
  - **Bench vise** (shelf and apron): unlocks the field guide recipe **NAILS (x10)** = 1 wire (needs the vise).
- **Zombies vs. the fort**: a built fence panel slows a zombie to 30% while it climbs through and takes 4 hp/s. At night they go for the window and door boards (6 hp/s); you hear the bashing up to 120 m away. Damaged boards hang loose with nails sticking out: hammer them back in to repair. Sleeping with every window and the door boarded is safe (+10 health) and a fence soaks up more of the damage; an open gap may let something in. The wake-up message reports what broke.
- **Where to get things**: 6 hammers (gas station and ranch POIs, Cutler feed store, barn, …), 3 generators (gas stations), extra boards at the barn and the cabin woodpile. Nails come in boxes of 20, boards in bundles of 2. Weights in the W&B: nail 0.05 lb, board 3 lb, hammer 1.5 lb, generator 48 lb.
- **Desktop**: `G` at a ghost holds a board (G again lets it fall); `V` nails it or repairs a loose one (and is a hammer melee hit with no hatchet); `G` on the latch opens the gate; `E` at the radio or generator switches it (with a fuel can, E at the generator fills it).
- **Sounds**: nail hits (rising pitch as it goes in), bent nail, board bash, generator hum, radio static.
- **Rendering**: every built piece, nail and post is one instanced mesh (one draw call, ~2.2k triangles at full build); ghosts are a second instanced mesh drawn only while you carry a hammer near the cabin.
  - Standard views: on foot 97 / 266,206, town 75 / 239,278, cockpit 131 / 266,906, 600 m up 162 / 274,492 (v0.29: 94 / 263,974, 72 / 236,838, 128 / 264,674, 161 / 272,308). The extra calls are the fort mesh plus the new loot lying near each view.
- Known limits: you walk through fences and boards (zombies don't); pieces are boxes for now, ready to swap for bought models.

## v0.29 – Physical bow
- **A recurve bow you draw with your own hands.** Grip the bow in one hand. With the other, reach over your right shoulder to the quiver for an arrow, or just grab the string near the nock point (an arrow nocks itself from the quiver; an arrow in your hand nocks when you bring its nock within 12 cm of the string).
  - Pull back toward your face: the string bends to your fingers and the limbs flex. Up to 0.7 m of draw gives up to 60 m/s (speed grows with draw). Let go of grip to loose; the bow hand keeps the bow.
  - Letting go past a third of the draw with no arrow is a dry fire (snap, strong buzz).
  - No sight; the arrow sits on a shelf just above your bow hand.
- **Arrow flight**: real gravity drop, nose follows velocity. Arrows stick in zombies, animals, trees, the ground and buildings, and ride along with what they hit; grab one to pull it back out (it goes back in the quiver).
  - Breakage: rock 50%, wood 10%, ground 3% (scaled by speed). Rock also glances arrows off. Arrows that hit leaves are slowed and deflected.
- **Damage**:
  - Zombies: headshot over ~55% draw kills; torso, hips and limbs stagger and wear them down.
  - Deer and other animals: heart/lung (or head) hit over half draw kills like the rifle; a full-draw body hit counts as one rifle body hit; weaker hits do less. Wolves take 1–2 good hits.
- **Quiet**: no alert noise for zombies or animals, only a soft twang (and a thunk / flesh hit / snap at the other end).
- **Haptics** (subtle): the draw hand buzzes more as tension builds; the bow hand gets a thump on release.
- **Where to get it**: the bow is at the lodge (with 2 arrow bundles); arrow bundles (6 each) at the hunting cabin (2), the ranch and the lookout. The quiver holds 24.
  - Field guide recipe (Gun tab, field): **ARROWS (x3)** = 2 sticks + 1 cloth.
- **Carrying**: the bow rides on your back over your left shoulder (green slot box) or goes in the pack. The quiver is on your back on the right. Weights in the W&B: bow 2.6 lb, quiver 0.7 lb, arrows 0.06 lb each (a bundle is 0.36 lb).
- **Desktop**: `5` raises / lowers the bow. Hold the left button to draw (full in ~0.9 s), release to loose. `G` on an arrow picks it up.
- **Models** (own low-poly, one builder each so they can be swapped for Synty models later): bow 204 triangles (limbs bend in the vertex shader, one material with the items), string 1 call, arrow 80 triangles, quiver 248, arrow bundle 504.
  - All arrows (32 pooled; the oldest spent arrow is recycled) are **one instanced draw call**. With the bow out: at most 4 extra calls (bow, string, arrows, quiver) and ~3k triangles.
  - Standard views unchanged (no bow on screen): on foot 94 / 263,974, town 72 / 236,838, cockpit 128 / 264,674, 600 m up 161 / 272,308.
- Known limit: an arrow into a tree crown stops in the leaves, so a trunk behind a crown is rarely hit.

## v0.28 – Animals
- **Animated animals** from Quaternius' *Ultimate Animated Animals* (CC0, see CREDITS.md): deer, stags, foxes, wolves, cows, a bull, horses and donkeys. Each is one skinned mesh with idle, eating, walk, gallop, attack, death and hit-flinch clips. The mixer cross-fades between them (0.3 s; 0.15 s into attack/death), and walk/gallop playback speed follows the animal's ground speed.
- **Deer herds** keep their old behaviour; each herd now has a stag (3 hits, 4 meat).
- **Foxes** (6) live in the open country. They are quick and skittish and give 1 meat.
- **Wolves**: 3–4 packs of 2–4 at dens in the woods, 450–1700 m from the cabin.
  - By day they lie up near the den. At dusk and at night they roam and sense you at ~120 m with line of sight (by day ~28 m).
  - They fan out round you, close in at 7.5 m/s and bite (−7 health every 1.3 s per wolf, with haptics and "WOLF BITE").
  - A shot at night brings the pack; by day it scatters them. Hurting one sets the whole pack on you. With half the pack dead, the rest run. They give up past 220 m or once you're in the plane, and they run from a low pass.
  - A wolf gives a **WOLF PELT** (new item, 3 lb), no meat.
- **Farm stock**: 2–3 animals at three farms and the ranch (12 in all). They graze round a spot and never attack, and they run when hurt or shot at. Meat: cow/bull 6, horse 5, donkey 4.
- **Noise and sight**:
  - Sprinting (over 3 m/s) doubles the distance animals notice you at; crouching halves it.
  - A terrain check (every ~0.6 s) means a rise between you and a deer hides you, except within 12 m.
  - Gunshots (250 m) and the plane (90 m, low and fast) scare everything.
- **Hits**:
  - With a model, the hit spheres (head, heart/lungs, body ×2) follow the animated skeleton, so a grazing head or a falling body is where it looks. Far away, bind-pose spheres are used instead.
  - The knife (slash or stab, same speed rules as zombies, blade doesn't stick) and the hatchet now hurt animals, with blood and haptics.
- **Performance**:
  - Only the nearest 16 animals within 150 m get a model. They're re-picked every 0.2 s from per-species pools (SkeletonUtils clones that share geometry and the item material; no shadows). If a species' pool is full, the next-nearest animal of another species gets the model.
  - Models past 60 m animate every 3rd frame. Past 150 m deer go back to the old instanced box deer, and the others aren't drawn.
  - Cost:
    - 1 draw call and 1.8–3.7k triangles per animal on screen;
    - `updateAnimals` 0.11 → 0.16 ms/frame with 16 animated (desktop Chrome; skeleton updates 0.03 ms more);
    - standard views unchanged: on foot 94 / 263,974, town 72 / 236,838, cockpit 128 / 264,674, 600 m up 161 / 272,308.
  - Files: `assets/animals/*.glb`, 8 × 136–165 KB (1.2 MB), loaded in the background (~1.5 s).
  - If the files can't load, the box deer stay and there are simply no foxes, wolves or stock.
- Not used: Husky and Shiba Inu (dogs), Alpaca, Horse_White (a recolour). The rabbits stay the small instanced ones.

## v0.27 – Item models
- **Real models for the main items**, from Quaternius' *Survival Pack* (CC0, see CREDITS.md): knife, hatchet, fuel can, medkit, bandages, water jug, torch, the cabin's cooking pot, the cabin fire-pit logs and every campfire you build.
  - Each model is fitted to the item's existing size box, so pouches, the pack grid, the belt, cargo stacking, weights and behaviours are unchanged.
  - The knife keeps its tip where the stab test expects it (−0.237 m) with the handle centred in the fist. The hatchet keeps its length (0.43 m) and its edge point is inside the new head.
  - Size boxes grew only where the real model is taller: knife height 0.03 → 0.065 m (blade depth), hatchet height 0.13 → 0.27 m (box spans the head below the handle; the grip stays on the handle).
  - The torch's glow sits on the new lens, and the light still comes from the torch.
  - Cooked meat, the fire flames and the pot's cooking/boiling all work as before.
- **Town set dressing**: radios, compasses, batteries, cans and matchboxes on the ends of the shop counters in each town (16 props). They are decoration only, merged into one mesh per town and drawn only when you're within 55 m of that town.
- **One file, one material**: `assets/items.glb` (90 KB, 15 models, 5.9k triangles) with vertex colours baked from the packs' materials and quantized positions. Every model uses the shared item material, so:
  - the knife is 1 draw call instead of 3;
  - a campfire's logs + stone ring are 1 draw call instead of 8;
  - the cabin fire-pit logs are 1 draw call instead of 2.
- **Loads in the background** after start-up (relative URL, retried) and swaps the models in place. If the file or the loader can't be fetched, the old hand-made models just stay.
- Draw calls / triangles (v0.26 → v0.27): on foot 95 / 263,072 → 94 / 263,974; town (60 m out) 72 / 232,634 → 72 / 236,838; cockpit 129 / 263,772 → 128 / 264,674; 600 m up 162 / 271,406 → 161 / 272,308.
- Not used: Backpack (the player's pack is interactive and custom), Bear trap (the snare and spike traps fit the game better), Wood log (sticks and boards are bundles), Pan (no use yet), Canteen (the water bottle suits the water jug better), Flare gun, phone, tent, raft, shovel, trash can, propane tank and the guns.

## v0.26 – Better melee combat
- **Physics-driven knife.**
  - Damage and type now come from the knife tip's real velocity, not just contact.
  - **Slash**: the tip moves over 2.0 m/s. Damage = 0.7 × location × speed factor (speed/3, clamped 0.7–2). Locations: head 2.5×, torso 1×, hips 0.8×, legs 0.55×.
  - **Stab**: the tip moves over 1.6 m/s with its velocity within ~40° of the blade axis. Head or torso = kill; hips 0.7 and legs 0.4 of a zombie's HP.
  - Stabs **stick**: the blade is held in the body's frame and follows it while it falls. Pull the hand 16 cm from where it went in to free it, with a sound, a buzz and a little blood. Letting go also frees it. A live zombie with a blade in it stays held in place.
  - The desktop stab uses the same rules.
- **Stagger, knockback, knockdown.**
  - Strong hits (slash over 4 m/s, hatchet, butt, shove) set a stagger timer that stops the zombie walking or attacking, and push it back along the blow.
  - A knockdown topples it with the same falling-weight motion the dead use. It lies flat, then gets back up after about 3 s.
  - The hit spheres follow the body down, so you can finish it on the ground.
  - Dead and knocked-down zombies fling their arms up mid-fall and splay their legs (a cheap ragdoll look, no extra draw calls).
- **Hatchet / fire axe** (2.5 lb):
  - one per town (on the floor of the feed store or gas station) and at the first four points of interest;
  - a swing over 2.4 m/s hits for 1.4 × location × speed; a head chop kills and a body chop over 5 m/s knocks down;
  - it chops strip trees and all grove trunks: 3 chops on the same tree drop a STICKS bundle at its base, with wood-chip particles.
- **Rifle butt-stroke.** The stock end (rifle space 0, −0.05, +0.33) is a club over 2.4 m/s: knockback, stagger, and a head blow knocks down. Both hands buzz.
- **Shove.**
  - An empty hand moving over 1.8 m/s mostly forward, within 30 cm of a zombie's head, torso or hips.
  - It costs 20 stamina, staggers 0.9 s and pushes back about 0.4 m. A second shove on a staggered zombie knocks it down.
  - With under 20 stamina you get a weak shove.
- **Zombie grab.** A chasing zombie within arm's reach for 0.8 s grabs you:
  - walking drops to 15% and its damage is 1.5×;
  - the controllers pulse and the "GRABBED" message repeats;
  - a full shove, a stagger-level hit or any hit of 1+ damage breaks it, and you then get a 1.5 s grace before it can grab again.
- **Feedback.**
  - New sounds: stab, slash, chop, shove, unstick and swish (any held weapon over 3.5 m/s).
  - Per-hit haptics.
  - One 64-instance particle mesh for blood and wood chips, hidden when idle, so idle draw calls are unchanged.
- **Desktop.** Q = shove; V = butt-stroke with the rifle up, otherwise a hatchet chop if you carry one, otherwise the knife. V on a kill still dresses it.
- **Unchanged.** Physics md5 is the same; draw calls are the same as v0.25 (foot 95, cockpit 129, alt 162).

## v0.25 – Cargo loading + weight and balance
- **Load loot into the plane.**
  - Hold an item over the **rear seat**, the **rear floor** or the new **baggage bay** behind the rear seat, and let go. It sits where you put it, stacking on top of other cargo when there's room. If a zone is full, the item is refused and stays out.
  - The baggage bulkhead moved aft to make the bay, which has its own floor. The TCDS limit is 50 lb at +57.
  - Cargo stays with the plane when you fly, get out, or walk away.
  - Grab an item again to take it out.
  - Desktop, near the plane: `.` loads the heaviest pack item, `,` unloads the last one, `/` straps or unstraps.
- **Strap it down.** Grip the rear-seat **lap belt** (yellow ring) to buckle it over the seat load, and grip the **cargo net** to cover the baggage bay. Cargo that is strapped down can't be pulled out, so undo the strap first.
- **Loose cargo moves.**
  - Unsecured items react to the airframe's real acceleration.
  - They hold in gentle manoeuvres (static friction 0.55).
  - In hard braking, skids or a ground loop they slide (kinetic friction 0.4), and items on the rear seat slide off onto the floor.
  - A rough or hard landing (over about 2.3 g) makes them bounce and shift.
  - Negative g makes them float up.
  - Hits thud and buzz the controllers, and you get a "LOOSE CARGO SHIFTED" message.
  - As cargo shifts, the CG moves with it.
- **Real weights.** Every item has a realistic weight:
  - fuel can 9 lb empty + 6 lb/gal, so a full 40 L can is 72 lb;
  - ammo box 20; food crate 30; water jug 8.6; medkit 5; boards 6; spike trap 15; and so on.
  - The carried kit counts at the pilot station (+11): rifle 7 lb, rounds, pack contents, belt items, canteen water and materials.
  - Fuel burns off at 6 lb/gal (+24).
- **The physics uses the real mass, CG and inertia.**
  - Mass and CG are summed every frame from W&B moments, and pitch/yaw inertia uses the parallel axis.
  - The weight force acts at the CG, so the CG offset gives a pitching moment from the aero and gear forces.
  - Heavy = longer take-off roll, higher stall speed, lower climb rate.
  - Aft CG = light, twitchy pitch and reduced stability.
  - Forward CG = nose-heavy and hard to flare.
  - With a heavy tail load the tail wheel sits harder.
  - Over gross is allowed but punishing: the gear's sink limit shrinks with √(gross/mass), so a landing the legal load survives breaks the gear.
  - On foot the pilot's 170 lb is off the plane, so the tail visibly settles as you load it.
- **Live W&B card** on the right cabin wall aft of the panel (one draw call). It shows:
  - rows for empty, pilot + kit, fuel, rear seat, baggage and floor, with arms, flagging loose or over-limit rows in red;
  - total weight and CG;
  - the CG envelope chart with a live dot and an over-gross band;
  - status: WITHIN LIMITS / OVER GROSS / CG AFT / CG FORWARD.
  It redraws only when the numbers change.
- **Field guide page** "Loading the Cub" (BASICS tab, page 3): how to load and strap, what weight and CG do, plus the live numbers and chart.
- **Take-off reminder** when you go to full throttle on the ground over gross, out of CG limits, or with 10 lb or more of loose cargo.
- **Data (PA-18 "150", FAA TCDS 1A2 §III):**
  - Datum: wing leading edge.
  - Normal category CG range: +14.0 to +20.0 in at 1750 lb, and +10.5 to +20.0 in at 1300 lb or less (straight-line variation).
  - Utility category: 1500 lb, +12.3 to +19.0 (drawn as a dashed line).
  - Seats at +11 and +37; baggage 50 lb at +57; fuel 36 gal at +24.
  - Max gross 1750 lb.
  - Sources:
    - https://openairdocs.org/tcds/1A2
    - SuperCub.org owner data: stock empty weight about 1,010–1,025 lb, "bush ready" about 1,150 lb, empty CG about +11.
    - Piper W&B sheets use a datum 60 in ahead of the LE (Alaska Float Ratings W&B PDF); the TCDS LE datum is used here.
  - The game's empty plane is 1,047 lb at +11.0, so empty + 170 lb pilot + 36 gal = 1,433 lb = exactly the 650 kg the flight model was tuned at.
- **Physics md5 unchanged** (`eee6637e…`). Empty solo + full fuel gives exactly the old mass, CG (0) and inertia.
  - In game the carried kit (about 6 lb with the rifle and starting pack) is now counted, so the in-game mass is a few kg above 650 kg. The engine-start takeoff test shows a 2 rpm difference.
- **Tests:**
  - New `physics-wb-test.mjs` (node). Checks reference identity, envelope limits, takeoff roll, stall speed, climb, trim, gust stability, flare alpha, tail load, and an over-gross hard landing vs a legal one.
  - New in-game cargo test: 34/34 (placement, stacking, refusal when full, zone weights, release-to-load, belt and net, friction hold and slide, hop, float, airframe-driven shifting, pilot off on foot, unload by grab, desktop keys, fuel burn, over gross, card and book).
  - Regressions are unchanged. The field guide spread count is now 14.
  - Performance: +1 draw call (the card), +14 triangles.

## v0.24.1 – Natural hands, clear sights, grip on the ring
- **Natural hand pose.**
  - The thumb now rests alongside the index finger, over the controller face, slightly curled. It no longer sticks out sideways.
  - The thumb is posed with a small two-bone reach to a target per pose: rest, lifted, wrapped and pinch.
  - Relaxed fingers are softly curled and no longer splayed. Point, fist, grab and hold poses are retuned.
  - New pinch pose for small controls (switches, knobs, keys): the thumb pad meets the index tip.
- **Thumb out of the way when shooting.**
  - In both rifle poses (trigger hand on the wrist, support hand on the forend) the thumb wraps low and the fingers stay under the sights.
  - When your head is down on the stock, any glove part in a ~17° cone above the sight line in front of your eye is also kept clear.
  - Only the bones actually in the way are hidden (e.g. the trigger-hand cuff or a steeply pitched thumb), no longer the whole glove.
- **Grip acts on whatever the yellow ring shows.**
  - Each hand has its own ring. It picks the nearest control to your index fingertip or the pinch point just ahead of your hand (or, as before, a control right in your palm).
  - It has hysteresis, so it doesn't flicker between neighbouring switches.
  - Squeeze grip to use the ringed control:
    - toggles (master, landing light) flip at once;
    - START cranks while you hold grip;
    - mags key and fuel valve turn by twisting your wrist;
    - mixture, carb heat and primer move with your hand along their axis;
    - window handles and the checklist are dragged.
  - Pulled-out knobs are ringed where they actually are.
  - Fingertip poking still works.
  - A squeeze on a ringed switch never grabs the stick or throttle. The stick, throttle and flap lever take the ring (and the grip) only when your hand is actually on them.
- Physics md5 unchanged (`eee6637e…`). Tests: hands test t23 is 56/56 (new ring-grip, hysteresis, two-ring and stick-priority checks). The rest are unchanged. Draw calls and triangles are the same.

## v0.24 – Haptics everywhere
- **One haptics helper (HX)** for every controller buzz (`gamepad.hapticActuators[0].pulse`).
  - Per hand: a weaker pulse can't cut off a stronger one still playing on that hand.
  - Global strength: Off / 35% / 65% / 100%. Change it with the HAPTICS button on the field guide's GUIDE page (poke it), or `?hx=0..1` in the URL. It is saved.
  - Continuous effects (engine, buffet, cranking, rolling, skid) are added up per hand and sent as one short pulse about 30 times a second.
    - They are capped at 30% strength and pause while a one-shot plays, so nothing buzzes continuously at full strength.
  - All earlier calls now go through it: rifle, knife, force grab, hurt, cooking, flap detents and the v0.23 cockpit clicks.
- **Rifle:**
  - shot: full strength on the trigger hand, 45% on the support hand;
  - lever open/close clicks;
  - a round through the loading gate;
  - dry-fire click;
  - misfire: click then a dull thud.
- **Items:**
  - grab tick, plus a light let-go tap (once per squeeze);
  - soft click on the acting hand when something goes into a pouch, pocket, pack or sling;
  - force-grab pull and catch;
  - book page turns (the turning hand, plus a lighter tick in the book hand);
  - crafting done: "da-DUM" in both hands.
- **Cockpit** (hands on the stick or throttle):
  - engine hum scaled by rpm (3–10%);
  - rough running stutters: single mag, fuel starving, mixture cut;
  - a kick when the engine catches;
  - starter cranking rumble that pulses with the compression strokes;
  - stall buffet in the stick hand from about 3° before the break, growing into the stall;
  - touchdown thumps per wheel, scaled by sink rate (0.3 m/s ≈ 22%, 2.5 m/s ≈ 70%);
  - rolling rumble from the v0.20 ground surface and speed, plus jolts from strut travel;
  - brake-lock skid buzz;
  - flap detents and v0.23 switch/knob detents.
  - Hands not on a control feel the airframe jolts at half strength.
- **On foot:**
  - zombie hit in both hands;
  - knife hits;
  - jump landing scaled by fall speed;
  - low-health heartbeat (below 30 HP, a lub-dub that speeds up as health drops).
- Physics untouched (md5 unchanged). Desktop does no haptics work at all (perf identical).
- Tests: new t24 (35 checks), covering the rate limit, gain, the button, and every event above.

## v0.23 – Hands + VTOL VR-style cockpit
- **Gloves instead of grey boxes.** Low-poly glove hands (one instanced mesh: 17 boxes per hand, one draw call for both) follow the controllers.
  - Pose from the controller: grip curls the lower three fingers, trigger curls the index, grip without trigger = pointing index, thumb on the stick/buttons rests it, thumb off lifts it.
  - Quest hand tracking: if the browser gives hand joints, the gloves are built straight from them and the index tip pokes switches (visual + poke only; no pinch-grab).
  - Grabbed things lock the glove on: fist on the stick grip, throttle knob, flap handle, window/door handles; pinch on knobs; rifle hand at the wrist with the index on the trigger, support hand cradling the forend; book/map/items get a holding pose.
  - Iron sights are never covered: after posing, every glove bone is tested against the eye-to-bead sight line; the rifle hand drops its thumb, and a support glove that would still cross it is hidden. Test: 30 grip-angle/roll/trigger poses, 0 crossings. The old little gloves stay for desktop.
- **Cockpit by hand, no laser pointer.**
  - Master rocker: push the half that sticks out past flat with your fingertip. Landing-light toggle: flick the bat up or down through the middle. START: press and hold it in.
  - Fingertip = 8 mm sphere at the glove's index tip. Flips need contact, motion in the push direction, crossing the midpoint, and re-arm only after the finger leaves (plus a 0.25 s lockout), so jitter, sideways sweeps and pulling out don't flip anything.
  - Mags key and fuel valve: grab and twist your wrist (twist measured about the panel normal), the knob follows your hand and snaps to detents.
  - Mixture, carb heat, primer: grab and pull/push (3–4 cm travel). Primer gives one shot per full pull-and-push stroke.
  - Flap handle goes through 0-15-30-50; windows and door by their handles as before.
  - Yellow hover ring on the control your fingertip or hand is near. Every detent/flip gives a click and a short haptic pulse.
  - Stick and throttle are only grabbed when your hand is on them (16 / 14 cm), so you can reach and point with the grip held. Squeeze-and-release on a control without moving it still does the old one-step toggle. Desktop keys unchanged.
- Tests: new t23 (41 checks: poses, rocker/toggle flips + debounce + direction, START hold, twist detents, pull/push, primer strokes, tap fallback, stick/throttle proximity + lock, flap detents, handles, hover ring, hand-tracking joints, rifle sight line). Physics md5 unchanged; the engine, book and other regressions match v0.22; desktop perf identical (foot 95 / cockpit 128 / alt 161 calls).

## v0.22 – Small towns
- Three abandoned towns on flat ground, each on the dirt-road network and marked on the paper map and the cockpit map (red "zeds!" under the name):
  - **Cutler**, about 1.9 km south of the cabin (11 buildings);
  - **Dry Fork**, 2.8 km east (9 buildings);
  - **Hollis**, 2.6 km north (10 buildings).
- Buildings: general store, diner, sheriff's office, feed store with silos, church, schoolhouse, houses, shacks, a gas station and a water tower. Wrecked cars and broken fences are scattered along the main street.
- Most buildings can be entered (Cutler 8, Dry Fork 7, Hollis 8). Walk in through the door gap. Inside are wooden floors and simple interiors: shelves, counters, cots, pews and desks. Walls block you, zombies and loot.
- Better loot than the lone sites, mostly on shelves and counters indoors. You'll find ammo boxes, food crates, the new WATER JUG (+40 water, drink it at your mouth or press E) and LAMP OIL bottles. There are also fuel cans, bandages, medkits and cleaning kits, plus crafting materials (boards, nails, wire and cloth). The town loot is only drawn within 60 m.
- Zombies: 17–23 in each town by day, some waiting inside buildings. At night more shamble in, up to 8 extra per town, but never closer than 35 m to you. They thin out again after dawn. A zombie can't hit you through a wall. If you're inside, it walks round the building to the door to get at you.
- **Dry Fork strip**: a 300 m mown grass strip just east of Dry Fork (north–south, 2.7 m of slope over its length). It has edge markers and a windsock, and a dirt road runs into town. It counts as a strip surface for the tyres (best grip, smooth). Tested: full-power takeoff lifts off after about 70 m, and a 3-point landing rolls out about 50 m.
- The lantern's oil recipe now uses a LAMP OIL bottle first, falling back to fuel from a fuel can.
- Forests, bushes, rocks and fence lines are kept out of the towns and off the strip, and the towns sit clear of the lakes.
- Performance: each town is a single merged, vertex-coloured mesh (one draw call, about 3.6–4.2k tris), culled beyond 5 km. The strip is one ribbon plus one instanced marker draw.
  - At the cabin, versus v0.21.1: +2 draw calls and +14k tris on foot (95 / 263k), +2 in the cockpit (128 / 264k), and +4 at altitude (161 / 271k).
  - New scenes:
    - standing on Cutler's street: 71 calls / 233k;
    - in the cockpit at Dry Fork strip, looking at the town: 155 / 275k;
    - 610 m above, looking down at Cutler: 162 / 271k.
- Zombie update: 166 zombies in total (24 of them are town night spares). Hidden zombies are now hidden once and then skipped, instead of being re-hidden every frame. Zombies more than 500 m away still think once a second, so standing in Cutler at night about 26 zombies think per frame. At the cabin the AI does 126 zombie steps per second, against 1509 in v0.21.1.
- Physics unchanged (md5 above). Building floors only affect walking and zombies; the aircraft still uses the bare terrain.

## v0.21.1 – Field guide moves to the pack's right side pocket
- The field guide no longer rides in a chest pocket on the pack strap, where it sat in your view. It now lives in a side pocket on the RIGHT side of the backpack, mirroring the map's pocket on the left: same height and depth behind you, same canvas pocket with a leather rim, with the book standing upright and its top showing. Reach back past your right hip and grab it, the same way you reach back left for the map. Let go at the pocket to put it back.
- Grab priority is now "nearest wins" for belt and pack targets: the right-hip canteen, the ammo pouch and the guide pocket are compared by distance (scaled to each one's grab radius), and the rifle only comes off the sling if its forend is the closest thing to your hand. Tested from 15 hand positions around the canteen, ammo pouch, guide pocket and sling.
- It can't be seen in the normal forward view, with your head looking 45° or 60° down, or turned 30° either way while looking 45° down. On desktop the worn pack, so also the pocket, is never drawn.
- First-time hint: "Check the field guide in the right side pocket of your pack".
- Physics unchanged (md5 above). Perf: the closed book is no longer drawn on desktop (−1 draw call on foot vs v0.21).

## v0.21 – Field guide crafting
- Crafting now works through a physical survival field guide, a real book. It first sat in a chest pocket on the pack strap; since v0.21.1 it lives in the pack's right side pocket, with a second copy lying on the workbench.
- Grab it and it opens in your hand. Turn pages by pinching the page corner and swiping (the page follows your hand and flips), with the thumbstick of the book hand (flick left/right), or by poking the coloured tabs on the edge.
- Pages: how crafting works and the controls; Basics (water, food, health, night); Materials (each one sketched, with your live pouch count and where to find it); Survival, Tools, Food, Traps and Gun sections with one recipe per spread.
- Recipe pages: a pencil sketch of the item, what it does, a "You need" list with have/need counts (green = enough, red = short), where it's made (anywhere, or NEEDS WORKBENCH with the distance to it), and a big CRAFT button. Poke it with the free hand or pull the trigger of the book hand. Counts update live as you pick things up.
- At the workbench (within 2 m of it), a ghost of the open recipe floats over the bench. Grab it to craft the item straight into your hand. Field recipes go to your pack; bench recipes appear on the bench as before.
- First-time hint: the first time you pick up a material, or come near the bench, you get "Check the field guide in your pack – chest pocket (press B)". A floating "FIELD GUIDE – pick me up" label marks the bench copy until you first open it.
- You keep the field guide when you die. If you drop it, put it back in the chest pocket like any belt item.
- Desktop: on foot, B or K opens/closes the book, ←/→ turn pages, ↑/↓ jump between sections, Enter crafts, Esc closes, and 1–0 still quick-craft. B is still the brake in the plane.
- The old recipe board and watch panel still work, but the book replaces them as the way in.
- Performance: +1 draw call on foot (the closed book in the pocket), +3 while the book is open. The page texture (1024×720) is only redrawn on a page turn or a count change. Physics unchanged (md5 above).

## v0.20 – Gear and tyre physics
- Main gear: the split axle on bungee cords is now its own spring. It has a preload, a progressive (stiffening) bungee, a damper and a hard bump stop at 14 cm of travel. The axle is solved implicitly between bungee and tyre, so it is stable at the 1/120 s substep.
- Soft tundra tyres: a separate tyre spring and damper with a rim stop. At rest the bungee sags 4.7 cm and the tyre 4.0 cm; the tail spring sits at 5.5 cm.
- Tyre friction: lateral force from slip angle (saturating), rolling resistance and longitudinal slip, a friction circle, and a stiction spring near standstill. It no longer creeps on slopes or at idle.
- Surfaces: strip (best grip, smooth), meadow, paddock and rough ground differ in grip, rolling drag and bump size. The bumps are felt at taxi speed: eye vertical acceleration RMS is 0.23 m/s² on the strip and 0.79 on rough ground (v0.19 was 0).
- Brakes act through tyre friction. Too much brake locks the wheel and it skids. Brakes with rudder give differential braking.
- Steerable tail wheel: spring-coupled to the rudder, so it twists a little under side load. It breaks out to free castering when its tyre is near its grip limit (a brake-and-power pivot or a real ground loop), and re-locks when lined up again.
- Visual: the gear legs re-aim to the moving axle, the tyres squash flat at the bottom and bulge, the wheels spin, and the tail wheel steers and castors (one extra draw call).
- An optional wind vector (`a.wind`) is used by the tests for crosswind cases. There is no in-game wind yet.

| physics-test (node) | v0.19 | v0.20 |
|---|---|---|
| Takeoff roll, flaps 0 | 124 m, 10.0 s, 52.8 mph | 120 m, 9.8 s, 52.3 mph (first unstick 105 m) |
| Takeoff roll, flaps 15 | 96 m, 46.0 mph | 92 m, 45.4 mph |
| Cruise, full throttle | 106.0 mph | 106.0 mph |
| Hands-off, 55% power | 66.9 mph | 66.9 mph |
| Stall, clean | 42.3 mph (min 36.5) | same |
| Glide, clean | 71.8 mph, −744 fpm, L/D 8.5 | same |
| Stall, full flap | 33.4 mph (min 28.9) | same |
| Glide, full flap | 45.8 mph, −725 fpm, L/D 5.6 | same |
| Idle 5 s at rest | creeps 0.10 m | 0.00 m |
| Rest jitter | – | below 1e-8 m/s on all four surfaces |
| Full-rudder taxi turn | 10.9 m radius | 9.9 m (brake + rudder: pivots, ~1 m) |
| Brakes 1.0 from 15 m/s, stick back | – | 30 m, wheels lock 1.2 s |
| 3-point landing at 300 / 600 / 750 fpm | – | OK / OK (bungee 13 cm) / crash (hard landing) |
| Wheel landing at 200 / 500 fpm | – | 0 bounces / 1 bounce |
| Crosswind 10 kt 3-point, pilot steering | – | max 5° off heading |
| Crosswind 10 kt, hands off on the ground | – | ground loop with wing strike |

- Compromises: the bumps are physics-only (the ground mesh is not re-drawn). The first unstick is 15% shorter than v0.19's liftoff, but the sustained liftoff is within 3%. Full brakes with the stick neutral nose it over, as before. With no rudder at full power it swings left and ground-loops (it did in v0.19 too, more slowly).


## v0.19 – Cub fidelity: engine start and shutdown, opening windows, checklist, map holder
- The plane now starts cold and dark with the engine off, at first load and after a reset or crash. The start is a real procedure.
  - A labelled switch strip sits under the left half of the panel: MASTER, MAGS (OFF / R / L / BOTH), START, PRIMER, FUEL valve, MIXTURE (in = rich, out = cutoff) and CARB HEAT (in = cold, out = hot).
  - VR: reach a control and squeeze grip. Switches and knobs toggle, the mags key steps OFF > R > L > BOTH > OFF, each squeeze of the primer is one stroke, and START cranks for as long as you hold it.
  - Desktop: U fuel, O master, Y mixture, H carb heat, I mags, P primer, hold Space to crank.
  - Cranking turns the prop slowly with a starter whine and chuffing. When it catches, it fires, flares to about 1,100 rpm and settles at about 650–780 rpm, depending on how far the throttle is cracked.
  - In the tests, the checklist start (2 primes, throttle about 10%) catches after 0.9 s of cranking.
- How it fails:
  - It will not start with the fuel valve off, the mags off, the mixture at cutoff or the master off. The starter does nothing with the master off.
  - Over-priming floods it. Seven strokes would not start in 8 s of cranking. Full throttle while cranking clears it, and it caught after a further 7 s.
  - A cold engine with no prime is a hard start (8.4 s of cranking). A warm engine starts with 0–1 strokes (2.8 s with none, 0.9 s with one).
  - After about 6 s of failed cranking, a hint says why (for example "COLD: PRIME 2-3 STROKES" or "FLOODED: THROTTLE FULL + CRANK").
- How it stops:
  - The normal shutdown is mixture cutoff, which stops it in 1.5 s. Mags OFF stops it at once. With the fuel valve off it runs about 5 s on what is in the lines, then stops.
  - Master OFF does not stop it, since the magnetos run the engine.
  - Getting out with it running shuts it down.
  - Carb heat and a single mag show a small rpm drop on the tach.
- The tach, prop, engine sound and ambient ducking now follow the engine's displayed rpm.
- The panel display shows ENGINE OFF or CRANKING, and the desktop status line shows ENG RUN / CRANK / OFF.
- Laminated checklist card in a holder under the right half of the panel. Squeeze it to hold it up and read it; let go and it snaps back. Desktop: J shows and hides it.
- Opening windows:
  - Right upper door window: grab its handle and swing it out and up. Past about 70% it swings up and latches under the wing.
  - Right lower door half: folds down. Past halfway it drops fully open.
  - Left front and left rear windows slide aft on outer tracks. Grab the handle and drag; they stay where you leave them.
  - Desktop: 1 right window, 2 lower door, 3 left front, 4 left rear.
  - Wind noise rises with how far the windows are open, prop wash included.
  - Getting out still opens the door automatically.
- Map holder: a leather board with a pocket lip behind the existing wall clip.
  - It holds the same single map (shared, not a second copy). The map moves from your pack to the holder when you board, and back to the pack when you get out.
  - Pull it out, read it and let go in the cockpit, and it snaps back as before.
- Fix: in VR the landing-light switch can now be flipped while seated. The old touch check only ran on foot.
- Cost: cockpit draw calls 111 > 125, alt 142 > 156, on foot unchanged (92). About 500 more triangles. No per-frame texture uploads.
- The flight model is unchanged (same md5). Engine state only gates the existing engine-out input.

## v0.18.2 – cockpit parts mounted to the wall
- Fix: the small grey bar floating in the left window opening was the map clip. It was still in its v0.17 spot, 8 cm inside the new narrower cabin wall at sill height.
  - It now lies flat on the left wall below the windscreen-side sill, ahead of the throttle, 2 mm off the skin. The clipped map sheet lies flat on the wall under it.
  - Grabbing the map off the clip and letting go in the cockpit (it snaps back) work as before.
- The throttle quadrant slot now reaches the wall (it floated 2 cm in). The flap quadrant plate now sits 4 mm off the wall instead of 1.3 cm.
- A scan of every separate cockpit part found nothing else floating.
- Same draw calls and triangles. Flight model unchanged.

## v0.18.1 – side windows open from inside
- Fix: from the cockpit, the door windows, rear quarter windows and the side part of the windscreen were partly solid yellow, though they looked right from outside.
  - Cause: a top corner of the windscreen cut-out touched the cabin side outline. That broke how the window holes were cut into the side skin, so the inside face kept a panel across them.
  - The corner now sits 2.5 cm inside the outline, and every window opening matches its outside outline on both faces.
  - From the pilot eye, the door windows and the right door's upper pane are fully clear (81 of 81 sample points, was 46–48).
- Fix: flickering (z-fighting) along the window sills, worst on the left by the throttle.
  - The dark window frames shared faces with the side skin. They now run through the skin, stand a few mm proud on both sides and lip 4 mm into the opening, so they also look dark from inside.
  - The flap quadrant plate sat exactly on the left wall. It is now 1.3 cm off it.
  - The panel, glare shield, floor and bulkhead are 1 cm narrower so they no longer touch the walls.
- Open view from the pilot eye: ahead 41.5 → 49.2%, left 34.7 → 43.7%, left-down 25.3 → 40.0%, right 36.1 → 43.8%, right-down 27.0 → 40.1%, up 58.0 → 70.7%. All are now better than v0.17.1.
- Same draw calls (111 / 142 / 92), +4 triangles. Flight model unchanged.

## v0.18 – Cub rebuilt to real PA-18-150 dimensions
- New low-poly exterior modelled from a PA-18 three-view and published data:
  - span 10.73 m, length 6.88 m, height about 2.05 m, wing area 16.58 m² (Jane's/Wikipedia, NASM);
  - 1.6 m chord, 1.84° incidence, 0.75° dihedral (Piper rigging instructions, owner manual);
  - 1.88 m (74 in) prop (TCDS 1A2).
- Estimated from the three-view: cabin width about 0.70 m, cowl, fin, rudder and stab (about 2.9 m), strut attach points, window and door lines.
- Shape:
  - narrow slab-sided fuselage with the cabin top level with the wing, and a long rear fuselage that tapers to the tail post;
  - real cowl with cheeks, inlets, carb intake, exhaust and spinner;
  - V lift struts with jury struts; wings with rounded tip bows;
  - strut-braced stab, with an elevator cut out for the rudder; rounded fin and rudder;
  - tundra tyres on the existing gear points, and a tail spring and wheel on the physics tail point.
- Glazing: tinted windscreen, front door window, rear quarter window and skylight. The split door on the right (lower half and upper window) still opens.
- Paint: Cub yellow with the black lightning stripe, which breaks at the door.
- Display only: the exterior is drawn 4° nose-up and 0.14 m lower about the main axle. On the ground it sits at about 13° like the real one (the physics gear gives 9.3°), and the real-length tail reaches the physics tail wheel. The flight model is unchanged.
- Cockpit refit into the narrower cabin: panel, seats, stick, throttle, flap lever, map clip, landing light switch and the pilot eye point all moved together, pilot in the front seat.
  - The view is narrower than v0.17.1 because the real cowl, cabin width and skylight are smaller: open-view ahead 41.5% vs 47.3%, to the sides 25–36% vs 36–38%.
  - Opening the door still gives the full view down.
- Exterior is merged meshes: draw calls 111 / 142 / 92 (cockpit / altitude / on foot) vs 112 / 144 / 93. Triangles about the same (+10 to +130 of about 250k).

## v0.17.1 – Cub cabin windows reshaped
- Windows now match a real Super Cub: a raked windscreen, a front door window whose sloped front edge follows the windscreen post, a smaller rear quarter window, dark frames, a skylight under the wing, and dark blue-grey tinted glass instead of the pale full-height box.
- The level sill sits at about mid-fuselage (one `SILL` constant). The forward view over the cowl is unchanged. The side view starts higher than v0.17's near-floor-to-roof glass (open-view ~37% vs ~52% at the side windows); open the door for a full view down.
- Fix: creature instances now start hidden. Before, every zombie sat at the world origin (inside the parked Cub's cockpit) for the first second or so after load.
- Same draw calls or fewer (cockpit 112, was 114). Flight model unchanged.

## v0.17 – low-poly item models
- Every loose item is now a small flat-shaded model instead of a box: jerry can (X-pressed sides, triple handle, spout), .44-40 ammo box (lid, handle, latch, label), slatted food crate, medkit (handle + red crosses), raw / cooked / smoked meat (fat rim + bone), lantern (base, wire cage, glass chimney, cap, bail), torch, canteen (cover, rim, neck, cap), bandage roll, sticks, stones, cloth, wire coil, nails box, boards, charcoal, campfire kit, snare, spike trap, water filter, cleaning kit.
- Each model is one merged vertex-coloured mesh (1 draw call, shared material) that fits inside the old box size, so packing, holding, belts and throwing are unchanged. Cooking swaps the model too. All 23 models together: ~2.4k triangles.

## v0.16 – crafting + basic survival
- Materials: sticks, stones, cloth, wire, nails, boards, charcoal. They go into a stacking pouch when grabbed (no pack space). Found at home, in groves (sticks), by the river (stones) and as salvage at the POIs.
- Workbench on the cabin's south wall, with a recipe board. Field crafting from the watch anywhere (simple recipes only).
- Recipes: bandage, medkit (splint), campfire kit, snare, spike trap, water filter, smoking rack (once, at the fire pit), smoked meat, lamp oil, rifle cleaning kit.
- Campfires (up to 3, burn 15 min, leave charcoal; cook and boil like the fire pit). Snares catch game (raw meat) after 3–6 min. Spike traps kill zombies that walk onto them (3 uses).
- Food spoils: raw ~2 game days, cooked ~3, smoked ~10. Spoiled food turns grey-green and makes you sick.
- Stamina: sprinting and jumping drain it (white bar on the watch). Run dry = winded until it recovers; recovers slower when hungry, thirsty or sick.
- Lantern needs lamp oil (10 game hours per fill). The rifle fouls: after ~60 shots it can misfire until cleaned. A water filter makes river water safe as you fill.
- Cost: about +5 draw calls. Crafting materials are hidden beyond 60 m.

## v0.15 – forests + new places
- 55 deciduous groves (840 trees) and 2,400 more conifers with feathered forest edges, kept clear of strips, roads, farms and lakes.
- 7 new places, each with loot and zombies: fire lookout, gas station, plane wreck, hunting cabin by the NW lake, ranch with corrals, church, and a backcountry lodge with its own grass strip 2.4 km north of home. All shown on the paper map.
- All new buildings are one merged mesh (1 draw call). Loose loot is hidden beyond 400 m. 85 zombies in total.

## v0.14 – rivers + water survival
- A river and creeks across the valley, plus lakes. Thirst bar: empties in ~15 min, then you lose health.
- Canteen on the right hip: drink, fill at the river or lake (raw water may make you sick), boil at the fire pit pot. The rain barrel at the cabin gives clean water and refills slowly.

## v0.13 – day / night with a dusk deadline
- Day 06:00–19:00 lasts ~30 min real time; night lasts ~12 min. Sky, sun, stars and moon change with it.
- Watch on the left wrist (amber = sunset soon). Lantern at the cabin, torch on the belt, aircraft landing light and panel glow.
- After dark zombies are faster and bolder and respawn at random. Sleep through the night from the cabin door (costs food).

## v0.12 – quick fixes
- Natural gunshot without the odd echo. Subtle ambient wind and birds. Low-poly instanced clouds (1 draw call).

## v0.11 – Cub + rifle proportions from the reference photos
- Super Cub: 1° wing dihedral, short blunt cowling, shorter, boxier rear fuselage with the belly rising to the tail, tall swept fin, 3.2 m stabiliser low on the tail cone, flaps and ailerons following the dihedral, struts and jury struts re-aimed, ~35" × 17" tundra tyres.
- Rifle (lever-action, .44-40): round 20" barrel over a full-length magazine tube joined by a muzzle band, short deep forend with a barrel band, tall boxy receiver, big loop lever, straight-grip stock with a pronounced drop and a crescent buttplate. Sights and handling unchanged; gun tests matched.
