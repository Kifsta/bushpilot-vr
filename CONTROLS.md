# Bush Pilot VR – controls

## Flying
| | VR (Quest) | Desktop |
|---|---|---|
| Stick (pitch / roll) | Put your right hand on the stick and squeeze (the glove locks on it), move your hand | W / S pitch, A / D roll (click to mouse-look) |
| Rudder | Left stick left / right | Q / E |
| Throttle | Left hand on the throttle knob (left wall), squeeze, push / pull | Shift / Ctrl (or = / -) |
| Flaps (0-15-30-50) | Grab the flap handle (left wall, by your hip) and pull it up / push it down through the notches (click + buzz per notch) | [ and ] |
| Brakes | Left trigger | B |
| Get out (stopped, idle) | Y | F |
| Landing light | Flick the toggle under the panel up / down with your fingertip (or squeeze it) | L |
| Reset / recentre | B = reset (refuels), A / X = recentre | R reset, Home recentre |

## Engine start / shutdown (v0.19: the plane starts cold and dark)
| | VR (Quest) | Desktop |
|---|---|---|
| Fuel valve ON / OFF | Grab the red lever (switch strip under the left of the panel) and twist a quarter turn | U |
| Master ON / OFF | Push the half of the red rocker that sticks out with your fingertip | O |
| Mixture RICH (in) / CUTOFF (out) | Grab the red knob and pull it out / push it in | Y |
| Carb heat COLD (in) / HOT (out) | Grab the black knob and pull it out / push it in | H |
| Primer | Grab the chrome T-handle, pull it all the way out and push it back in (one shot per stroke) | P |
| Mags OFF > R > L > BOTH | Grab the key and twist clockwise / back (click + buzz per position) | I |
| Starter | Press and hold the red START button with your fingertip (or squeeze and hold it) | Hold Space |
| Checklist card | Squeeze it (under the right of the panel); let go to put it back | J |

v0.23 hands (VTOL VR style, no laser): your hands are gloves. Squeeze with the trigger off = point the index finger; trigger curls it; thumb off the buttons lifts the thumb. A yellow ring shows what your hand will work. Squeezing a control and letting go without moving it still does the old one-step toggle. Quest hand tracking (no controllers) shows tracked gloves and pokes switches with your index tip.

v0.24 haptics: you feel the engine (rpm, rough running, cranking), stall buffet, touchdowns, bumps and skids through the stick and throttle; the rifle shot, lever, loading and misfires; grabs, stowing, page turns and crafting; zombie hits, knife hits, landings and a heartbeat when hurt. Strength: poke the HAPTICS button on the field guide's GUIDE page (Off / 35% / 65% / 100%), or add `?hx=0.5` to the URL.

v0.24.1 grip on the ring: point your fingertip at a switch or knob, and a yellow ring appears on it (one ring per hand). Squeeze grip to use it. Toggles flip, START cranks while you hold grip, the mags key and fuel valve turn when you twist your wrist, and push-pull knobs follow your hand in and out. Window handles and the checklist drag. Poking with the fingertip still works. The stick, throttle and flap lever only take the grip when your hand is on them. With the rifle shouldered, your gloves stay clear of the iron sights.

v0.25 cargo + weight and balance:
- Load: hold loot over the rear seat, the rear floor or the baggage bay (behind the rear seat) and let go. Grab it again to take it out.
- Strap: grip the lap belt or the cargo net (yellow ring) to strap or unstrap. Loose cargo slides in hard braking and bounces on hard landings.
- Desktop, near the plane: `.` load, `,` unload, `/` strap or unstrap.
- The live W&B card is on the right cabin wall. The field guide has a "Loading the Cub" page.

Start: fuel ON, master ON, mixture RICH, carb heat COLD, prime 2–3 strokes (cold) or 0–1 (warm), throttle cracked (~10%), mags BOTH, hold the starter until it runs (~700 rpm).
Flooded? Throttle full and crank, then pull the throttle back when it fires.
Shutdown: throttle idle, mixture CUTOFF (it stops), mags OFF, master OFF, fuel OFF.

## On the ground (v0.20: gear and tyre physics)
- The tail wheel steers with the rudder (about 17° each way, so a full-rudder taxi turn is about 10 m across). Hold the stick back when taxiing so the tail stays planted.
- Brakes work through the tyres. Brakes alone slow both wheels. Brakes with rudder brake only that side's wheel. Add a burst of power (about half) for a tight pivot: the tail wheel unlocks and castors, then re-locks when you straighten out.
- Full brakes with the stick forward (or neutral) at speed will tip it onto its nose. Keep the stick back.
- Use right rudder on the takeoff roll. With no rudder it swings left and can ground-loop, as a real Cub does. Crosswinds push the tail round, so steer into it.
- Grip: the strip is best. Grass, the paddock and rough ground roll slower and are bumpier (felt through the seat at taxi speed).

