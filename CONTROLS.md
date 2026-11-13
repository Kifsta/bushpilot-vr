# Bush Pilot VR – controls (v0.53, bush delivery + bush sites + hunting)

v0.45 is just the Super Cub, the valley and the paper map. There is no wind, weather, survival, combat, loot or story. The full game (v0.44) is tag `v0.44-full` and branch `full-game`.

A new game starts **on foot beside the Cub** at the cabin strip. Climb in (Y / F), start her off the checklist card and fly.

v0.50 turns it into a **bush delivery** game: take a job off a strip's job board, carry the cargo to the Cub, strap it down, fly it out and set it down on the destination's yellow pad to get paid. See **Delivery jobs** below.

## Weather (v0.75)
- **v0.79 rain fronts:** two lines of rain shafts, each under a dark cloud base, drift slowly across the map with the clouds (from the west-northwest, 5–9 m/s). From a distance you see grey curtains of rain hanging under them. Fly or stand under one and it rains: streaks, rain sound, a greyer sky and visibility down to about 4 km. Fly out of it and it clears. Above the cloud base (about 760 m) it's dry. There is still no wind: the rain moves, the air doesn't push the Cub. The clipboard METAR shows VCSH when a front is within about 9 km of home and -SHRA when one is over it. The fronts are saved, are off with Weather OFF, and don't show with a forced `?wx=` (use `?front=x,z` to put a shaft somewhere).
- The weather changes slowly by itself: **clear** (most of the time), **haze**, **light overcast**, **low cloud + mist** in the valleys, **light rain**, and at dawn (EARLY time of day) the odd **fog bank**. A change takes 4-6 minutes and a state lasts 8-25 minutes.
- It only changes what you see and hear: how far you see (strips are harder to pick out, but you always see 2 km+), the sky and light, a lower cloud deck, mist patches lying in valleys (never on a strip), rain streaks round you and a rain hiss. **No wind, and the flight model is untouched.**
- The weather is saved with the game. Turn the effects off in Settings > GRAPHICS > **Weather**.

## The strips (v0.76)
- The bush strips look like bush strips: patchy mown grass or dirt, worn wandering wheel ruts and bare spots, ragged edges with tall grass, rocks and stumps on the rough side (driftwood on the river bars and shores), white half-buried tyres down the edges, orange cones at the corners, a pair of oil drums at one end, and a limp windsock where a site had none. The home strip stays tidier: short grass, a few rocks, cones.
- It is all decoration beside the strip, never on it or on the approach, and you can't hit it: the ground you roll on is exactly what it was. The mowing bands and tyre tracks that help you judge height on short final are still there.

