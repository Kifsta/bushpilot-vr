# Bush Pilot VR – controls (v0.53, bush delivery + bush sites + hunting)

v0.45 is just the Super Cub, the valley and the paper map. There is no wind, weather, survival, combat, loot or story. The full game (v0.44) is tag `v0.44-full` and branch `full-game`.

A new game starts **on foot beside the Cub** at the cabin strip. Climb in (Y / F), start her off the checklist card and fly.

v0.50 turns it into a **bush delivery** game: take a job off a strip's job board, carry the cargo to the Cub, strap it down, fly it out and set it down on the destination's yellow pad to get paid. See **Delivery jobs** below.

## Flying
| | VR (Quest) | Desktop |
|---|---|---|
| Stick (pitch / roll) | Put your right hand on the stick and squeeze (the glove locks on it), move your hand: the stick pivots under it, to round-cornered stops (a bump at the stop). Let go and it stays where you left it (v0.49.1; Settings: STICK ON RELEASE = CENTRES makes it spring back to centre) | W / S pitch, A / D roll (click to mouse-look) |
| Rudder | Left stick left / right | Q / E |
| Throttle | Left hand on the throttle knob (left wall, on the quadrant bar aft of the map holder), squeeze, push / pull (light tick every 10 %, firm stop at idle and full) | Shift / Ctrl (or = / -) |
| Flaps (0-15-30-50) | v0.42: the handle is on the cabin ROOF, above your head to the left. Reach up, grab the black T-grip (either hand) and pull it DOWN through the notches; push it up to retract (clunk + buzz per notch) | [ and ] |
| Elevator trim | v0.42: the crank on the roof console, right of the flap handle. Grab its knob and wind it: anticlockwise (as you look at it) = nose up, clockwise = nose down, 3 turns end to end, 8 clicks a turn. The white pointer beside it shows where it is | PageDown nose up, PageUp nose down (hold) |
| Brakes | Left trigger | B |
| Get out (stopped, idle) | Y | F |
| Landing light | Flick the toggle under the panel up / down with your fingertip (or squeeze it) | L |
| Reset / recentre | B = reset to the home strip, cold and dark (tops the tanks up to at least 25 %, it is not a free fill-up), A / X = recentre | R reset, Home recentre |

## Engine start / shutdown (v0.19: the plane starts cold and dark)
| | VR (Quest) | Desktop |
|---|---|---|
| Fuel valve ON / OFF | Grab the red pointer handle (switch strip under the left of the panel) and roll your wrist a quarter turn. It clicks into each detent and bumps at the stop. ON feeds both wing tanks | U |
| Master ON / OFF | Push the half of the red rocker that sticks out with your fingertip | O |
| Mixture RICH (in) / CUTOFF (out) | Grab the red knob and pull it out / push it in | Y |
| Carb heat COLD (in) / HOT (out) | Grab the black knob and pull it out / push it in | H |
| Primer | v0.44: it is locked in. Grab the chrome T-handle and twist it a quarter turn to unlock it, then pull it all the way out and push it back in (one shot per stroke). Push it home and twist it back to lock it. v0.46.1: the twist has to be deliberate (past about 30° and held for a moment), and while you're pumping it ignores how your wrist rolls. It only locks again once it's fully home and you twist it back the way it came | P (one stroke) |
| Mags OFF > R > L > BOTH > START | Grab the key and twist clockwise / back (click + buzz per position). v0.44: keep twisting past BOTH, against the spring, to START, and the engine cranks while you hold it. Let go and it springs back to BOTH | I (Space to crank) |
| Starter | Press and hold the red START button with your fingertip (or squeeze and hold it, and the glove points its index finger at it), or turn the key to START | Hold Space |
| Checklist card | Squeeze it (under the right of the panel); let go to put it back | J |

Start: fuel ON, master ON, mixture RICH, carb heat COLD, prime 2–3 strokes (cold) or 0–1 (warm), throttle cracked (~10%), mags BOTH, hold the starter until it runs (~700 rpm).
Flooded? Throttle full and crank, then pull the throttle back when it fires.
Shutdown: throttle idle, mixture CUTOFF (it stops), mags OFF, master OFF, fuel OFF.