## Windows and door (v0.19)
| | VR | Desktop |
|---|---|---|
| Right upper window (latches under the wing) | Grab its handle, swing it out and up | 1 |
| Right lower door half (folds down) | Grab its handle, push it out | 2 |
| Left front / rear window (slide aft) | Grab the handle and drag | 3 / 4 |

## On foot
| | VR | Desktop |
|---|---|---|
| Walk / sprint | Left stick, click it to sprint (uses stamina) | WASD, Shift sprint |
| Turn | Right stick left / right (snap) | Mouse |
| Crouch / jump | Right stick down / up | Hold C / Space |
| Get back in the plane | Y | F |
| Pick up / hold | Grip | G (looks at item) |
| Force-pull an item 0.5–8 m away | Point an empty hand at it (it glows), squeeze grip, flick your hand back, keep grip held to catch | Hold G while looking at it |
| Eat / drink / heal | Hold it to your mouth | E |
| Pack | Reach over a shoulder, pull it round; drop items in, grip the minis to take out; push it back to wear | I |

## Rifle
- Grab it from the sling over your right shoulder (desktop G or 4). Trigger fires (desktop click). Other hand on the forend steadies it; raise it to your cheek for the stock.
- Lever: A / X on the rifle hand, flick the rifle, or grab the loop (desktop X). A lever left open won't fire; a short stroke won't feed.
- Reload: grip the ammo pouch on your right hip for a round, touch its tip to the loading gate on the right side (desktop Z or R).
- Grip angle: hold the right stick in and push it up / down.
- After ~60 shots it can misfire; hold a cleaning kit against it for a moment (desktop E).

## Knife, map, light
- Knife on the left hip (desktop 1, then click or V). Slice a kill 3 times, or hold grip on it with the knife in the other hand, to get meat.

## Melee (v0.26)
- **Knife**: a hit depends on how fast and which way the blade moves. Swing it fast (over ~2 m/s) for a **slash**: damage grows with speed and is much bigger on the head. Thrust it point-first for a **stab**: head or chest = kill, hips and legs hurt. A stab **sticks**: the knife rides in the body (and falls with it), so pull your hand back ~16 cm to free it, or let go.
- **Hatchet / fire axe**: found in each town (feed store / gas station) and at a few points of interest. Hold it like the knife and swing hard: big damage, a head chop kills, a hard body chop knocks them flat. Chop a tree trunk 3 times to drop a bundle of **sticks**. Desktop: V chops what you're looking at (zombie or tree) while it's in your pack and the knife is away.
- **Butt-stroke**: with the rifle in your hand, swing the stock end fast into a zombie (desktop: V with the rifle up). A blow to the head knocks it down.
- **Shove**: push an empty hand hard straight out at a zombie's body (desktop Q). It costs 20 stamina and staggers it back. Shove a staggered zombie again and it goes down. When you're tired, the shove is weak.
- **Reactions**: zombies flinch at small hits. Strong hits stagger them and knock them back. Knocked-down zombies fall flat, then get back up after about 3 s. Dead ones fall with their arms flung out.
- **Grabs**: stay within arm's reach of a zombie for about 0.8 s and it grabs you. You move at 15% speed and take more damage. Break free with a shove or a solid stab or hit.
- You feel every hit through the controllers, each hit has its own sound, and blood or wood chips fly.
- Map: pocket on the left side of the pack (desktop M). Grab the far edge with the other hand to open it. In the plane it rides in the holder on the left cockpit wall (the same map; it moves there when you board and back to the pack when you get out).
- Torch on the left hip: hold it and pull the trigger (desktop L). The lantern stays at the cabin and needs lamp oil.

## Item models (v0.27)
Nothing to learn: the knife, hatchet, fuel can, medkit, bandages, water jug, torch, pot and campfires now use real models but are picked up, worn, packed and used exactly as before. The radios, compasses, batteries, cans and matchboxes on town shop counters are decoration.

