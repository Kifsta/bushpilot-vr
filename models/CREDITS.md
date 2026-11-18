# 3D model credits

Every third-party model in the game is CC0 (public domain). Models are not shipped as files: their triangles are baked into `index.html` (vertex colours, no textures), so nothing here is executable and nothing is loaded at run time.

| Used for | Source model | Pack / author | Licence | Where it came from | Changes |
|---|---|---|---|---|---|
| The swag, rolled (strapped under the pack, carried) – v1.12.0 | `bedroll-packed.glb` (124 triangles) | **Survival Kit 2.0** by Kenney (www.kenney.nl), created 03-04-2024 | **CC0 1.0** (creativecommons.org/publicdomain/zero/1.0/; the pack's License.txt) | https://kenney.nl/assets/survival-kit (official site, "Continue without donating" download) | The colormap texture sampled into vertex colours, recoloured to the game's canvas green and leather straps (shading kept), scaled to the swag's 0.44 x 0.15 m roll so the Pose Lab grips are unchanged |
| The swag, rolled out (your camp) – v1.12.0 | `bedroll.glb` (144 triangles) | same | **CC0 1.0** | same | Recoloured to canvas green with a cream lining and pillow, scaled to 0.72 x 1.92 m, pillow end at -z |
| The flashlight (torch) – v1.12.0 | "Torch" (610 triangles) | **Quaternius** (quaternius.com), on Poly Pizza | **CC0 1.0** (stated on the model page) | https://poly.pizza/m/WGsvr4KOZd | Material colours baked to vertex colours, the lens set to the game's warm 0xf0e8b0, scaled to the game flashlight's 0.048 x 0.17 m (lens end +y) so the grip and the beam origin are unchanged |
| The first aid kit – v1.12.0 | "First Aid Kit" (268 triangles) | **Quaternius**, on Poly Pizza | **CC0 1.0** | https://poly.pizza/m/Hp80p6148W | Colours baked, white / red set to the game's, scaled to the kit's 0.16 x 0.11 x 0.072 m |
| Townsfolk – v1.13.0 | Farmer, Worker, and Casual Character from **Ultimate Modular Men Pack** (February 2022) | **Quaternius** (quaternius.com) | **CC0 1.0** (stated on the official pack page and on each Poly Pizza model page; the later site-wide Quaternius Asset License is not retroactive) | Official pack: https://quaternius.com (Ultimate Modular Men). Poly Pizza: Farmer https://poly.pizza/m/7pn3R6hPvE, Worker https://poly.pizza/m/Yg2bQZO6Hj, Casual Character https://poly.pizza/m/kZ3DmIoGip | Each outfit merged to one skinned mesh; materials baked to vertex colours and recoloured to the game's FOLK palettes (1950s bush work clothes; the Worker's vest muted off hi-vis; Casual sneakers darkened to shoes). Shared ITEM_VM skinned Lambert. Idle / Walk / Wave clips from the pack; the sitting clips (bench, stretcher, the Cub's rear seat, each with a seated wave) are authored in the page from the same skeleton with leg and arm IK. |

Credit is not required by CC0; it is given anyway. Thank you, Kenney and Quaternius.

The townsfolk are an exception to the "no run-time files" rule above. Skeleton, three animation clips and three merged meshes are packed into `assets/npc/folk.bin` (~648 KB, int16 positions, uint8 weights and region ids) and fetched the same way as the deer GLBs (`assets/animals/Deer.glb`, `Stag.glb`). Pack-item meshes stay baked into `index.html`. If the fetch fails, the original box townsfolk are kept. At load every clip is baked to a 30 fps pose table and played back without three's AnimationMixer (no per-frame garbage), only for visible / near figures (culled at 200 m) and throttled with distance; the skinned program is prewarmed so it does not compile when you first walk up.

Budget: about 140 KB of baked geometry in index.html in all (under the 1.5 MB cap). Every model goes into the existing pack-item batches (one material, vertex colours), so there are no new draws, textures or shader programs. The hand and falling batches hold 2000 vertices (was 1200), and the rig and belt batches 4500 (was 3000), to fit the flashlight.

## Looked at and not used (v1.12.0)

- **Kenney Survival Kit:** the box (parcel), bottle and bucket are no better than the game's parcels, canteen and tins.
- **Poly Pizza (CC0 only), searched for every listed item:**
  - KayKit "Lantern" (Kay Lousberg, CC0, 264 triangles): the home lanterns' glowing glass is part of the v1.11.18 night-light system, so swapping the mesh would mean re-doing that. Left for later.
  - Knives (Quaternius "Knife", CreativeTrio "Hunters Knife"): bare blades, while the game's pack knife is sheathed. Not swapped.
  - Books (Quaternius): no better than the field guide.
  - Toolbox (CreativeTrio): no better than the tackle box.
  - Canteen, food tins, camera and crates: nothing on Poly Pizza beat the game's own meshes.
- **The rifle** keeps its current model, which is tuned to the sight line, the stock zone and the Pose Lab holds.
- **Not fetched:** the KayKit and Quaternius sites themselves (their packs are zip downloads behind itch.io / Google Drive pages) and OpenGameArt. Their Poly Pizza uploads were covered.
