# Bush Pilot VR – changelog (v0.11 onward)

Live: https://kifsta.github.io/bushpilot-vr/index.html. Every version leaves the flight model untouched: `node physics-test.mjs | md5sum` = `f1e1607f804bf17b4877bad1bf04feaa`.

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