## Animals (v0.28)
- **Deer and stags** graze in herds of 4–5 (one stag each). **Foxes** roam the open country. All of them bolt when they see or hear you: standing up you're spotted at ~30 m (deer) / ~22 m (fox), sprinting doubles that, crouching halves it, and a rise in the ground between you hides you. Gunshots and the plane scatter them too.
- **Wolves** live in packs of 2–4 at dens in the woods (450–1700 m from the cabin). By day they lie up and only come for you if you walk right up to them; at dusk and at night they roam and will pick you up at ~120 m (closer if you crouch), fan out and bite (−7 health a bite, with a buzz). A shot at night draws them; by day it scares them off. Shoot them, stab or slash them with the knife, or chop with the hatchet. Kill half the pack and the rest run. They leave you alone once you're in the plane.
- **Farm animals** (cows, a bull, horses, donkeys) stand round the farms and the ranch. They never attack; they're just meat if you need it.
- Aim small: a head or heart/lung (behind the front leg) hit kills outright; a body hit only wounds (deer 2, stag 3, wolf 2, fox 1, cattle 4–5 body hits).
- Dress a carcass as before (hold grip on it with the knife in the other hand, or slice it). Meat: deer 3, stag 4, fox 1, cow/bull 6, horse 5, donkey 4. Wolves give a **WOLF PELT** (3 lb) instead of meat.

## Bow (v0.29)
| | VR | Desktop |
|---|---|---|
| Take / stow the bow | Grip it over your LEFT shoulder (or from the pack); let go near the shoulder slot (green box) to put it back | 5 |
| Get an arrow | Reach over your RIGHT shoulder to the quiver and grip, or just grab the string near the nock point and one nocks itself | automatic |
| Nock an arrow in your hand | Bring its back end to the string (within ~12 cm) | – |
| Draw | Keep grip on the string and pull it back toward your face (up to ~70 cm = full power, 60 m/s) | Hold left click (full in ~0.9 s) |
| Loose | Let go of grip on the string hand | Release the button |
| Pick an arrow back up | Grab it where it's stuck (zombie, animal, tree, ground, wall) | G while looking at it |
- Arrows drop with range, so aim a little high far out. There's no sight. A dry fire (drawing with no arrow and letting go) snaps the string.
- Silent: zombies and animals don't hear it. A strong headshot kills a zombie; a body hit staggers it. A strong heart/lung hit kills a deer; wolves take 1–2 good hits.
- The bow is at the lodge. Arrow bundles (6) are at the hunting cabin, ranch and lookout; craft 3 from 2 sticks + 1 cloth in the field guide (Gun tab). The quiver holds 24.
- Arrows can break on rock (often), wood (sometimes) or the ground (rarely).

## Survival
- Watch on the left wrist: time (amber = sunset soon), health, food, water (blue) and stamina (white).
- Be home before dark: zombies get faster and bolder and respawn at night. Sleep after 17:30 by gripping the cabin door handle (desktop N at the door).
- Water: canteen on the right hip. Fill at the rain barrel (clean) or a river or lake (raw: boil it at the fire pit pot, or carry a water filter). Desktop E fills, boils and drinks.
- Food: raw meat over a fire cooks it. Food spoils (raw ~2 days, cooked ~3, smoked ~10); spoiled food makes you sick.
- Fuel: hold the fuel can to the wing filler cap (desktop E).
- Towns (v0.22): Cutler (south), Dry Fork (east, with a grass strip you can land on) and Hollis (north) are on the map. Walk in through the doors; the loot is on shelves and counters. Expect zombies inside, and more after dark.
- Water jug: hold it to your mouth (desktop E) for +40 water. Lamp oil bottles refill the cabin lantern through the field guide's lamp-oil recipe.

## Crafting (v0.21: field guide; v0.21.1: right pack pocket)
- Sticks, stones, cloth, wire, nails, boards and charcoal go into a pouch when you grab them.
- The field guide is in the side pocket on the RIGHT of your backpack (the map is in the matching pocket on the left): reach back past your right hip and grab it. There's also a copy on the workbench (cabin, south wall). Grab it to open it; let go at the pocket to put it back.
- Turn pages: pinch the page corner and swipe, flick the book hand's thumbstick, or poke a tab on the edge.
- Recipe page: green numbers mean you have enough, red means you're short. Poke CRAFT with your other hand, or pull the trigger of the book hand.
- Bench recipes need you within 2 m of the workbench. There, a ghost of the item floats over the bench; grab it to craft it into your hand.
- Desktop (on foot): B or K opens the book, ←/→ turn pages, ↑/↓ change section, Enter crafts, Esc closes, 1–0 quick-craft.
- Put a campfire kit, snare or spike trap on the ground to set it (desktop P drops it 1.5 m ahead). Snares catch meat after a few minutes; spike traps kill zombies that step on them.
