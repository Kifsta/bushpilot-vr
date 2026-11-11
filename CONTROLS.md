# Bush Pilot VR – controls (v0.49.1, blank slate)

v0.45 is just the Super Cub, the valley and the paper map. There is no wind, weather, survival, combat, loot or story. The full game (v0.44) is tag `v0.44-full` and branch `full-game`.

A new game starts **on foot beside the Cub** at the cabin strip. Climb in (Y / F), start her off the checklist card and fly.

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