## Flying
| | VR (Quest) | Desktop |
|---|---|---|
| Stick (pitch / roll) | Put either hand on the stick and squeeze (v0.61: left or right; the other hand can't take it while one holds it) (the glove locks on it), move your hand: the stick pivots under it, to round-cornered stops (a bump at the stop). Let go and it stays where you left it (v0.49.1; Settings: STICK ON RELEASE = CENTRES makes it spring back to centre) | W / S pitch, A / D roll (click to mouse-look) |
| Rudder | Left stick left / right (v0.61: or the right stick, if you push it further, for flying with the stick in your left hand) | Q / E |
| Throttle | Either hand on the throttle knob (left wall, on the quadrant bar aft of the map holder), squeeze, push / pull (light tick every 10 %, firm stop at idle and full) | Shift / Ctrl (or = / -) |
| Flaps (0-15-30-50) | v0.42: the handle is on the cabin ROOF, above your head to the left. Reach up, grab the black T-grip (either hand) and pull it DOWN through the notches; push it up to retract (clunk + buzz per notch) | [ and ] |
| Elevator trim | v0.42: the crank on the roof console, right of the flap handle. Grab its knob and wind it: anticlockwise (as you look at it) = nose up, clockwise = nose down, 3 turns end to end, 8 clicks a turn. The white pointer beside it shows where it is | PageDown nose up, PageUp nose down (hold) |
| Brakes | Left trigger (v0.61: the right trigger when your left hand is on the stick) | B |
| Get out (stopped, idle) | Y | F |
| Landing light | Grip the toggle under the panel (the yellow ring on it) to flick it up / down | L |
| Reset / recentre | B = reset to the home strip, cold and dark (keeps your fuel and cash; below 5 gal it tops up to 5 gal, paid at the home drum price), A / X = recentre | R reset, Home recentre |

## Sound (v0.83)
- The engine has a prop thrum, sounds duller with the windows shut, pops when you chop the throttle at high rpm and ticks as it cools after shutdown. Under a rain front the rain drums on the fabric (louder at speed, duller with the windows shut). Cargo sounds like what it is (wood, metal, sacks, card, cases) and what it weighs, and the straps make a buckle sound. In the three towns you hear a murmur and people at work. The volumes are under MENU > AUDIO, as before.

## Hand mic (v0.82)
- A push-to-talk handset hangs on a clip under the right end of the panel, on a coiled cord to the radio. Grab it with either hand (grip) and the cord stretches after it. Let go and it snaps back onto the clip. The cord swings with the Cub in turns, bumps and turbulence. It doesn't transmit anything yet.

## Engine start / shutdown (v0.19: the plane starts cold and dark)
| | VR (Quest) | Desktop |
|---|---|---|
| Fuel valve ON / OFF | Grab the red pointer handle (switch strip under the left of the panel) and roll your wrist a quarter turn. It clicks into each detent and bumps at the stop. ON feeds both wing tanks | U |
| Master ON / OFF | Grip the red rocker to flip it (v0.84: no fingertip push) | O |
| Mixture RICH (in) / CUTOFF (out) | Grab the red knob and pull it out / push it in | Y |
| Carb heat COLD (in) / HOT (out) | Grab the black knob and pull it out / push it in | H |
| Primer | v0.44: it is locked in. Grab the chrome T-handle and twist it a quarter turn to unlock it, then pull it all the way out and push it back in (one shot per stroke). Push it home and twist it back to lock it. v0.46.1: the twist has to be deliberate (past about 30° and held for a moment), and while you're pumping it ignores how your wrist rolls. It only locks again once it's fully home and you twist it back the way it came | P (one stroke) |
| Mags OFF > R > L > BOTH > START | Grab the key and twist clockwise / back (click + buzz per position). v0.44: keep twisting past BOTH, against the spring, to START, and the engine cranks while you hold it. Let go and it springs back to BOTH | I (Space to crank) |
| Starter | Squeeze and hold the grip on the red START button (the glove points its index finger at it), or turn the key to START | Hold Space |
| Checklist card | Squeeze it (under the right of the panel); let go to put it back | J |

Start: fuel ON, master ON, mixture RICH, carb heat COLD, prime 2–3 strokes (cold) or 0–1 (warm), throttle cracked (~10%), mags BOTH, hold the starter until it runs (~700 rpm).
Flooded? Throttle full and crank, then pull the throttle back when it fires.
Shutdown: throttle idle, mixture CUTOFF (it stops), mags OFF, master OFF, fuel OFF.

v0.23 hands (VTOL VR style, no laser): your hands are gloves. Squeeze with the trigger off = point the index finger; trigger curls it; thumb off the buttons lifts the thumb. A yellow ring shows what your hand will work. Squeezing a control and letting go without moving it still does the old one-step toggle. Quest hand tracking (no controllers) shows tracked gloves and pokes switches with your index tip.

v0.49 flying gloves: the hands are now low-poly pilot gloves (fabric back, leather palm and fingertips, a short gauntlet with a velcro strap tab). They grab, point, poke and relax exactly as before. Change the colour with Settings > **Gloves**.

**v0.84 grip only (Neil):** cockpit controls no longer work by touch. A fingertip pushing the MASTER rocker, flicking the landing light or pressing START (and poking the COM radio) does nothing now. Put your hand on a control so the yellow ring shows, then squeeze **grip** (either hand) to work it: switches, knobs, the mag key, primer, fuel valve, mixture, carb heat, panel light, START (hold), landing light, parking brake, flaps, trim, stick, throttle, windows and door, the clipboard, the hand mic and the COM radio. Your hands still stop at the panel.

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
- **Reading the strip on approach (v0.63):** every strip lies exactly on the ground, so what you see is what the wheels will meet.
  - The home strip and the Ridge, Dry Fork and Lodge strips are mown, with lighter and darker bands every ~8 m across them.
    - On short final the bands rush toward you faster the lower you are, and their spacing tells you your height.
    - Two worn tyre tracks run down the middle, darker in the touchdown zones.
    - White threshold bars mark each end, with aiming blocks about a sixth of the way in and small white edge marks every ~19 m.
  - Halvorsen's graded gravel strip has the same markings in a dirt version.
  - Mown bush strips have the bands and tracks without paint.

## Windows and door (v0.19)
| | VR | Desktop |
|---|---|---|
| Right upper window (latches under the wing) | Grab its handle, roll your wrist to turn the latch, then swing it out and up | 1 |
| Right lower door half (folds down) | Grab its handle, roll your wrist to turn the latch, then push it out | 2 |
| Left front / rear window (slide aft) | Grab the handle, roll your wrist to turn the latch, then drag | 3 / 4 |
| Right cargo door (v0.77.13: aft of the door, under the rear window; folds down) | In the seat: reach back to its handle, roll your wrist to turn the latch, then push it out (past halfway it drops onto its stop). On foot: squeeze at its handle from outside to open or shut it | 5 (in the seat) |

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
| Load | v0.77.1: the **cartridge pouch** is on your belt, front right: about 12 cm right of your head, 62 cm below your eyes and 15 cm forward. It follows which way you face, not where you look. With the rifle in one hand, squeeze grip with the other hand there (anywhere within about 24 cm) and a round appears in that hand (a pick sound and a tick). Bring it within about **10 cm** of the loading gate on the right side of the receiver, any way round: it clicks in with a bump. While a round is near the rifle the wrist says A/X TO LOAD, and pressing **A** (or **X** on the left hand) on the round hand within 25 cm loads it. A full tube says MAGAZINE FULL and you keep the round. Keep squeezing at the gate and the next one comes from the pouch | **Z** (one round per press) |
| Strap it down | Squeeze the rear seat **belt buckle** or the **cargo net** anchor in the baggage bay (they are the strap anchors) | **/** does both, and works from the seat too |
| Unload | Undo the strap, then grab the piece and take it out | **E** by the Cub takes out the last unstrapped piece |
| Deliver | Set every piece of the job down on the destination's yellow pad | **E** away from the Cub sets the piece down in front of you |

- **The board** lists three jobs, each with what it is, where it goes and how far, the total weight and what the pieces are, the pay, and a deadline if it has one (deadline jobs pay 40 % more). A job you have taken turns green and shows where its cargo is (ON THE PAD, IN THE CUB, n/3 DELIVERED) and the time left. You can run **3 jobs** at once. Each job's pieces carry a coloured tag that matches the bar beside it on the board.
- **Deadlines** are in game minutes, and a game minute is one real minute. Deliver late and you get half pay.
- **Payment** comes once every piece of the job is on the destination pad. The customer takes the cargo away, the money goes in your **wallet**, and the board puts up a new job.
- **The wallet** is the gold top line of the screen on your left wrist (the desktop HUD shows the same line). It shows the cash and your most urgent job: where it goes and the minutes left. You start with $150.
- **Weight and balance:** every piece has a real weight and sits at its station. The rear seat is +37 in, the floor about +25, and the baggage bay +57 (50 lb limit). That is what the flight model gets, as mass, CG and inertia. The laminated W&B card on the right wall lists the rear seat, baggage and floor loads (LOOSE in red until strapped) and plots the dot. Full fuel plus you leaves about 317 lb before max gross (1750 lb). Push the throttle up on the ground while over gross, out of CG limits, over 50 lb in the baggage bay (the card says BAGGAGE OVERLOAD, v0.52.1), or with 10 lb or more of loose cargo, and you get one reminder.
- **Loose cargo moves.** Unstrapped pieces slide under hard braking, full power, skids and rough ground. They hop on a hard landing, and a piece can slide off the rear seat onto the floor. You hear and feel the thump, and the CG moves with them. Strapped pieces stay put.
- **Stacking (v0.74).** You can stack cargo up to the cabin roof: about 82 cm on the rear seat, 78 cm in the baggage bay and 45 cm on the floor. Nothing stops you overloading the Cub. Go over max gross or put the CG aft of its limit if you choose; the flight model flies the real mass and CG, and the warnings (the loading line, the W&B card, the throttle reminder) stay. A strapped stack doesn't move, however tall. A loose one slides as usual (and off the rear seat onto the floor), never through the roof.
- **Stacking by hand (v0.77.9).** Let go of a piece over another one and it lands squarely on its top. Within 8 cm of the piece below, it squares up with it. Let go with only an edge over a piece and it slides off and sits beside it, if there's room. Let go anywhere inside the cabin and it goes to the nearest load zone. If that spot is full, it goes to the next zone with room, never through the floor. Loose pieces bump into each other and never slide through one another. A stack stays put through normal taxiing and turns.
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
Fourteen **unprepared landing spots** off the airfields (eight since v0.52, six tricky ones added in v0.77), each with a customer camp, a small job board and a yellow pad. Nothing is graded except the two short strips. Land on what's there.

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
| EAGLE SHOULDER (v0.77) | mountain shoulder, 740 m up | climbers hut | 200 m | **one-way**, 10 % uphill, no go-around once committed. Pays x1.8 |
| OXBOW BAR (v0.77) | river-bend gravel bar | raft guides | 180 m | water close alongside. Pays x1.4 |
| KNIFE SADDLE (v0.77) | narrow saddle on a crest | radio relay | 170 m | **one-way**, only 12 m wide, the ground falls away both sides. Pays x1.8 |
| TALL TIMBER (v0.77) | forest clearing | timber cruisers | 250 m | mown, but a wall of 18-27 m spruce stands 90-150 m off both ends: come in steep (about 15 deg over the tops), no dragging in low. **The spruce are solid**: hit one and you crash. Pays x1.6 |
| DOGLEG FLAT (v0.77) | dogleg strip | homestead | 120 + 110 m | mown, two legs with a 26 deg kink. Steer round at the knee; heavy you need both legs. Pays x1.6 |
| HIGH COL (v0.77) | alpine strip, 1057 m (the highest) | survey camp | 140 m | **one-way**, rough and sloped, up in the snow. Pays x1.8 |
| DEADMAN BOX (v0.80) | box canyon | canyon geologists | 220 m | **one-way**: land uphill into a 160 m headwall, no go-around past short final. Hook: CORE SAMPLES. Pays x1.8 |
| HANGING VALLEY (v0.80) | hanging valley, 380 m up | goat counters | 220 m | **one-way**, 4 % uphill into a headwall: one way in, one way out. Hook: COLLARS + BATTERIES. Pays x1.8 |
| BLIND HOGBACK (v0.80) | hump-backed strip | beekeeper | 200 m | a 4 m hump mid-strip: from the threshold you can't see the far end until you're over the top. Hook: HIVES + HONEY. Pays x1.6 |
| TABLE MESA (v0.80) | mesa top, 394 m | fire lookout | 170 m | the SW end is the lip of a 28 m escarpment: cross it low and slow, an undershoot hits the face. Hook: LOOKOUT RATIONS. Pays x1.8 |

- **Finding them.** A site isn't on your map until you've found it. Fly over within about 400 m (and below 250 m above it), or walk up to it. You'll get `FOUND <site> - <type> ~<length> M - <customer> - ON YOUR MAP NOW`. Found sites stay found in your save.
- **Jobs to sites.** About half the jobs from the airfields go to bush sites, and sites send some of their jobs to other sites. Bush jobs pay 20 % more, and the tricky v0.77 sites pay 40-80 % more (x1.2 + 0.2 per difficulty step). If you haven't found the place yet, the board says `(FIND IT)` and the map draws a dashed **?** search circle (320 m radius) with the site somewhere inside it, and the kneeboard says `SEARCH ...` with the distance and heading to that circle. Once found, the board and kneeboard show the type and length (`LAKE SHORE 200M`).
- **Briefing (v0.77).** The tricky sites add a one-line briefing to the FOUND message, such as `TWO LEGS WITH A 26 DEG KINK`.
- **Job hooks (v0.80).** The plain parcel runs to the four v0.80 sites are that customer's own work: core samples for the geologists, collars and batteries for the goat counters, hives for the beekeeper, rations for the lookout (the title and the pieces on the board).
- **Air density** is constant in this flight model, so the high col is hard because it's short, rough and sloped, not because of density altitude.
- **On the map:** found sites are drawn and labelled with the customer, the type and the length, plus `1-way` on the bench and the meadow. For those two, the FOUND message also gives the uphill landing heading (`ONE-WAY: LAND UPHILL HDG nnn`).
- They're short: an empty Cub lifts off in 55–110 m, and at max gross in 130–195 m. Landing rolls run 50–130 m. Watch your weight going into the bench and the meadow, and use the slope.

## Hunting (v0.53): lever rifle, deer, binoculars
Some jobs on the boards are **hunting jobs**: a lodge, the elk camp, the ranch or the Dry Fork butcher wants one deer. The board says `1 DEER (~100-150 LB) - HUNT AREA ON THE MAP`, and the paper map circles the herd's forest in orange with a hoof. Hunting jobs pay well.

| | VR (Quest) | Desktop |
|---|---|---|
| Take the rifle | It hangs on the **cabin wall rack** (outside the cabin, by the door) and, once you've flown with it, in the **Cub's rack** on the right cabin wall. Squeeze grip on the stock's wrist. It flies into your hand (0.12 s). v0.77.1 / v0.77.5: the hand that takes the stock first gets **one fixed grip** however you reached for it: an upright trigger hand with the wrist along the stock, thumb on the far side of the wrist, index high in the guard, middle finger in the lever loop, ring and little fingers on the loop's back corner. The glove stays exactly where your controller is, and the rifle hangs off it by that grip (muzzle a little down and inward of the controller's forward). Hold the controller as you would a pistol grip; left-handed is the mirror image | **T** by a rack (T again: back on the rack, or slung on your back away from one) |
| Support hand | Squeeze grip with your other hand anywhere within about 15 cm of the rifle: it always takes the **one fixed forend grip** (a palm-up cradle under the forend). Bring the stock to your cheek: it settles into a virtual shoulder. Let go of the stock and the forend hand **stays on the forend** and holds the rifle there (v0.77.6). It can't fire or work the lever until a hand grabs the stock again. Held in one hand, the muzzle lags a little behind fast swings | (automatic) |
| Aim | Look down the rear notch over the bead | Hold **RMB** (aim down the sights) |
| Fire | Trigger, rifle hand only. The rifle's trigger follows your finger (v0.67) | **LMB** |
| Work the lever | Flick the rifle down and up one-handed, or press **B** on the rifle hand (**Y** if it's your left) without letting go: it ejects the case, cocks the hammer and chambers the next round | **X** |
| Load | Squeeze on the **cartridge pouch** at your belt (front right) for a round and bring its tip within about 6 cm of the loading gate on the receiver's right side, pointing roughly forward (within ~60°): it snaps onto the gate and slides in (v0.67.2). A full tube says MAGAZINE FULL and you keep the round. Keep squeezing at the gate and the next one comes from the pouch | **Z** (one round per press) |
| Ammo at home (v0.79.2) | None for sale: the carton on the stump by the cabin is empty. You start a new game with 20 rounds in the pouch (plus a full tube); after that, buy at Dry Fork | – |
| Buy ammo in Dry Fork (v0.70) | The **HARDWARE** counter in the Dry Fork strip hangar: a box of 20 .44-40 for $35 from your wallet. Tap the brass bell on the counter to buy: the box lands on the counter. Grab it and the 20 rounds go into your belt pouch (60 max). Up to 3 bought boxes wait on the counter, and they are saved | **Z** at the counter: takes a waiting box, else buys one |
| Sling / put down | Let go over your shoulder, muzzle up, to sling it. Let go at a rack to rack it. Let go anywhere else and it lies on the ground | T |
| Take it off your back (v0.71) | Reach behind or over either shoulder with either hand and squeeze grip. The zone runs from 30 cm above your eyes to 45 cm below, up to 42 cm to either side and 55 cm back; anywhere within 16 cm of the slung rifle works too. A short tick in the controller tells you you're in reach | T |
| Binoculars | They sit in a **holster on your left hip** (v0.77.10; reach down by your left side with either hand), and in the Cub they sit in a holder by your right knee. Grab them (one hand or two) and raise them to your eyes: the 7× view comes up with the eyepieces about 12 cm in front of your eyes and stays up out to 15 cm | **V** (toggle) |
| Field dress | Squeeze grip on a downed deer and hold for 3 s | Hold **E** by it for 3 s |

- **The rifle** is a Winchester 1892-style carbine (the full game's mechanics on the new model): 7 in the tube plus one chambered, 20 rounds in the pouch at the start. Hammer down means no shot until you work the lever. An empty chamber just clicks. The bullet flies at 400 m/s with drag and gravity, zeroed at 50 m (a little high inside that, dropping more and more past 100 m). It hits the ground, trees, the cabin, or a deer.
- **Deer** graze in six forest herds (HOLLOW TIMBER, PINE FLATS, SPRUCE PARK, CEDAR GLADE, EAST WOODS and ELK MEADOW), about 20 deer and stags in all. They see you from about 35 m when you walk upright in the open, and less when you crouch (C) or keep still. A gunshot within about 320 m, or a low plane, sends the herd off running. A shot to the head or chest (just behind the shoulder) drops a deer. A body shot wounds it and it runs. Herds you scattered come back after a while.
- **Field dressing** only works when you have taken a hunting job ("NOBODY HAS ORDERED VENISON" otherwise). It turns the deer into a **VENISON CARCASS** of 100–150 lb (deer 100–125, stags 125–150) lying on the ground. It takes **two hands** (desktop: E with the hand truck), counts on the W&B, and is **perishable**: its freshness clock only starts once it is dressed. Set it on the customer's pad to get paid. You can cancel a hunting job until you have dressed a deer for it.
- **Binoculars (v0.77.10):** the 7× view is steady. It comes from where your head is this frame and is redrawn every frame. Your hands only nudge it slowly, up to 3°, so hand shake doesn't show. Let go and they go back in the hip holster.
- **Binoculars (v0.84):** each hand holds them in one fixed pose, with the **eyepieces on the thumb side of your fist** (where your thumb and index finger meet). Raise that end to your eye like a telescope, with your forearm coming up from below, and the pair comes up the right way round, looking where your hand points. With two hands, each hand holds its own barrel in the same way. The 7x view still comes up when the eyepieces are within 12 cm of your eyes. (v0.77.6's "they always face your eyes, whatever the controller does" is gone.)
- **Binoculars (v0.65):** grab them with one hand, or put your other hand on the other barrel to hold them with both. Each hand wraps its barrel: the fingers curl until they touch it. With both hands the pair sits between your palms; let go with one and the other keeps them.
- **Binoculars** also show the distance to a deer or herd in the middle of the view, and a bush site you spot through them (within 1.5 km) goes on the map.
- Climbing into the Cub puts a rifle you carry (or one lying beside the Cub) in its floor holder (v0.77.12: it lies lengthwise on the cabin floor right of the front seat, muzzle forward, under a latch strap; reach in from the door and grab any part of it, and the latch flips open; let go over the holder to latch it back in), and the binoculars in their holder. They go back in the hip holster when you get out.

## Airdrops (v0.54)
Some board offers are **airdrop jobs** (blue AIRDROP badge): people at a place with no strip need supplies. The **STRANDED HIKER** on BALDY RIDGE, the **SURVEY PARTY** on EAST SPUR, the **FIRE CREW** on BURNT HILL, the **TRAPPER** in DEEP WOODS and the **CANOE PARTY** on the LOWER RIVER. The board says `AIRDROP TO THE ... AT ... (NO STRIP) n KM - n BUNDLES n LB`. The map shows an orange X with a smoke puff, and the kneeboard gives `DROP n KM  HDG nnn`. Accepting puts 2–4 streamer **bundles** (15–35 lb each) on the pad; load them like any cargo.

| | VR (Quest) | Desktop |
|---|---|---|
| Open the door | Both right halves: the upper window up under the wing, then the lower door down (see Windows and door) | **1** then **2** |
| Push a bundle out | Reach back, squeeze grip on a bundle, put your hand out through the open door and let go. It leaves with your hand's speed plus the plane's | **G** (the bundle nearest the door) |

- At the site, **orange smoke** goes up from a pot beside the X while your drop is on; you can see it from about 6 km, and inside 1.5 km you get a reminder. Come in low and slow into view of the X, and let go a little before it: the bundle carries your speed forward. Around 30 m above the ground at 28 m/s, that is about 50–60 m short.
- **Scoring:** within 10 m of the X is full marks. The share falls to 35 % at 150 m. A bundle more than 250 m off, or one in the water, is lost (worth nothing). Condition comes from the impact speed: a streamer bundle falls at up to about 24 m/s, and one that goes through trees is slowed but knocked about. A smashed bundle is worth half.
- The job pays when the last bundle is down: the job's pay × the average over all its bundles of (accuracy × condition). It's half pay if late. You can't cancel once a bundle is out.
- With the door shut (or only half open) G says to open it; in VR a bundle you let go inside the cabin settles back in.

## Reputation (v0.56)
Every customer remembers you: the town or crew at each strip, each bush camp's customer and each airdrop party. Each has a rep from 0 to 100, and everyone starts at **30 (NEW)**.

| Rep | Tier | Stars | What it does |
|---|---|---|---|
| 0–14 | UNHAPPY | ☆☆☆☆☆ / ★☆☆☆☆ | (nothing more, they just remember) |
| 15–34 | NEW | ★★☆☆☆ | normal pay |
| 35–54 | KNOWS YOU | ★★☆☆☆ / ★★★☆☆ | normal pay; Dry Fork at 55 opens Halvorsen |
| 55–74 | TRUSTED | ★★★☆☆ / ★★★★☆ | their jobs pay more: +1 % per 2 rep over 50 |
| 75–100 | REGULAR | ★★★★☆ / ★★★★★ | up to +25 % pay, and they **ask for you by name** |

- **What changes it** (the delivery message shows the change, e.g. `THE RIDGE CREW +5 REP, NOW KNOWS YOU`):
  - On time **+5**, with more than 40 % of the deadline to spare **+7**; late **−8**.
  - Special cargo and venison: condition counts, from +9 for perfect to −4 for broken or spoiled.
  - Heavy freight +1, and a request job +2.
  - Airdrops: +10 for bundles on the X in good shape, 0 for an average drop, −15 if all are lost; −8 more if late.
  - Cancelling a job: −2.
- **Requests:** regular customers (75+) turn about 40 % of their freight jobs into **REQUEST** jobs (gold badge, e.g. `"ASK FOR NEIL" - MAE AT THE FEED STORE`). A light request carries up to twice the load (at most 320 lb) and pays **+35 %** on top. Hunts and airdrops are never requests. Add `?pilot=NAME` to the URL to be asked for by another name.
- **Halvorsen station:** the Halvorsen Ag-Bio Station 4 board, across the gravel strip from the fenced compound in the NE, starts **closed** ("NO CIVILIAN CONTRACTS"), with a bar showing your Dry Fork rep. Reach **55 with DRY FORK FEED + SUPPLY** and they vouch for you: the board opens, shows on your map, and its jobs (and jobs to it) pay **+30 %**.
- **Where you see it:** each job board's footer shows that town's rep, stars, tier and pay bonus, and each offer shows its customer's stars. The kneeboard shows the stars (and REQUEST) next to each job's heading. The wrist and HUD show `REP <TOWN> <n> <TIER>` for the board you stand at, or in the seat for your next job's customer.
- Rep and the Halvorsen unlock are saved with your jobs. A new game (`?plane`) starts everyone at 30 again. R (reset the Cub) doesn't touch it.

## Fuel
- Two wing tanks hold 36 gal (136 L). Burn scales with power: full throttle empties them in about 25 minutes. Below 3 % the engine sputters, and at empty it quits. The fuel gauge and the W&B card show what's aboard.
- **Refuel at a red drum.** Since v0.55 there are four, and you pay for fuel as it flows. Prices: **HOME $6.40**/gal (left of the Cub's parking spot), **RIDGE STRIP $7.30**, **LODGE $8.90** and **DRY FORK $5.80** (the town depot, the cheapest). The drums away from home sit by the job board, and the paper map prints each price under the strip's JOBS square. Taxi to within 15 m of a drum, stop, and shut the engine down. Then:
  - VR (v0.73): get out and take the **nozzle** off the red drum (squeeze grip on it). It's on a 9 m hose that sags and lies on the ground. Carry it to a wing-root filler cap (the silver caps on top of the wing, either side of the cabin). Put the nozzle in and **squeeze the trigger** to pump, at about 3 L/s, paid as it flows. Let go of the trigger to stop. Let go of the grip and the nozzle stays in the cap; take it again to carry on. Pull it out and you get the receipt. Past 9 m it slips out of your hand. Drop it anywhere and pick it up off the ground, or let go by the drum to hang it back up.
  - VR (v0.77.7): the nozzle is a pistol grip (body, spout, red trigger lever, guard). Your hand holds it by the grip, fixed in your fist, with the spout pointing where your fingers point and a little down. The lever squeezes with the trigger. The hose drapes over the wing's leading edge and top and never passes through the wing.
  - Can't reach the cap? (v0.72) Climb the Cub: walk into the dark **step plate** on the main-gear leg (44 cm up), then on to the **tyre top** (80 cm up). You step up on your own, eased over a moment. From the tyre, the cap is at chest height. Walk off and you drop back down. A hop (right stick up / Space) is a little higher next to the Cub (55 cm instead of 40).
  - Desktop: stand by a filler cap and press G. G again (or walking away) stops it.
- A reset (R / B) keeps the fuel you have (and your cash). With under 5 gal aboard (main + aux) it tops up to 5 gal at the home drum price ($6.40/gal, at most $32), on the hangar account if you're broke (v0.79.2).
- When you stop, you get a receipt: gallons and cost. Away from home it is **cash only**, so the pump stops when you run out of money. The **home drum always gives you 12 gal on account**, even when you are broke past the hangar's credit limit. That is enough to reach any job and back, so you can never be stuck.

## Running costs (v0.55): oil, tach hours, wear, damage, the home hangar
The Cub keeps a log: tach hours, oil, tyre and brake wear, and gear and engine damage. Tach time runs 20× real time, so 3 minutes with the engine running is 1 hour.

| | VR (Quest) | Desktop |
|---|---|---|
| Buy oil, tyres, repairs, the 100-hour | Poke the price button on the **HANGAR** service board (at the open shed on the left of the home strip) or on a strip's fuel board | **1-4** standing at the board |

- **The hangar board** shows avgas, tach hours, when the 100-hour is due, landings, oil, tyres, brakes and damage. Its four buttons are:
  1. Top up oil ($9/qt).
  2. New tyres and brake pads, priced by wear ($240 for tyres, $180 for pads, when fully worn).
  3. Repair gear and engine damage ($1,200 × gear damage + $2,600 × engine damage).
  4. 100-hour service with an oil change ($420). It resets the clock and takes a little engine wear off.
- At the hangar you can run an **account up to $600** (shown in red), and job pay clears it. Oil at home is never refused while it is below 4 qt. The Cub has to be parked nearby with the engine off.
- **Strip fuel boards** (Ridge, Lodge, Dry Fork) show the fuel price and sell oil ($10–12/qt), cash only. Repairs and service are done only at home.
- **Oil:** the sump holds 6 qt and the engine uses about 1 qt every 12 hours (more when the 100-hour is overdue).
  - Below 4 qt the oil pressure gauge drops and the temperature rises.
  - Below 3 qt the engine starts to wear. Below 2 qt you lose about a quarter of your power.
  - At about 0.3 qt it **seizes**: engine out. R recovers you to home, and a repair fixes it.
- **100-hour service:** a warning at 95 h. Past 110 h the engine runs rough (92 % power) and slowly wears.
- **Tyres** wear as you roll, skid under hard braking, and wear more on firm landings. Below 10 % braking is weaker. **Brakes** wear with use, and below 20 % they lose bite.
- **Hard landings:** above about 400 fpm at touchdown the gear bends (28 % at 590 fpm), and a bent gear pulls you to one side on the ground. Over about 790 fpm is still a crash.
- **A crash** costs salvage and a ferry home ($250 + $80/km from home) and damages the gear and engine. It can take you into debt.
- **The HUD and wrist** show a maintenance line only when something needs attention: OIL LOW, 100-HR DUE / OVERDUE, GEAR DMG, ENG DMG, TYRES WORN, BRAKES WORN, ENGINE SEIZED.
- Damage and wear only change what your controls do: a power cap on the throttle, weaker brakes, a rudder pull on the ground, or engine out when seized. A healthy Cub flies exactly as before.

## Plane upgrades (v0.57)
Parts are sold on the **PARTS** board on the home hangar wall, next to the service board. They are cash only, and the tank, tyres and pod also need rep: Lodge 55, Ridge Crew 35 and Dry Fork 55.

| | VR (Quest) | Desktop |
|---|---|---|
| Buy / fit / remove | Poke the row on the parts board | **1-7** standing at the board |
| Carry a part | Grip it on the hangar bench or floor | **E** by the part |
| Put it on | Hold it at the green outline on the Cub; it clicks on | **E** at the Cub |
| Tighten the bolts | Grip a bolt head and twist your wrist (270° each, ratchet clicks) | **E** once per bolt |
| Load / unload the cargo pod | By hand at the pod under the belly | **E** standing on the left side of the Cub by the pod |

- Fit and remove parts only at the home hangar: on foot, with the Cub stopped nearby and the engine off. Empty the pod before you take it off. Removed parts go back on the hangar floor, and fuel left in the aux tank is credited.
- **Long-range tank:** after the mains are full, the drum fills 16 gal of aux. With the master on, it feeds the mains in flight. The HUD shows `+x.x AUX`.
- **Tundra tyres 39":** roll easier on rough ground and take a firmer landing before the gear bends. They add a little drag.
- **Cargo pod:** holds 100 lb of light pieces that can't slide. It adds drag.
- **LED landing light:** brighter, wider and longer than stock. It uses the same landing-light switch.
- **COM radio:** customers call with offers (requests first), and being late costs half the rep.
- Floats and wheel-skis are on the board as "not in stock yet" (a later version).
- Every part's weight shows on the W&B card. With nothing fitted, the Cub flies exactly as stock.

## Townsfolk and emergencies (v0.58)
A customer stands at every job board. Walk up to them for a hello: their rep tier and where their story is. Deliveries move their story on (a NOTE after the delivery, and radio lines with the COM radio). Emergency call-outs come every 6–10 min; one runs at a time.

| | VR (Quest) | Desktop |
|---|---|---|
| Take a call-out | Poke the red EMERGENCY sign (Home, Ridge, Lodge, Dry Fork boards) | **4** at the sign |
| Take it by radio (COM radio fitted, master on) | Grip the radio's face (yellow ring) | **C** in the Cub |
| Hand your emergency to the state helicopter (−6 rep) | Poke the red sign again | **4** at the sign |
| Help a casualty to the Cub | Walk up to them (they lean on you and follow), then walk to the Cub's door | Same |
| Belt the patient in | Squeeze the rear seat **belt buckle** | **/** |
| Spot a search party | Binoculars | **V** |
| Drop supplies | Push a bundle out the door | **G** |

- **Medevac:** the patient boards only with the Cub stopped, the engine off and the rear seat clear. Their weight is on the W&B card. Their condition drops with time, faster with rough flying or no belt. Shut down within 90 m of the Dry Fork pad and Nurse Okafor takes over. Pay follows their condition.
- **Search-and-rescue:** the map and kneeboard show a 450 m search circle. Fly within 150 m below 260 m AGL, or use the binoculars, to spot the party (a red X on the map). Then drop a supply bundle within 60 m of them (not in the water) for 60 % of the pay. Or land nearby and walk up: one climbs aboard, and you fly them to the clinic for the full pay.

## Messages, wrist and kneeboard (v0.59.1)
- **Wrist (VR):** a long message wraps and pages, two lines at a time, every ~2.6 s. It stays up long enough to read to the end. The message comes before the maintenance and rep lines.
- **Kneeboard:** with three jobs plus an emergency call, all four fit. The emergency is listed first. REQUEST and the customer's stars are on each job's due line.

## Paper map
- It lives in the holder on the left cockpit wall. In VR, squeeze grip on it to take it, and grab the far edge with your other hand to open it out. Let go in the cockpit and it clips back into the holder.
- On foot you can carry it. Let go near the holder to clip it back, or anywhere else to drop it (pick it up off the ground with grip).
- Desktop: M holds it up in front of you, anywhere. M again puts it away.
- **Hold (v0.77.3):** your left hand always pinches the map's lower-left corner and your right hand its lower-right, with the thumb on the front in the cream border. With both hands it spans between them, so your hands never cover the map.
- **Turning it (v0.77.8):** held in one hand, the map turns exactly with your hand, like real paper pinched at the corner. Tilt or twist your wrist to angle it. It no longer turns itself to face you. In two hands it stays level between them, facing you.
- v0.51.1: the strips with a job board are gold squares marked JOBS. Each job you have taken draws a dashed line in its tag colour to its destination, which is ringed and labelled with the job's number and title.

## Kneeboard (v0.51.1)
- A clipboard on your left thigh lists your active jobs. For each one it shows the colour tag, the title and pay, FROM > TO, the distance and heading from the Cub to the destination pad, the pieces and weight, and the deadline or the special-cargo meter. It also shows where the cargo is: on the pad, in the Cub (STRAPPED or n LOOSE in red), or n/m delivered. It updates as you go.
- VR: squeeze grip on it to lift it up to your eyes; let go and it goes back on your thigh. v0.77.3: you hold it pinched by its lower-left corner (left hand) or lower-right corner (right hand), thumb on the front margin, so the page is clear of your hand. Desktop (in the plane): N holds it up, and N again puts it back.
  - v0.77.8: the clipboard turns exactly with the hand that holds it (pinched at the corner), so twist your wrist to angle it toward you. It doesn't turn by itself any more.
  - **v0.84 (Neil's photo):** you hold it at its lower edge near the outer corner (left hand lower-left, right hand lower-right), the edge in your hand like a handle: thumb on the front face, fingers round the back, forearm coming up from below. Held level in front of you, the page faces your eyes (tipped back toward you); raise your hand about 45° and the board stands upright facing you, clip at the top.
- **Pages (v0.64):** a tab bar along the top shows four pages: **1 JOBS** (the manifest above), **2 W&B**, **3 CUB** and **4 PERF**.
  - VR: pull the trigger of the hand holding the clipboard for the next page (it wraps round). That trigger doesn't work the brakes while you hold the clipboard; the other hand's trigger still does.
  - Desktop: with the clipboard held up (N), **.** goes to the next page and **,** to the previous one.
  - **W&B:** each station's weight and arm, the total against the 1750 lb gross, the CG and its limits, payload left, and the envelope graph with your current point, plus WITHIN LIMITS / OVER GROSS / CG FWD / CG AFT.
  - **CUB:** tach hours, landings, hours to the 100-hour, then bars for oil, tyres, brakes, gear damage and engine damage, the engine power cap and braking left.
  - **PERF:** weight, fuel on board, endurance in minutes of flying at 65% and full power (and at the current power with the engine running), and the V-speeds for this weight: stall flaps up and flaps 50, Vx, Vy, approach (1.3 Vs0), short field (1.25 Vs0) and Va. They are the book PA-18-150 speeds scaled by the square root of weight / 1750.
  - The bottom of PERF (v0.75) shows a METAR-style weather line, e.g. `HOME AUTO 00000KT 3000 -RA BKN012 OVC020`, and the trend (`BECMG LIGHT OVERCAST IN ~12 MIN`). There is never any wind (00000KT).

## Lights and time of day
- Landing light: grip the toggle under the panel (VR) or press L.
- Panel lights: the PANEL LT knob on the switch strip, far right (twist it, or press K). It needs the MASTER on.
- Time of day is fixed, so there is no clock and no dusk to beat. Pick it in Settings → **Time of day** (EARLY / MORNING / AFTERNOON / LATE / SUNSET / NIGHT). A saved game keeps its time.

## Menu (v0.68.1)
- **Open it:** in VR, turn your watch wrist to your face and poke the gold MENU button. On desktop, press **Esc** (or **F2**); letting go of mouse-look with Esc opens it too. Close it with CLOSE, RESUME, MENU again, or Esc.
- **Pointing:** poke the board with your dominant index finger, or point a controller at it (an orange dot shows where) and pull the trigger. The rifle doesn't fire while the menu is open. On desktop, click.
- Tabs along the top (the board remembers the last one, `bp_menutab`):
  - **RESUME:** one big button back to the game.
  - **SAVE / LOAD:** SAVE NOW (the autosave), LOAD LAST SAVE, and 3 slots. Each slot shows its date and time, the nearest strip and your cash, with SAVE HERE and LOAD. The autosave line shows the same. NEW GAME wipes the autosave and starts again. NEW GAME, LOAD, and SAVE HERE over a used slot all ask you to poke again within 4 s to confirm. Loading restarts the page, so in VR press ENTER VR again.
  - **GRAPHICS:** every graphics row, plus the PERFORMANCE / BALANCED / QUALITY presets and the PERF strip.
  - **COMFORT:** comfort vignette, turning (snap 30° / 45° / smooth), stick on release, control labels, and RECENTRE + SET HEIGHT.
  - **CONTROLS:** dominant hand (RIGHT / LEFT: the watch and its MENU go on the other wrist, and your dominant finger pokes), haptics, and a quick button reference.
  - **AUDIO:** master, engine + flight (engine, wind, rumble), ambient, and effects (clicks, shots, horn) volumes.
- Settings are saved in this browser (`bp_gfx`). The slots are `bushpilot-save-slot1..3`.
- ` (backquote) still opens the old desktop settings list.

## Settings
- **VR:** turn the inside of your left wrist to your face, as if checking a watch worn face-in. A gold **MENU** button appears under the wrist screen (v0.62); poke it with your right index finger. The MENU board (v0.68.1, tabs above) opens half a metre in front of you. Poke a row to step it to the next value, and poke CLOSE (or MENU again) to close it.
  - v0.77.4: the watch is on the **inside** of your wrist (palm side). Turn your palm up toward your face to see it: it shows when it faces you within about 45° and is within 0.6 m of the headset, and hides past about 57° or 65 cm. The back of the wrist, the stick and the throttle never bring it up.
  - v0.77.15: the wrist screen is turned 90°. On the left wrist it's turned clockwise as you look at it, and on the right wrist (left-handed setting) it's the mirror image. It now reads across the wrist with its top toward your fingers, so raise your forearm (fingers up, palm toward you) to read it upright. The MENU button is still just below it, toward your elbow.
  - It stays until you turn more than about 68° away or move past 0.75 m, so it doesn't flicker at the edge.
  - Poking the message screen itself does nothing, and a finger already on the spot when the button appears doesn't press it.
- **Desktop:** **Esc** or **F2** opens the MENU board (v0.68.1), ` (backquote) opens the old settings list, **F3** toggles the FPS counter.
- Saved in this browser (`bp_gfx`). URL override for testing: `?gfx=shadows:2,grass:1`.

| Setting | Options | Notes |
|---|---|---|
| Shadows | OFF / LOW / HIGH | sun shadow map that follows you (LOW 1024 px ±28 m, HIGH 2048 px soft ±64 m) |
| Render scale | 70–140 % | VR framebuffer scale, applies next time you enter VR |
| Foveation | OFF / LOW / MEDIUM / HIGH | Quest fixed foveation |
| Draw distance | NEAR / MEDIUM / NORMAL / FAR | chunks, rocks, trees and haze |
| Trees (v0.78: was "Forest") | OFF / SPARSE / MEDIUM / FULL | the 3D trees |
| Forest (v0.78) | NORMAL / DENSE | DENSE adds ~43k flat 2D trees past about 270–500 m: spruce over the mountain slopes and woods spreading out from the valley groves. The 3D trees near you are unchanged. Costs up to 4 draw calls and 50–95k triangles. Off (NORMAL) by default, so try it on Quest |
| Grass | OFF / LOW / HIGH | instanced tufts around you |
| Clouds | OFF / NORMAL / HIGH | HIGH adds a second drifting layer |
| Haze | LIGHT / NORMAL / THICK | fog distance |
| Weather (v0.75) | OFF / ON | haze, cloud deck, valley mist, light rain + its sound. OFF = always the clear-sky look |
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
- v0.50 also saves the wallet, the game clock, every board's jobs, every piece of cargo (on the ground where it lies, or in the Cub on its seat or in the bay) and the straps. It saves soon after you take, load or set down anything, and straight away when you get paid. A v0.45–v0.49 save still loads, with a fresh $150 wallet and new boards. v0.51 also saves the special cargo state (damage, freshness, how upset the animals are). v0.53 (save v53) also saves where the rifle is, its magazine, chamber and pouch, and your hunting jobs. v0.56 also saves every customer's rep and the Halvorsen unlock (an older save loads with everyone at 30).
- v0.45 uses a new save key (`bushpilot-vr-blank-v1`), so older saves are left alone and never loaded.
- `?nosave` plays without saving. `?plane` starts a new game in the seat instead of beside the Cub.

## Frame rate (v0.48)
- Poke the wrist MENU button to open **Settings**. The button and the "MENU BELOW" hint on the watch only show while you turn the wrist to your face (v0.68); the status lines are always there. A live **PERF** strip sits above it, updated twice a second:
  - line 1: fps, frame ms (and the worst frame), CPU ms, draw calls and triangles; green means on budget, red means over;
  - line 2: the foveation the XR layer reports (`FFR 1.00`, or `UNSUPPORTED`), the layer type and its framebuffer size, the refresh rate (and what the headset offers), MSAA and the render scale;
  - line 3: what Auto resolution is doing, how many scenery instances are drawn, and whether the ground is vertex-lit.
- **PERFORMANCE**, **BALANCED** and **QUALITY** (v0.68.1: full scale, full terrain, low shadows, grass, far draw distance) buttons are at the bottom of the GRAPHICS tab. BALANCED is the default: 90 % render scale, foveation HIGH, 72 Hz, Terrain shading FAST+GRAIN, everything else NORMAL, Auto resolution ON. PERFORMANCE is the cheapest: 70 %, FAST ground, sparse forest, near draw distance, no clouds. A render scale change takes effect the next time you enter VR.
- To find what costs the most, change one row at a time and watch line 1. **Terrain shading** (FAST / FAST+GRAIN / FULL), **Trees** (OFF / SPARSE / MEDIUM / FULL), **Forest** (NORMAL / DENSE, v0.78), **Clouds**, **Haze**, **Draw distance** and **Anti-aliasing** (needs a reload) are the big ones.
- **Auto resolution** (default ON): if frames run over budget for more than a second, it steps down. First it shrinks the eye viewport to 85 % and forces foveation to HIGH. Then it goes to 75 % with the forest at 75 %, then to 65 % with the forest at 55 %. After about 10 s on budget it steps back up, and it waits longer if it keeps bouncing. Line 3 shows `(not supported here)` if the headset ignores the viewport request; the forest steps still apply.
- The landing light (and shadows) make the ground per-pixel lit again, because it needs that to light the ground.
- **v0.81:** lighter frames on Quest with nothing to set and no visible change: single-pass strip ribbons and rain shafts, a fuel hose that sleeps on its hook, vertex-lit DENSE forest sprites drawn after the scenery, far less per-frame garbage (on foot it's down from about 440 KB to 180 KB a frame), static scenery that doesn't rebuild its matrices, canvas textures uploaded before the eye pass, and no stencil buffer.
- `?nobatch` turns off v0.47's static mesh batching and `?tile=N` turns on v0.47's tiled forest (both for comparing). F3 toggles the desktop FPS counter, Esc / F2 opens the MENU board and ` the old settings list; both have the presets.

## Strips (v0.78.1)
- The strip surfaces are softer in colour (less saturated, a little darker) and their edges fade into the ground instead of ending in a hard line. You can still pick every strip out from about 2 km. The home strip keeps its white threshold bars and aiming blocks.

## Propeller (v0.77.14)
- Stopped or cranking you see the two solid blades. From about 300 rpm a see-through disc fades in. Above 650 rpm only the disc is drawn: a faint grey sweep with two soft streaks, and a faint yellow arc where the painted tips run. You can see through it in VR and on desktop.

## Parking brake (v0.77.11)
- v0.84: it sits on a small black bracket plate hung from the switch strip's lower edge (it used to float in mid-air), and it gets the yellow ring like every other control.
- A black T-handle under the left of the panel. VR: grab it with either hand to pull it out (set); grab it again to push it in (off). Desktop: **\\** toggles it in the seat.
- A red lamp beside it and PARK BRAKE on the status line show it's set. It's off by default and isn't saved.
- It holds both main wheels only with weight on them. In the air it does nothing. A full rudder pedal still frees that side a little (the toe brakes are differential).
