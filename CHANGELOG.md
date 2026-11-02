# Bush Pilot VR – changelog (v0.11 onward)

Live: https://kifsta.github.io/bushpilot-vr/index.html. Regression baseline: `node physics-test.mjs | md5sum` = `eee6637ebfc2fcee37f23c2813779dd9` from v0.20 on (v0.11–v0.19: `f1e1607f804bf17b4877bad1bf04feaa`). Versions after v0.20 must not change it.

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
