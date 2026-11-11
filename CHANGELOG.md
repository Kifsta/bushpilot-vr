# Bush Pilot VR – changelog (v0.11 onward)

Live: https://kifsta.github.io/bushpilot-vr/index.html. Regression baseline: `node physics-test.mjs | md5sum` = `eee6637ebfc2fcee37f23c2813779dd9` from v0.20 on (v0.11–v0.19: `f1e1607f804bf17b4877bad1bf04feaa`). Versions after v0.20 must not change it.

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
- **Tests.**
  - t491 (13 checks): the default, release holding the inputs, the mesh and the flight-model inputs, the glove letting go, a re-grab with no jump, moving on from the held position, CENTRES still centring, and the migration.
  - t49 has 2 new thumb checks (twist, nail angle).
  - t42 now tests CENTRES explicitly and STAYS as the default.

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
