# Bush Pilot VR – changelog (v0.11 onward)

Live: https://kifsta.github.io/bushpilot-vr/index.html. Every version leaves the flight model untouched: `node physics-test.mjs | md5sum` = `f1e1607f804bf17b4877bad1bf04feaa`.

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
