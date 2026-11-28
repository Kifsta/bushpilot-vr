// Converts a chosen set of Synty POLYGON Nature FBX models (already run through FBX2glTF -> .glb, see README.md)
// into ONE meshopt-compressed GLB (3 LODs per model, one shared atlas UV space) + a small JSON of sizes.
// usage: node build.mjs <dir with FBX2glTF .glb files> <out dir>
import { NodeIO, Document } from '@gltf-transform/core';
import { EXTMeshoptCompression } from '@gltf-transform/extensions';
import { reorder } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import fs from 'fs';

const [, , IN, OUT] = process.argv;
await MeshoptSimplifier.ready; await MeshoptEncoder.ready; await MeshoptDecoder.ready;

// atlas regions (x, y, w, h in the 2048 x 1024 atlas)
const REG = { pal: [0, 512, 512, 512], pine: [0, 0, 512, 512], generic: [512, 0, 512, 512], dead: [1024, 0, 512, 512], under: [1536, 0, 512, 512], birch: [512, 512, 512, 512], willow: [1024, 512, 512, 512] };
const texFor = (model, mat) => {
  if (/Undergrowth/.test(model)) return 'under';
  if (/Leaves_Dead/.test(mat)) return 'dead';
  if (/Birch/.test(model) && /Trunk/.test(mat)) return 'birch';
  if (/Leave/.test(mat)) return /Pine/.test(model) ? 'pine' : /Willow/.test(model) ? 'willow' : 'generic';
  return 'pal';
};
// category, in-game reach (fraction of the category's base distances), models
const LIST = {
  conifer: ['Tree_Pine_01', 'Tree_Pine_02', 'Tree_Pine_Large_01', 'Tree_Pine_Large_02', 'Tree_Pine_Small_01', 'Tree_PolyPine_01', 'Tree_PolyPine_02', 'Tree_PolyPine_Sparse_01', 'Tree_PolyPine_Sparse_02'],
  broad: ['Tree_01', 'Tree_03', 'Tree_04', 'Tree_Round_02', 'Tree_TallRound_01', 'Tree_Generic_01', 'Tree_Birch_02', 'Tree_Birch_04'],
  dead: ['Tree_Dead_01', 'Tree_Dead_02', 'Tree_Pine_Dead_01'],
  wood: ['Tree_Stump_01', 'Tree_Stump_02', 'Tree_Log_01', 'Tree_Log_02', 'Tree_Branch_01'],
  rock: ['Rock_01', 'Rock_03', 'Rock_Small_01', 'Rock_Rounded_01', 'Rock_Boulder_01', 'Rock_Pile_02', 'Rock_Pile_04', 'Rock_Pile_05', 'Rock_Cluster_Large_01', 'Rock_Cluster_Large_04', 'Rock_Cluster_Large_05'],
  plant: ['Plant_Bush_01', 'Plant_Bush_02', 'Plant_Bush_03', 'Plant_Fern_02', 'Plant_Fern_03', 'Plant_Grass_02', 'Plant_Grass_03', 'Plant_01', 'Plant_06', 'Plant_Undergrowth_01', 'Plant_Reeds_01', 'Plant_Hedge_Bush_01'],
  prop: ['Prop_Fence_01', 'Prop_Fence_02', 'Prop_StoneWall_01', 'Prop_StoneWall_02', 'Prop_StoneWall_03', 'Prop_CampFire_01', 'Prop_Chest_Wood_01', 'Prop_RoadSign_01', 'Terrain_Rubble_Pebbles_01', 'Terrain_Rubble_Pebbles_02', 'Prop_TorchStick_01'],
};
const LODS = [{ keep: 1, err: 0 }, { keep: 0.38, err: 0.04 }, { keep: 0.12, err: 0.12 }];
const io = new NodeIO().registerExtensions([EXTMeshoptCompression]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const doc = new Document(); const buf = doc.createBuffer(); const scene = doc.createScene('s');
const meta = {};
const qk = v => Math.round(v * 20000);
for (const [cat, names] of Object.entries(LIST)) for (const short of names) {
  const name = 'SM_' + short; const src = await io.read(`${IN}/${name}.glb`);
  const P = [], U = [], I = []; let leaf = 0, base = 0; const used = new Set();
  for (const node of src.getRoot().listNodes()) { const m = node.getMesh(); if (!m) continue; const W = node.getWorldMatrix();
    for (const prim of m.listPrimitives()) {
      const pos = prim.getAttribute('POSITION'), uv = prim.getAttribute('TEXCOORD_0'), ix = prim.getIndices(), key = texFor(name, prim.getMaterial()?.getName() || ''); used.add(key); if (key !== 'pal') leaf = 1;
      const [rx, ry, rw, rh] = REG[key], n = pos.getCount(), v = [0, 0, 0];
      for (let i = 0; i < n; i++) { pos.getElement(i, v); const x = W[0] * v[0] + W[4] * v[1] + W[8] * v[2] + W[12], y = W[1] * v[0] + W[5] * v[1] + W[9] * v[2] + W[13], z = W[2] * v[0] + W[6] * v[1] + W[10] * v[2] + W[14]; P.push(x, y, z);
        const t = [0, 0]; uv.getElement(i, t); const uu = key === 'pal' ? Math.min(0.999, Math.max(0.001, t[0])) : Math.min(1, Math.max(0, t[0])), vv = key === 'pal' ? Math.min(0.999, Math.max(0.001, t[1])) : Math.min(1, Math.max(0, t[1]));
        U.push((rx + uu * rw) / 2048, (ry + vv * rh) / 1024); }
      for (let i = 0; i < ix.getCount(); i++) I.push(ix.getScalar(i) + base); base += n; } }
  // weld identical (position, uv) vertices
  const mp = new Map(), remap = new Uint32Array(P.length / 3), wp = [], wu = [];
  for (let i = 0; i < P.length / 3; i++) { const k = qk(P[i * 3]) + ',' + qk(P[i * 3 + 1]) + ',' + qk(P[i * 3 + 2]) + ',' + qk(U[i * 2]) + ',' + qk(U[i * 2 + 1]); let j = mp.get(k); if (j === undefined) { j = wp.length / 3; mp.set(k, j); wp.push(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]); wu.push(U[i * 2], U[i * 2 + 1]); } remap[i] = j; }
  let idx = Uint32Array.from(I, i => remap[i]); const pos = Float32Array.from(wp), uvs = Float32Array.from(wu);
  let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9]; for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], pos[i + k]); mx[k] = Math.max(mx[k], pos[i + k]); }
  const tris = [];
  LODS.forEach((L, li) => {
    let ind = idx;
    if (li > 0) { const target = Math.max(36, Math.floor(idx.length * L.keep / 3) * 3);
      if (target < idx.length) { const w = [1.2, 1.2]; const [r] = MeshoptSimplifier.simplifyWithAttributes(idx, pos, 3, uvs, 2, w, null, target, L.err, ['LockBorder'].slice(0, 0)); ind = r; } }
    const vm = new Map(), np = [], nu = [], ni = new Uint32Array(ind.length);
    for (let i = 0; i < ind.length; i++) { const o = ind[i]; let j = vm.get(o); if (j === undefined) { j = np.length / 3; vm.set(o, j); np.push(pos[o * 3], pos[o * 3 + 1], pos[o * 3 + 2]); nu.push(uvs[o * 2], uvs[o * 2 + 1]); } ni[i] = j; }
    const prim = doc.createPrimitive();
    prim.setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(Float32Array.from(np)).setBuffer(buf));
    prim.setAttribute('TEXCOORD_0', doc.createAccessor().setType('VEC2').setArray(Float32Array.from(nu)).setBuffer(buf));
    prim.setIndices(doc.createAccessor().setType('SCALAR').setArray(np.length / 3 < 65535 ? Uint16Array.from(ni) : ni).setBuffer(buf));
    const mesh = doc.createMesh(`${name}_L${li}`).addPrimitive(prim); scene.addChild(doc.createNode(`${name}_L${li}`).setMesh(mesh)); tris.push(ni.length / 3); });
  meta[name] = { cat, h: +(mx[1]).toFixed(2), y0: +mn[1].toFixed(2), r: +(Math.max(mx[0] - mn[0], mx[2] - mn[2]) / 2).toFixed(2), leaf, tris };
}
await doc.transform(reorder({ encoder: MeshoptEncoder, target: 'size' }));   // float positions / uvs stay un-quantized (the loader needs no node transform); meshopt still packs them
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.FILTER });
fs.mkdirSync(OUT, { recursive: true });
await io.write(`${OUT}/synty-nature.glb`, doc); fs.writeFileSync(`${OUT}/synty-meta.json`, JSON.stringify(meta));
console.log(Object.keys(meta).length, 'models', fs.statSync(`${OUT}/synty-nature.glb`).size, 'bytes');
for (const [k, v] of Object.entries(meta)) console.log(k.padEnd(30), v.cat, 'h', v.h, 'r', v.r, 'tris', v.tris.join('/'));