v0.23 hands (VTOL VR style, no laser): your hands are gloves. Squeeze with the trigger off = point the index finger; trigger curls it; thumb off the buttons lifts the thumb. A yellow ring shows what your hand will work. Squeezing a control and letting go without moving it still does the old one-step toggle. Quest hand tracking (no controllers) shows tracked gloves and pokes switches with your index tip.

v0.49 flying gloves: the hands are now low-poly pilot gloves (fabric back, leather palm and fingertips, a short gauntlet with a velcro strap tab). They grab, point, poke and relax exactly as before. Change the colour with Settings > **Gloves**.

v0.24.1 grip on the ring: point your fingertip at a switch or knob, and a yellow ring appears on it (one ring per hand). Squeeze grip to use it. Toggles flip, START cranks while you hold grip, the mags key and fuel valve turn when you twist your wrist, and push-pull knobs follow your hand in and out. Window handles and the checklist drag. Poking with the fingertip still works. The stick, throttle and flap lever only take the grip when your hand is on them.

v0.44 cockpit: toggles (MASTER, landing light) snap over with a click, whether you flick them with a fingertip or squeeze them. The cabin has its steel tube frame, stringers, a headliner, a front-seat harness and placards. They are only scenery.

v0.43 cockpit: PANEL LT knob (switch strip, far right) - twist it, or press K in the plane, to step OFF / DIM / BRIGHT. It needs the MASTER on. The OIL gauge (right of the tach) shows oil pressure on top and temperature below. The wet compass on the windscreen swings and settles after turns like a real one.

v0.42 cockpit: your glove stops on the instrument panel instead of going through it (the switches still feel your real finger). A small label by your hand names the control your hand is on or ringed and its state (MASTER ON, FLAPS 30°, THROTTLE 45%, TRIM NOSE UP 3...); turn it off with Settings > CONTROL LABELS. The flap handle and trim crank work with either hand.

v0.46 grabbing: you don't need to line your hand up exactly. Squeeze on any control and the glove takes hold of it by its shape within a tenth of a second: it wraps the stick, throttle, flap T-grip, primer T and window handles, and pinches the key, valve and knobs. It stays on the control as it turns, pulls or swings, and opens back into your own hand when you let go. Hold the grip the way you'd hold the real one: the angle you reach at is the angle you hold it at.

v0.24 haptics: you feel the engine (rpm, rough running, cranking), stall buffet, touchdowns, bumps and skids through the stick and throttle, plus clicks for every switch, detent and grab. Set the strength in Settings (Off / 35% / 65% / 100%), or add `?hx=0.5` to the URL.

## On the ground (v0.20: gear and tyre physics)
- The tail wheel steers with the rudder (about 17° each way, so a full-rudder taxi turn is about 10 m across). Hold the stick back when taxiing so the tail stays planted.
- Brakes work through the tyres. Brakes alone slow both wheels. Brakes with rudder brake only that side's wheel. Add a burst of power (about half) for a tight pivot: the tail wheel unlocks and castors, then re-locks when you straighten out.
- Full brakes with the stick forward (or neutral) at speed will tip it onto its nose. Keep the stick back.
- Use right rudder on the takeoff roll. With no rudder it swings left and can ground-loop, as a real Cub does.
- Grip: the strip is best. Grass and rough ground roll slower and are bumpier (felt through the seat at taxi speed).

## Windows and door (v0.19)
| | VR | Desktop |
|---|---|---|
| Right upper window (latches under the wing) | Grab its handle, roll your wrist to turn the latch, then swing it out and up | 1 |
| Right lower door half (folds down) | Grab its handle, roll your wrist to turn the latch, then push it out | 2 |
| Left front / rear window (slide aft) | Grab the handle, roll your wrist to turn the latch, then drag | 3 / 4 |

v0.44 latches: every window and the door are latched while shut. Squeeze the handle and roll your wrist about 35° until the latch clacks free, then move it. Shut it and let go, and the latch drops back in. The desktop keys work the latch for you.

## On foot
| | VR | Desktop |
|---|---|---|
| Walk / run | Left stick, click it to run | WASD (or arrows), Shift to run |
| Turn | Right stick left / right (snap 30°, or snap 45° / smooth in Settings) | Mouse (click to capture it) |
| Crouch / hop | Right stick down / up | Hold C / Space |
| Climb in (within 3 m of the Cub's door) | Y | F |
| Recentre / reset | X or A recentre, B resets the Cub to the strip | Home / R |

Town walls and the fences at the depot, checkpoint and lab are solid. You walk round them, not through them.

## Delivery jobs (v0.50)
Four strips have a **job board** (a wooden notice board on two posts) and a **yellow pad** with a black X beside it: HOME STRIP (about 20 m to the right of where the Cub parks, by the cabin), RIDGE STRIP, LODGE (north side) and DRY FORK (east side, south of the hangar).

| | VR (Quest) | Desktop (on foot) |
|---|---|---|
| Take a job | Walk up to the board and poke **ACCEPT** on a job with your fingertip | Stand by the board, press **1 / 2 / 3** |
| Cancel a job | Poke **CANCEL**. This only works while all of its cargo is still on that strip's pad | Press its number again |
| Pick up cargo | Put your hand on a box, sack or crate and squeeze grip (either hand) | **E** picks up the nearest piece in front of you |
| Load it | Carry it to the Cub and let go over the rear seat, the rear floor or the baggage bay behind the rear seat | **E** within about 3 m of the Cub's door: heavy pieces go on the rear seat, light ones in the baggage bay (50 lb max), and anything else wherever it fits |
| Strap it down | Squeeze the rear seat **belt buckle** or the **cargo net** anchor in the baggage bay (they are the strap anchors) | **/** does both, and works from the seat too |
| Unload | Undo the strap, then grab the piece and take it out | **E** by the Cub takes out the last unstrapped piece |
| Deliver | Set every piece of the job down on the destination's yellow pad | **E** away from the Cub sets the piece down in front of you |

- **The board** lists three jobs, each with what it is, where it goes and how far, the total weight and what the pieces are, the pay, and a deadline if it has one (deadline jobs pay 40 % more). A job you have taken turns green and shows where its cargo is (ON THE PAD, IN THE CUB, n/3 DELIVERED) and the time left. You can run **3 jobs** at once. Each job's pieces carry a coloured tag that matches the bar beside it on the board.
- **Deadlines** are in game minutes, and a game minute is one real minute. Deliver late and you get half pay.
- **Payment** comes once every piece of the job is on the destination pad. The customer takes the cargo away, the money goes in your **wallet**, and the board puts up a new job.
- **The wallet** is the gold top line of the screen on your left wrist (the desktop HUD shows the same line). It shows the cash and your most urgent job: where it goes and the minutes left. You start with $150.
- **Weight and balance:** every piece has a real weight and sits at its station. The rear seat is +37 in, the floor about +25, and the baggage bay +57 (50 lb limit). That is what the flight model gets, as mass, CG and inertia. The laminated W&B card on the right wall lists the rear seat, baggage and floor loads (LOOSE in red until strapped) and plots the dot. Full fuel plus you leaves about 317 lb before max gross (1750 lb). Push the throttle up on the ground while over gross, out of CG limits, over 50 lb in the baggage bay (the card says BAGGAGE OVERLOAD, v0.52.1), or with 10 lb or more of loose cargo, and you get one reminder.
- **Loose cargo moves.** Unstrapped pieces slide under hard braking, full power, skids and rough ground. They hop on a hard landing, and a piece can slide off the rear seat onto the floor. You hear and feel the thump, and the CG moves with them. Strapped pieces stay put.
- **Special cargo (v0.51).** About a third of the jobs are special. They pay more, have no deadline, and their condition sets the pay. The board shows the note, and the gold wrist line lists special jobs first with their meter.
  - **FRAGILE** (glassware, radio set, eggs: boxes with a red band, +30 %): jolts damage it, from hard touchdowns, bumps and sudden yanks. A firm-but-normal landing is fine; arrive at 3 m/s and you'll dent it about 20 %. Loose pieces knocking about, dropping a box and crashing all damage it too. You hear a crunch. Pay × (1 − damage). Strap it, land gently, set it down; don't drop it.
  - **PERISHABLE** (fresh fish and ice cream in coolers, medicine in med kits, +25 %): a FRESH clock starts when you take the job (the board shows the minutes). It runs half as fast while you're flying more than 150 m above the ground. Pay drops with freshness, and spoiled pays 20 %.
  - **LIVE ANIMALS** (a dog crate, two crates of chickens, +35 %): you can see them inside. Rough flying (bumps, hard manoeuvres, skids) and knocks upset them, and they bark or cluck. Smooth flying calms them slowly. Pay × (1 − 0.6 × upset); the wrist shows CALM n%.
- The belt and net are only drawn (and grabbable) when there is cargo under them.
- **Shipping labels (v0.51.1):** every piece has a label on its front (the dog crate on its back) and a smaller one on top. It shows TO and the destination in big letters, the job colour, the weight, and an icon for special cargo: a red glass for fragile, a blue snowflake for perishable, a paw for animals.
- **Weight and balance in flight:** every piece really changes the Cub: mass, CG and inertia, every frame. With about 150 lb aboard the takeoff run is about 25 % longer and the climb about 14 % weaker. Near max gross (317 lb of cargo) the run is about half again as long, the climb about a quarter weaker, and the stall 4–5 mph higher. A load aft (rear seat, baggage) needs more nose-down trim and makes the pitch livelier. Light jobs (20–80 lb) only make a small difference.

- **Light and heavy jobs (v0.52).** Each job is LIGHT (20–80 lb parcel runs) or HEAVY (about 150–400 lb of freight: cement bags, feed sacks, nail kegs, fuel cans, an outboard motor, a generator). The class shows as a badge on the board, at the start of the kneeboard's pieces line (`HEAVY 241 LB - ...`) and in the top-right corner of every label. Each board usually has at least one heavy job. Heavy pays more (about $40 + $0.45/lb + $30/km), and you'll feel it: with 241 lb aboard the home-strip takeoff roll goes from about 130 m to 178 m and the climb from about 940 to 640 fpm.
  - **Pieces** weigh about 35–60 lb each, so you can carry them one at a time. The outboard and the generator are **two-hand** pieces. In VR, grab it with one hand and then the other; it lifts only when both hands hold it, and sits between them. On desktop, **E** puts it **ON THE HAND TRUCK**. You walk slower while carrying anything over 35 lb, and slower again over 80 lb.
  - **Payload warning:** if a job is heavier than what you can still load at your current fuel, the board shows `OVER PAYLOAD AT n GAL: MAX x LB` in red. Fly with less fuel or split the trip. The W&B card shows `PAYLOAD LEFT x LB`, or `OVER MAX GROSS 1750 BY x LB` in red.

## Bush sites (v0.52)
Eight **unprepared landing spots** off the airfields, each with a customer camp, a small job board and a yellow pad. Nothing is graded except the two short strips. Land on what's there.

| Site | Type | Customer | Length | Notes |
|---|---|---|---|---|
| CREEK BAR | river sandbar | prospector camp | 190 m | gravel by the creek |
| FISH CAMP BAR | river sandbar | fish camp | 210 m | |
| NW LAKE SHORE | lake shore | trapper cabin | 200 m | beach along the north-west lake |
| EAST LAKE SHORE | lake shore | boathouse | 200 m | |
| GOAT BENCH | mountain ridge bench | Lost Lode mine | 170 m | **one-way**: land uphill, take off downhill |
| ELK MEADOW | meadow | elk camp | 220 m | **one-way**, wheel tracks in the grass |
| RANGER STRIP | short strip | ranger station | 160 m | graded, windsock |
| RANCH STRIP | short strip | ranch | 180 m | graded, windsock |

- **Finding them.** A site isn't on your map until you've found it. Fly over within about 400 m (and below 250 m above it), or walk up to it. You'll get `FOUND <site> - <type> ~<length> M - <customer> - ON YOUR MAP NOW`. Found sites stay found in your save.
- **Jobs to sites.** About half the jobs from the airfields go to bush sites, and sites send some of their jobs to other sites. Bush jobs pay 20 % more. If you haven't found the place yet, the board says `(FIND IT)` and the map draws a dashed **?** search circle (320 m radius) with the site somewhere inside it, and the kneeboard says `SEARCH ...` with the distance and heading to that circle. Once found, the board and kneeboard show the type and length (`LAKE SHORE 200M`).
- **On the map:** found sites are drawn and labelled with the customer, the type and the length, plus `1-way` on the bench and the meadow. For those two, the FOUND message also gives the uphill landing heading (`ONE-WAY: LAND UPHILL HDG nnn`).
- They're short: an empty Cub lifts off in 55–110 m, and at max gross in 130–195 m. Landing rolls run 50–130 m. Watch your weight going into the bench and the meadow, and use the slope.

## Hunting (v0.53): lever rifle, deer, binoculars
Some jobs on the boards are **hunting jobs**: a lodge, the elk camp, the ranch or the Dry Fork butcher wants one deer. The board says `1 DEER (~100-150 LB) - HUNT AREA ON THE MAP`, and the paper map circles the herd's forest in orange with a hoof. Hunting jobs pay well.

| | VR (Quest) | Desktop |
|---|---|---|
| Take the rifle | It hangs on the **cabin wall rack** (outside the cabin, by the door) and, once you've flown with it, in the **Cub's rack** on the right cabin wall. Squeeze grip on the stock's wrist | **T** by a rack (T again: back on the rack, or slung on your back away from one) |
| Support hand | Squeeze on the forend with the other hand. Bring the stock to your cheek: it settles into a virtual shoulder | (automatic) |
| Aim | Look down the rear notch over the bead | Hold **RMB** (aim down the sights) |
| Fire | Trigger, rifle hand only | **LMB** |
| Work the lever | Pinch the lever loop with your support hand and swing it down and back up (or flick the rifle down and up one-handed): it ejects the case, cocks the hammer and chambers the next round | **X** |
| Load | Squeeze on the **cartridge pouch** at your belt (front right) for a round and push its tip into the loading gate on the receiver's right side. Keep squeezing at the gate and the next one comes from the pouch | **Z** (one round per press) |
| Buy ammo | The ammo box on the stump by the cabin: $10 for 20 rounds | **Z** by the box |
| Sling / put down | Let go over your shoulder, muzzle up, to sling it. Let go at a rack to rack it. Let go anywhere else and it lies on the ground | T |
| Binoculars | They hang on your **chest**, and in the Cub they sit in a holder by your right knee. Grab them and raise them to your eyes for a 7× view | **V** (toggle) |
| Field dress | Squeeze grip on a downed deer and hold for 3 s | Hold **E** by it for 3 s |

- **The rifle** is a Winchester 1892-style carbine (the full game's mechanics on the new model): 7 in the tube plus one chambered, 20 rounds in the pouch at the start. Hammer down means no shot until you work the lever. An empty chamber just clicks. The bullet flies at 400 m/s with drag and gravity, zeroed at 50 m (a little high inside that, dropping more and more past 100 m). It hits the ground, trees, the cabin, or a deer.
- **Deer** graze in six forest herds (HOLLOW TIMBER, PINE FLATS, SPRUCE PARK, CEDAR GLADE, EAST WOODS and ELK MEADOW), about 20 deer and stags in all. They see you from about 35 m when you walk upright in the open, and less when you crouch (C) or keep still. A gunshot within about 320 m, or a low plane, sends the herd off running. A shot to the head or chest (just behind the shoulder) drops a deer. A body shot wounds it and it runs. Herds you scattered come back after a while.
- **Field dressing** only works when you have taken a hunting job ("NOBODY HAS ORDERED VENISON" otherwise). It turns the deer into a **VENISON CARCASS** of 100–150 lb (deer 100–125, stags 125–150) lying on the ground. It takes **two hands** (desktop: E with the hand truck), counts on the W&B, and is **perishable**: its freshness clock only starts once it is dressed. Set it on the customer's pad to get paid. You can cancel a hunting job until you have dressed a deer for it.
- **Binoculars** also show the distance to a deer or herd in the middle of the view, and a bush site you spot through them (within 1.5 km) goes on the map.
- Climbing into the Cub puts a rifle you carry (or one lying beside the Cub) in its rack, and the binoculars in their holder. They go back on your chest when you get out.

## Fuel
- Two wing tanks hold 36 gal (136 L). Burn scales with power: full throttle empties them in about 25 minutes. Below 3 % the engine sputters, and at empty it quits. The fuel gauge and the W&B card show what's aboard.
- **Refuel at the home strip.** There is a red drum with a hand pump on the left of the Cub's parking spot. Taxi back to within 15 m of it, stop, and shut the engine down. Then:
  - VR: get out, reach up to a wing-root filler cap (the silver caps on top of the wing, either side of the cabin) and squeeze grip there to put the nozzle in. Fuel runs at about 3 L/s while you hold it. Let go to stop.
  - Desktop: stand by a filler cap and press G. G again (or walking away) stops it.
- A reset (R / B) tops the tanks up to 25 % only.

## Paper map
- It lives in the holder on the left cockpit wall. In VR, squeeze grip on it to take it, and grab the far edge with your other hand to open it out. Let go in the cockpit and it clips back into the holder.
- On foot you can carry it. Let go near the holder to clip it back, or anywhere else to drop it (pick it up off the ground with grip).
- Desktop: M holds it up in front of you, anywhere. M again puts it away.
- v0.51.1: the strips with a job board are gold squares marked JOBS. Each job you have taken draws a dashed line in its tag colour to its destination, which is ringed and labelled with the job's number and title.

## Kneeboard (v0.51.1)
- A clipboard on your left thigh lists your active jobs. For each one it shows the colour tag, the title and pay, FROM > TO, the distance and heading from the Cub to the destination pad, the pieces and weight, and the deadline or the special-cargo meter. It also shows where the cargo is: on the pad, in the Cub (STRAPPED or n LOOSE in red), or n/m delivered. It updates as you go.
- VR: squeeze grip on it to lift it up to your eyes; let go and it goes back on your thigh. Desktop (in the plane): N holds it up, and N again puts it back.

## Lights and time of day
- Landing light: flick the toggle under the panel (VR fingertip) or press L.
- Panel lights: the PANEL LT knob on the switch strip, far right (twist it, or press K). It needs the MASTER on.
- Time of day is fixed, so there is no clock and no dusk to beat. Pick it in Settings → **Time of day** (EARLY / MORNING / AFTERNOON / LATE / SUNSET / NIGHT). A saved game keeps its time.

## Settings
- **VR:** poke the screen on your left wrist with your right index finger. A SETTINGS board opens half a metre in front of you. Poke a row to step it to the next value, and poke CLOSE (or the wrist again) to close it.
- **Desktop:** ` (backquote) or **F2** opens the settings panel, **F3** toggles the FPS counter, Esc closes.
- Saved in this browser (`bp_gfx`). URL override for testing: `?gfx=shadows:2,grass:1`.

| Setting | Options | Notes |
|---|---|---|
| Shadows | OFF / LOW / HIGH | sun shadow map that follows you (LOW 1024 px ±28 m, HIGH 2048 px soft ±64 m) |
| Render scale | 70–140 % | VR framebuffer scale, applies next time you enter VR |
| Foveation | OFF / LOW / MEDIUM / HIGH | Quest fixed foveation |
| Draw distance | NEAR / MEDIUM / NORMAL / FAR | chunks, rocks, trees and haze |
| Tree density | SPARSE / MEDIUM / FULL | |
| Grass | OFF / LOW / HIGH | instanced tufts around you |
| Clouds | OFF / NORMAL / HIGH | HIGH adds a second drifting layer |
| Haze | LIGHT / NORMAL / THICK | fog distance |
| Anti-aliasing | OFF / MSAA | applies after a reload |
| Refresh rate | AUTO / 72 / 90 / 120 | Quest 3 |
| Haptics | OFF … 100 % | controller buzz |
| Comfort vignette | OFF / LIGHT / STRONG | darkens the edges while you move or turn on foot |
| Turning | SNAP 30° / SNAP 45° / SMOOTH | right stick, on foot |
| FPS counter | OFF / ON | fps, ms, CPU ms, draw calls and triangles, lower left of your view |
| Time of day | EARLY … NIGHT | fixed sun position (default MORNING) |
| Stick on release | STAYS / CENTRES | VR: what the stick does when you let go. Default STAYS (v0.49.1): it holds where you left it, and grabbing it again carries on from there |
| Control labels | OFF / ON | VR: the name and state of the control by your hand |
| Gloves | SAGE / BLACK / TAN | v0.49 flying-glove colours: sage Nomex back with tan leather palm (default), all black, or tan with brown leather |

## Saving
- Autosaves every 30 s, when you land and stop, and when you close the tab or take the headset off. It saves where the Cub is parked, the fuel, the time of day, and whether you were aboard or on foot (and where).
- v0.50 also saves the wallet, the game clock, every board's jobs, every piece of cargo (on the ground where it lies, or in the Cub on its seat or in the bay) and the straps. It saves soon after you take, load or set down anything, and straight away when you get paid. A v0.45–v0.49 save still loads, with a fresh $150 wallet and new boards. v0.51 also saves the special cargo state (damage, freshness, how upset the animals are). v0.53 (save v53) also saves where the rifle is, its magazine, chamber and pouch, and your hunting jobs.
- v0.45 uses a new save key (`bushpilot-vr-blank-v1`), so older saves are left alone and never loaded.
- `?nosave` plays without saving. `?plane` starts a new game in the seat instead of beside the Cub.

## Frame rate (v0.48)
- Poke the screen on your left wrist to open **Settings**. A live **PERF** strip sits above it, updated twice a second:
  - line 1: fps, frame ms (and the worst frame), CPU ms, draw calls and triangles; green means on budget, red means over;
  - line 2: the foveation the XR layer reports (`FFR 1.00`, or `UNSUPPORTED`), the layer type and its framebuffer size, the refresh rate (and what the headset offers), MSAA and the render scale;
  - line 3: what Auto resolution is doing, how many scenery instances are drawn, and whether the ground is vertex-lit.
- **PERFORMANCE** and **BALANCED** buttons are at the bottom of the board. BALANCED is the default: 90 % render scale, foveation HIGH, 72 Hz, Terrain shading FAST+GRAIN, everything else NORMAL, Auto resolution ON. PERFORMANCE is the cheapest: 70 %, FAST ground, sparse forest, near draw distance, no clouds. A render scale change takes effect the next time you enter VR.
- To find what costs the most, change one row at a time and watch line 1. **Terrain shading** (FAST / FAST+GRAIN / FULL), **Forest** (OFF / SPARSE / MEDIUM / FULL), **Clouds**, **Haze**, **Draw distance** and **Anti-aliasing** (needs a reload) are the big ones.
- **Auto resolution** (default ON): if frames run over budget for more than a second, it steps down. First it shrinks the eye viewport to 85 % and forces foveation to HIGH. Then it goes to 75 % with the forest at 75 %, then to 65 % with the forest at 55 %. After about 10 s on budget it steps back up, and it waits longer if it keeps bouncing. Line 3 shows `(not supported here)` if the headset ignores the viewport request; the forest steps still apply.
- The landing light (and shadows) make the ground per-pixel lit again, because it needs that to light the ground.
- `?nobatch` turns off v0.47's static mesh batching and `?tile=N` turns on v0.47's tiled forest (both for comparing). F3 toggles the desktop FPS counter, and ` or F2 opens the desktop Settings panel, which has the presets too.
