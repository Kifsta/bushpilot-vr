// ======================================================================================================================
// synty.js - the SYNTY NATURE prototype (branch synty-prototype only). Licensed Synty POLYGON Nature models (assets/synty/*),
// drawn as instanced meshes with 3 real LODs + a baked impostor level, all crossfaded with a screen-door dither (no pop-in).
//   - one atlas texture, 2 Lambert programs (solid / leaf cards) + 1 impostor program; draw calls = species x LOD in range + 1
//   - population: a streamed 128 m cell grid (deterministic hash, own RNG - the world's rand() stream is untouched)
//   - far forest: the impostor level (baked from the Synty models at load) out to ~5 km, thinned smoothly with distance
//   - the old 3D / 2D trees, bushes + rocks are hidden while 'Synty nature' is ON (Graphics > Synty nature)
// ======================================================================================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const CS = 128, CELL_R = CS * 0.7072;
const IMP_R = 5200;                       // impostor reach (m) at draw distance NORMAL
const NTREE = 340;                        // tree candidates per cell (max density 0.0079 / m2 before the forest mask)
const LOD_B = [5, 11, 24];                // switch distances = this x the object's size (m), clamped below
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// species: [model, weight, min height (m), max height (m)]  (trees are scaled to a real-world height); others [model, weight, min scale, max scale]
const SP = {
  conifer: [['Tree_Pine_01', 3, 13, 24], ['Tree_Pine_02', 2, 11, 20], ['Tree_Pine_Large_02', 3, 16, 28], ['Tree_Pine_Small_01', 2, 8, 14], ['Tree_PolyPine_01', 3, 14, 26], ['Tree_PolyPine_Sparse_01', 2, 16, 28]],
  broad: [['Tree_01', 3, 9, 16], ['Tree_03', 2, 9, 15], ['Tree_04', 2, 7, 12], ['Tree_TallRound_01', 2, 10, 17], ['Tree_Generic_01', 2, 8, 14], ['Tree_Birch_02', 2, 9, 15]],
  dead: [['Tree_Dead_01', 3, 5, 9], ['Tree_Pine_Dead_01', 3, 10, 18], ['Tree_Dead_02', 1, 4, 7]],
  floor: [['Tree_Stump_01', 2, 1.5, 3], ['Tree_Stump_02', 1, 1, 1.8], ['Tree_Log_01', 2, 1.3, 2.4], ['Tree_Log_02', 2, 1.3, 2.4], ['Tree_Branch_01', 2, 1.4, 2.6]],
  rockS: [['Rock_01', 3, 5, 12], ['Rock_03', 3, 4, 9], ['Rock_Small_01', 3, 2.5, 5], ['Rock_Rounded_01', 3, 2.5, 5], ['Rock_Boulder_01', 2, 1.5, 3.6]],
  rockM: [['Rock_Pile_02', 3, 1.2, 2.4], ['Rock_Pile_04', 3, 1.2, 2.4], ['Rock_Boulder_01', 2, 2.5, 4.5]],
  rockL: [['Rock_Pile_05', 3, 1.1, 2.2], ['Rock_Cluster_Large_01', 2, 0.8, 1.6], ['Rock_Cluster_Large_04', 2, 0.8, 1.5], ['Rock_Cluster_Large_05', 2, 0.8, 1.4]],
  bush: [['Plant_Bush_01', 3, 0.8, 1.5], ['Plant_Bush_02', 3, 0.8, 1.5], ['Plant_Bush_03', 3, 0.8, 1.4], ['Plant_Hedge_Bush_01', 1, 0.9, 1.5]],
  fern: [['Plant_Fern_02', 3, 2, 3.5], ['Plant_Fern_03', 3, 2.5, 4], ['Plant_Undergrowth_01', 3, 2.5, 4], ['Plant_01', 2, 1.6, 3], ['Plant_06', 1, 1.2, 2.2]],
  grass: [['Plant_Grass_02', 3, 1.5, 2.8], ['Plant_Grass_03', 3, 2, 3.5], ['Plant_Reeds_01', 1, 1.3, 2.2]],
};

export async function initSynty(C) {
  const { scene, camera, renderer, GFX, SYN } = C, base = C.base || './assets/synty/';
  const t0 = performance.now();
  // ---------------- assets ----------------
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const [gltf, meta, atlasImg] = await Promise.all([loader.loadAsync(base + 'synty-nature.glb'), fetch(base + 'synty-meta.json').then(r => r.json()),
    new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = base + 'synty-atlas.webp'; })]);
  const atlas = new THREE.Texture(atlasImg); atlas.flipY = false; atlas.colorSpace = THREE.SRGBColorSpace; atlas.anisotropy = 8; atlas.generateMipmaps = true; atlas.minFilter = THREE.LinearMipmapLinearFilter; atlas.magFilter = THREE.LinearFilter; atlas.needsUpdate = true;
  const names = Object.keys(meta).sort(), NM = names.length, mid = {}; names.forEach((n, i) => mid[n.replace(/^SM_/, '')] = i);
  const geoOf = {}; gltf.scene.traverse(o => { if (o.isMesh) geoOf[o.name] = o.geometry; });
  const IMPOK = new Float32Array(128), MSZ = new Float32Array(128), IW = new Float32Array(128), IH = new Float32Array(128), IY0 = new Float32Array(128), ICELL = new Float32Array(128), MH = new Float32Array(128);
  const IMPCAT = new Set(['conifer', 'broad', 'dead']);
  names.forEach((n, i) => { const m = meta[n], big = m.cat === 'rock' && Math.max(m.h, m.r * 2) >= 5; MSZ[i] = Math.max(m.h - m.y0, m.r * 2, 0.2); MH[i] = m.h; IMPOK[i] = (IMPCAT.has(m.cat) || big) ? 1 : 0;
    IW[i] = m.r * 2 * 1.08; IH[i] = (m.h - m.y0) * 1.06; IY0[i] = m.y0 - 0.02 * (m.h - m.y0); });
  { let k = 0; for (let i = 0; i < NM; i++) if (IMPOK[i]) ICELL[i] = (k++) * 2; }

  // ---------------- shader pieces shared by the LOD meshes + the impostor ----------------
  const U = { uHead: { value: new THREE.Vector3() }, uReach: { value: 1 }, uMS: { value: MSZ }, uImpOK: { value: IMPOK }, uTint: { value: 0.5 } };
  const VHEAD = `
attribute vec4 iA; attribute vec4 iB;
uniform vec3 uHead; uniform float uReach; uniform float uLodI; uniform float uMS[128]; uniform float uImpOK[128];
varying vec2 vKeep; varying float vTn;
float synQ(float d) { return d < 1500.0 ? 1.0 : max(0.12, pow(1500.0 / d, 1.6)); }
void synBands(out float lo, out float hi, float sc) {
  int m = int(iB.z + 0.5); float S = uMS[m] * sc; vec3 dv = iA.xyz - uHead; float d = length(dv) / uReach; float j = 0.9 + 0.2 * iB.y;
  float b0 = clamp(S * ${LOD_B[0]}.0, 14.0, 130.0) * j, b1 = clamp(S * ${LOD_B[1]}.0, 34.0, 280.0) * j, b2 = clamp(S * ${LOD_B[2]}.0, 80.0, 560.0) * j;
  float s0 = smoothstep(b0 * 0.8, b0 * 1.2, d), s1 = smoothstep(b1 * 0.84, b1 * 1.16, d), s2 = smoothstep(b2 * 0.88, b2 * 1.12, d);
  float a0 = 1.0 - s0, a1 = s0 * (1.0 - s1), a2 = s1 * (1.0 - s2), ai = s2 * uImpOK[m];
  float q = synQ(d); ai *= clamp((q - iB.y) / 0.06, 0.0, 1.0);
  if (uLodI < 0.5) { lo = 0.0; hi = a0; } else if (uLodI < 1.5) { lo = a0; hi = a0 + a1; } else if (uLodI < 2.5) { lo = a0 + a1; hi = a0 + a1 + a2; } else { lo = 1.0 - ai; hi = 1.0; if (ai <= 0.0) hi = 0.0; }
  vTn = iB.w;
}
`;
  const CULL = `if (vKeep.y - vKeep.x < 0.004) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);`;
  const FDITH = `
varying vec2 vKeep; varying float vTn;
float synDn() { return fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))); }
`;
  const FKEEP = `{ float dn = synDn(); if (dn < vKeep.x || dn >= vKeep.y) discard; }`;
  const TINT = `{ float t = vTn * 2.0 - 1.0; diffuseColor.rgb *= vec3(1.0 + 0.16 * t, 1.0 + 0.03 * t, 1.0 - 0.2 * t) * (1.0 - 0.1 * abs(t)); }`;

  // vertex pulling: ONE draw per (LOD, size class) renders every species in it - each instance reads its species' triangles from a float texture (gl_VertexID)
  const GW = 2048, OFFS = new Float32Array(NM * 3), CNTS = new Float32Array(NM * 3);
  const geoTex = (() => { let tot = 0; names.forEach((n, i) => { for (let l = 0; l < 3; l++) { const g = geoOf[n + '_L' + l]; OFFS[i * 3 + l] = tot; CNTS[i * 3 + l] = g.index.count; tot += g.index.count; } });
    const rows = Math.ceil(tot * 2 / GW), d = new Float32Array(GW * rows * 4);
    names.forEach((n, i) => { for (let l = 0; l < 3; l++) { const g = geoOf[n + '_L' + l], ix = g.index.array, P = g.attributes.position.array, T = g.attributes.uv.array, o = OFFS[i * 3 + l];
      for (let k = 0; k < ix.length; k++) { const v = ix[k], t = (o + k) * 2 * 4; d[t] = P[v * 3]; d[t + 1] = P[v * 3 + 1]; d[t + 2] = P[v * 3 + 2]; d[t + 3] = T[v * 2]; d[t + 4] = T[v * 2 + 1]; } } });
    const tx = new THREE.DataTexture(d, GW, rows, THREE.RGBAFormat, THREE.FloatType); tx.minFilter = tx.magFilter = THREE.NearestFilter; tx.generateMipmaps = false; tx.flipY = false; tx.needsUpdate = true; return tx; })();
  const mkMat = (kind, lodI) => {
    const imp = kind === 'imp', m = new THREE.MeshLambertMaterial({ map: imp ? null : atlas, flatShading: !imp, side: THREE.DoubleSide, alphaTest: 0.5 });
    if (GFX.msaa) m.alphaToCoverage = true;
    m.userData.synty = 1;
    m.onBeforeCompile = sh => {
      sh.uniforms.uHead = U.uHead; sh.uniforms.uReach = U.uReach; sh.uniforms.uMS = U.uMS; sh.uniforms.uImpOK = U.uImpOK; sh.uniforms.uLodI = { value: lodI };
      if (imp) { sh.uniforms.uIW = { value: IW }; sh.uniforms.uIH = { value: IH }; sh.uniforms.uIY0 = { value: IY0 }; sh.uniforms.uICell = { value: ICELL }; sh.uniforms.impMap = { value: SYN.impTex }; }
      else { sh.uniforms.uGeo = { value: geoTex }; sh.uniforms.uOff = { value: OFFS }; sh.uniforms.uCnt = { value: CNTS }; }
      sh.vertexShader = VHEAD + (imp ? `attribute float aSide; uniform float uIW[128]; uniform float uIH[128]; uniform float uIY0[128]; uniform float uICell[128]; varying vec2 vIu;\n` : 'uniform sampler2D uGeo; uniform float uOff[192]; uniform float uCnt[192];\n') + sh.vertexShader
        .replace('#include <begin_vertex>', imp ? `
        int mi = int(iB.z + 0.5); float sc = iA.w; float cr = cos(iB.x), sr = sin(iB.x);
        float px = position.x * uIW[mi] * sc, py = uIY0[mi] * sc + position.y * uIH[mi] * sc; float lx = aSide > 0.5 ? 0.0 : px, lz = aSide > 0.5 ? -px : 0.0;
        vec3 transformed = vec3(lx * cr + lz * sr, py, -lx * sr + lz * cr) + iA.xyz;
        { float cell = uICell[mi] + aSide; float cx = mod(cell, 16.0), cy = floor(cell / 16.0); vIu = vec2((cx * 128.0 + 3.0 + (position.x + 0.5) * 122.0) / 2048.0, (cy * 128.0 + 3.0 + position.y * 122.0) / 1024.0); }
        synBands(vKeep.x, vKeep.y, sc);` : `
        float sc = iA.w; float cr = cos(iB.x), sr = sin(iB.x); int mi = int(iB.z + 0.5); int slot = mi * 3 + int(uLodI + 0.5); int vid = gl_VertexID;
        vec3 transformed = vec3(0.0); synBands(vKeep.x, vKeep.y, sc);
        if (float(vid) >= uCnt[slot]) vKeep.y = vKeep.x; else { int ti = (int(uOff[slot]) + vid) * 2; vec4 ga = texelFetch(uGeo, ivec2(ti & ${GW - 1}, ti >> 11), 0), gb = texelFetch(uGeo, ivec2((ti + 1) & ${GW - 1}, (ti + 1) >> 11), 0);
          transformed = vec3(ga.x * cr + ga.z * sr, ga.y, -ga.x * sr + ga.z * cr) * sc + iA.xyz; vMapUv = vec2(ga.w, gb.x); }`)
        .replace('#include <beginnormal_vertex>', imp ? 'vec3 objectNormal = vec3(0.0, 1.0, 0.0);' : '#include <beginnormal_vertex>')
        .replace('#include <project_vertex>', '#include <project_vertex>\n' + CULL);
      sh.fragmentShader = FDITH + (imp ? 'varying vec2 vIu; uniform sampler2D impMap;\n' : '') + sh.fragmentShader
        .replace('#include <alphatest_fragment>', FKEEP + '\n#include <alphatest_fragment>')
        .replace(imp ? '#include <map_fragment>' : '#include <color_fragment>', imp ? `{ vec4 tc = texture2D(impMap, vIu); tc.rgb *= tc.rgb * 1.9; diffuseColor *= tc; ${TINT} }` : '#include <color_fragment>\n' + TINT);
    };
    m.customProgramCacheKey = () => 'syn-' + kind + (GFX.msaa ? 'a' : '');
    return m;
  };
  const MATS = [0, 1, 2].map(l => mkMat('lod', l));
  const CLS = [[200, 500, 1000, 1e9], [60, 120, 300, 1e9], [24, 48, 100, 1e9]];   // size classes (triangles) per LOD: one draw call each
  const BK = []; const bkOf = Array.from({ length: NM }, () => [0, 0, 0]);
  for (let l = 0; l < 3; l++) for (let c = 0; c < CLS[l].length; c++) { const bk = { l, c, vmax: 3, n: 0, cap: 0 }; bk.id = BK.length; BK.push(bk); }
  names.forEach((n, i) => { for (let l = 0; l < 3; l++) { const t = meta[n].tris[l]; let c = 0; while (t > CLS[l][c]) c++; const bk = BK.find(b => b.l === l && b.c === c); bkOf[i][l] = bk.id; bk.vmax = Math.max(bk.vmax, t * 3); } });

  // ---------------- baked impostors (the model rendered front + side into one 2048 x 1024 atlas, 128 px cells) ----------------
  {
    const rt = new THREE.WebGLRenderTarget(2048, 1024, { minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: true, depthBuffer: true, samples: 0 });
    rt.texture.colorSpace = THREE.NoColorSpace; rt.texture.anisotropy = 4;
    const bakeMat = new THREE.ShaderMaterial({ uniforms: { map: { value: atlas } }, side: THREE.DoubleSide,
      vertexShader: 'varying vec2 vUv; varying vec3 vP; void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }',
      fragmentShader: `uniform sampler2D map; varying vec2 vUv; varying vec3 vP;
        void main() { vec4 t = texture2D(map, vUv); if (t.a < 0.5) discard; vec3 n = normalize(cross(dFdx(vP), dFdy(vP))); if (n.z < 0.0) n = -n; float l = max(dot(n, normalize(vec3(-0.35, 0.8, 0.55))), 0.0);
          vec3 c = t.rgb * (0.66 + 0.5 * l); gl_FragColor = vec4(sqrt(clamp(c, 0.0, 1.0)), 1.0); }` });
    const bs = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400), mesh = new THREE.Mesh(undefined, bakeMat); bs.add(mesh);
    const CC = { conifer: [0.07, 0.13, 0.07], broad: [0.17, 0.25, 0.1], dead: [0.2, 0.18, 0.14], rock: [0.34, 0.33, 0.31] }, cc = new THREE.Color();
    const pr = renderer.getRenderTarget(), pa = renderer.autoClear, pc = renderer.getClearColor(new THREE.Color()), pca = renderer.getClearAlpha(), pst = renderer.getScissorTest();
    const vp = new THREE.Vector4(); renderer.getViewport(vp); const psx = renderer.xr.enabled; renderer.xr.enabled = false;
    renderer.setRenderTarget(rt); renderer.autoClear = false; renderer.setScissorTest(true);
    names.forEach((n, i) => { if (!IMPOK[i]) return; const m = meta[n], g = geoOf[n + '_L0'], cell0 = ICELL[i]; mesh.geometry = g; const W = IW[i] / 2, H = IH[i], y0 = IY0[i], cl = CC[m.cat] || CC.rock;
      for (let side = 0; side < 2; side++) { const cell = cell0 + side, cx = (cell % 16) * 128, cy = Math.floor(cell / 16) * 128;
        renderer.setViewport(cx, cy, 128, 128); renderer.setScissor(cx, cy, 128, 128); cc.setRGB(Math.sqrt(cl[0]), Math.sqrt(cl[1]), Math.sqrt(cl[2]), THREE.LinearSRGBColorSpace); renderer.setClearColor(cc, 0); renderer.clear(true, true, false);
        { const k = 128 / 122, cyc = y0 + H / 2; cam.left = -W * k; cam.right = W * k; cam.top = cyc + H / 2 * k; cam.bottom = cyc - H / 2 * k; cam.updateProjectionMatrix(); }
        if (side === 0) { cam.position.set(0, 0, 100); cam.up.set(0, 1, 0); cam.lookAt(0, 0, 0); } else { cam.position.set(100, 0, 0); cam.up.set(0, 1, 0); cam.lookAt(0, 0, 0); }
        cam.updateMatrixWorld(true); renderer.render(bs, cam); } });
    renderer.xr.enabled = psx; renderer.setRenderTarget(pr); renderer.autoClear = pa; renderer.setClearColor(pc, pca); renderer.setScissorTest(pst); renderer.setViewport(vp); bakeMat.dispose();
    SYN.impTex = rt.texture; SYN.impRT = rt;
  }
  const IMPMAT = mkMat('imp', 3); IMPMAT.alphaTest = 0.42;

  // ---------------- meshes: one per (LOD, size class) with vertex pulling, one impostor mesh ----------------
  const root = new THREE.Group(); root.name = 'synty'; scene.add(root);
  const grow = (o, cap) => { o.cap = cap; o.A = new Float32Array(cap * 4); o.B = new Float32Array(cap * 4); o.a = new THREE.InstancedBufferAttribute(o.A, 4); o.b = new THREE.InstancedBufferAttribute(o.B, 4); o.a.setUsage(THREE.DynamicDrawUsage); o.b.setUsage(THREE.DynamicDrawUsage); o.geo.setAttribute('iA', o.a); o.geo.setAttribute('iB', o.b); };
  for (const bk of BK) { const geo = new THREE.InstancedBufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(bk.vmax * 3), 3)); geo.setDrawRange(0, bk.vmax); geo.instanceCount = 0; bk.geo = geo;
    const mesh = new THREE.Mesh(geo, MATS[bk.l]); mesh.frustumCulled = false; mesh.visible = false; mesh.matrixAutoUpdate = false; mesh.userData.noBatch = true; mesh.userData.noCast = true; mesh.name = 'syn_L' + bk.l + '_c' + bk.c; bk.mesh = mesh; root.add(mesh); grow(bk, 256); }
  // impostor: two crossed quads
  const impG = new THREE.InstancedBufferGeometry();
  impG.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, 0, 0, 0.5, 0, 0, 0.5, 1, 0, -0.5, 1, 0, -0.5, 0, 0, 0.5, 0, 0, 0.5, 1, 0, -0.5, 1, 0], 3));
  impG.setAttribute('normal', new THREE.Float32BufferAttribute([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 3));
  impG.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1], 2)); impG.setAttribute('aSide', new THREE.Float32BufferAttribute([0, 0, 0, 0, 1, 1, 1, 1], 1)); impG.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]); impG.instanceCount = 0;
  const IMP = { n: 0, cap: 4096, geo: impG, mesh: new THREE.Mesh(impG, IMPMAT) };
  IMP.mesh.frustumCulled = false; IMP.mesh.matrixAutoUpdate = false; IMP.mesh.visible = false; IMP.mesh.userData.noBatch = true; IMP.mesh.userData.noCast = true; root.add(IMP.mesh); grow(IMP, 4096);

  // ---------------- the world: forest mask + cells ----------------
  const hash = (a, b) => { let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x7f4a7c15, 0xc2b2ae35); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15; return (h >>> 0) / 4294967296; };
  const vn = (x, z) => { const ix = Math.floor(x), iz = Math.floor(z), fx = x - ix, fz = z - iz, ux = fx * fx * (3 - 2 * fx), uz = fz * fz * (3 - 2 * fz);
    const a = hash(ix, iz * 7 + 1), b = hash(ix + 1, iz * 7 + 1), c = hash(ix, iz * 7 + 8), d = hash(ix + 1, iz * 7 + 8); return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz; };
  const forest = (x, z, h, ny) => {
    let f = sm(3, 50, h) * (1 - sm(820, 980, h + 60 * Math.sin(x * 0.0021 + z * 0.0013)));
    f *= 0.5 + 0.5 * sm(50, 160, h);
    f *= sm(0.2, 0.4, vn(x / 520 + 11.3, z / 520 + 7.7)); f *= 0.6 + 0.95 * vn(x / 120 + 3.1, z / 120 + 9.4); f *= sm(0.7, 0.76, ny) * 1.5;
    return f; };
  class Buf { constructor(c = 16) { this.a = new Float32Array(c * 8); this.n = 0; }
    push(x, y, z, s, r, seed, m, t) { if ((this.n + 1) * 8 > this.a.length) { const b = new Float32Array(this.a.length * 2); b.set(this.a); this.a = b; } const o = this.n++ * 8, a = this.a; a[o] = x; a[o + 1] = y; a[o + 2] = z; a[o + 3] = s; a[o + 4] = r; a[o + 5] = seed; a[o + 6] = m; a[o + 7] = t; } }
  const cells = new Map(), key = (ix, iz) => (ix + 512) * 1024 + (iz + 512);
  const pick = (L, u) => { let t = 0; for (const e of L) t += e[1]; u *= t; for (const e of L) { u -= e[1]; if (u <= 0) return e; } return L[L.length - 1]; };
  const cellOf = (ix, iz) => { const k = key(ix, iz); let c = cells.get(k); if (!c) { const cx = (ix + 0.5) * CS, cz = (iz + 0.5) * CS; c = { ix, iz, cx, cz, tr: new Buf(32), sm: new Buf(8), bg: new Buf(2), done: 0, lv: 0, smDone: 0, flag: -1, fixed: false }; cells.set(k, c); } return c; };
  const flagOf = c => { if (c.flag < 0) c.flag = (C.vegBlocked(c.cx, c.cz, 105) || C.waterDist(c.cx, c.cz) < 125 || C.rd2Dist(c.cx, c.cz) < 110 || C.nearMeadow(c.cx, c.cz, 105)) ? 1 : 0; return c.flag; };
  const place = (buf, e, x, z, u1, u2, u3, sizeMode, ny, sinkK) => {   // e: species entry; sizeMode: 0 height range, 1 scale range
    const mi = mid[e[0]], sc = sizeMode === 0 ? (e[2] + (e[3] - e[2]) * u1) / MH[mi] : e[2] + (e[3] - e[2]) * u1, h = C.terrainHeight(x, z);
    const sl = Math.sqrt(Math.max(0, 1 - ny * ny)) / Math.max(ny, 0.3), y = h - (sizeMode === 0 ? 0.1 + 0.2 * sc * sl : 0.14 * MSZ[mi] * sc * (sinkK || 1) + 0.05) ;
    return [mi, sc, y]; };
  function genTrees(c, need) {   // candidates done..need-1 (index order = seed order)
    const flag = flagOf(c); const B = c.tr, nrg = c.ix * 131 + c.iz * 977;
    for (let i = c.done; i < need; i++) {
      const x = (c.ix + hash(c.ix * 3 + i, c.iz * 5 + 11)) * CS, z = (c.iz + hash(c.ix * 7 + 13, c.iz * 3 + i * 5 + 2)) * CS, h = C.terrainHeight(x, z);
      if (h < 3) continue; const u = hash(nrg + i * 3 + 1, 77), f0 = forest(x, z, h, 1); if (u >= f0 * 1.0) continue;
      const ny = C.terrainNormal(x, z)[1], f = forest(x, z, h, ny); if (u >= f) continue; if (flag && (C.vegBlocked(x, z, 3.5) || C.rd2Dist(x, z) < 6)) continue;
      const u2 = hash(nrg + i, 31), u3 = hash(nrg - i, 53), u4 = hash(i * 17 + c.ix, c.iz + 5), seed = (i + 0.5) / NTREE;
      const alt = sm(60, 260, h) * 0.85 + 0.08 + (vn(x / 300, z / 300) - 0.5) * 0.3;
      const cat = u2 < 0.035 ? 'dead' : (u3 < alt ? 'conifer' : 'broad'), e = pick(SP[cat], u4), tint = hash(i + 9, nrg), p = place(B, e, x, z, hash(i * 3, nrg + 1), 0, 0, 0, ny);
      B.push(x, p[2], z, p[1], hash(i, nrg + 2) * 6.2832, seed, p[0], tint); }
    c.done = need; }
  function genSmall(c) {
    const flag = flagOf(c); c.smDone = 1; const B = c.sm, G = c.bg, nrg = c.ix * 313 + c.iz * 457;
    // big outcrops (visible far: impostors) - few per cell, steeper / higher ground
    for (let i = 0; i < 3; i++) { const x = (c.ix + hash(nrg + i, 901)) * CS, z = (c.iz + hash(nrg - i, 902)) * CS, h = C.terrainHeight(x, z); if (h < 14) continue; const ny = C.terrainNormal(x, z)[1], R = 0.2 + 0.8 * sm(0.9, 0.55, ny) + 0.3 * sm(500, 900, h);
      if (hash(nrg + i, 903) > 0.025 + 0.2 * R * R * R || (flag && (C.vegBlocked(x, z, 12) || C.rd2Dist(x, z) < 14))) continue; const e = pick(SP.rockL, hash(i, nrg + 4)), p = place(G, e, x, z, hash(nrg, i + 5), 0, 0, 1, ny, 1);
      G.push(x, p[2], z, p[1], hash(i, nrg + 6) * 6.2832, 0.5, p[0], hash(i + 3, nrg)); }
    for (let i = 0; i < 150; i++) {
      const x = (c.ix + hash(nrg * 3 + i, 17)) * CS, z = (c.iz + hash(nrg * 5 + i, 19)) * CS, h = C.terrainHeight(x, z); if (h < 12) continue;
      const u = hash(nrg + i * 11, 23), ny = C.terrainNormal(x, z)[1], f = forest(x, z, h, ny), R = 0.15 + 0.85 * sm(0.92, 0.6, ny) + 0.3 * sm(450, 900, h);
      let L = null, lim;
      if (u < 0.11 * R) { L = hash(i, nrg + 3) < 0.72 ? SP.rockS : SP.rockM; lim = 1; }
      else if (u < 0.11 * R + 0.012 * f * 3) L = SP.floor;
      else if (u < 0.11 * R + 0.012 * f * 3 + 0.62 * Math.min(1, f * 1.5)) L = hash(i, nrg + 9) < 0.78 ? SP.fern : SP.bush;
      else if (u < 0.11 * R + 0.012 * f * 3 + 0.62 * Math.min(1, f * 1.5) + 0.2 * (1 - Math.min(1, f)) * (1 - R)) L = hash(i, nrg + 12) < 0.5 ? SP.grass : SP.bush;
      if (!L) continue; if (flag && (C.vegBlocked(x, z, 1) || C.rd2Dist(x, z) < 2)) continue;
      const e = pick(L, hash(nrg + i, 41)), p = place(B, e, x, z, hash(i * 7, nrg + 43), 0, 0, 1, ny, lim ? 1 : 0.2);
      B.push(x, p[2], z, p[1], hash(i, nrg + 47) * 6.2832, hash(i, nrg + 53), p[0], hash(i + 1, nrg + 59)); } }
  const qImp = d => d < 1500 ? 1 : Math.max(0.12, Math.pow(1500 / d, 1.6));
  // ---- fixed placements: the old game's own trees, groves, the lanes, sites ----
  const fixedAt = (x, z) => cellOf(Math.floor(x / CS), Math.floor(z / CS));
  function addFixed() {
    const rnd = (() => { let s = 0x5917; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
    const tree = (x, z, cat) => { const e = pick(SP[cat], rnd()), c = fixedAt(x, z), p = place(c.tr, e, x, z, rnd(), 0, 0, 0, 0.95); c.tr.push(x, p[2], z, p[1], rnd() * 6.2832, 0.004 + 0.0001 * rnd(), p[0], rnd()); };
    const prop = (list, x, z, sMul = 1, ry = rnd() * 6.2832, sink = 0.14) => { const e = pick(list, rnd()), c = fixedAt(x, z), mi = mid[e[0]], sc = (e[2] + (e[3] - e[2]) * rnd()) * sMul, h = C.terrainHeight(x, z); const B = IMPOK[mi] ? c.bg : c.sm; B.push(x, h - sink * MSZ[mi] * sc, z, sc, ry, rnd(), mi, rnd()); };
    const byName = (n, x, z, sc, ry, sink = 0) => { const mi = mid[n.replace(/^SM_/, '')], c = fixedAt(x, z), h = C.terrainHeight(x, z); c.sm.push(x, h - sink, z, sc, ry, 0.5, mi, 0.5); };
    // the game's strip trees (home valley) + the Hollow, as Synty trees
    for (const [x, , z, sc] of C.TREES) { if (C.rd2Dist(x, z) < 6) continue; const cat = rnd() < 0.55 ? 'conifer' : 'broad', e = pick(SP[cat], rnd()), c = fixedAt(x, z), mi = mid[e[0]], s = (e[2] + (e[3] - e[2]) * 0.5) * (0.55 + 0.4 * sc) / MH[mi], h = C.terrainHeight(x, z); c.tr.push(x, h - 0.2, z, s, rnd() * 6.2832, 0.002 + 0.0001 * rnd(), mi, rnd()); }
    // the valley groves: broadleaf stands (the old crowns on trunks)
    for (const g of C.GROVES) for (let k = 0; k < 70; k++) { const a = rnd() * 6.2832, d = 4 + 48 * Math.sqrt(rnd()), x = g.x + Math.cos(a) * d, z = g.z + Math.sin(a) * d; if (C.vegBlocked(x, z, 3) || C.rd2Dist(x, z) < 6) continue; const e = pick(SP.broad, rnd()), c = fixedAt(x, z), mi = mid[e[0]], h = C.terrainHeight(x, z); c.tr.push(x, h - 0.2, z, (e[2] + (e[3] - e[2]) * rnd()) / MH[mi], rnd() * 6.2832, 0.003 + 0.0001 * rnd(), mi, rnd()); }
    // the ridge lane / drive-in: rocks, bushes, dead trees and the odd stump close beside the road
    if (C.TRK_LANE) { const P = C.TRK_LANE; for (let i = 0; i < P.length - 1; i++) { const [x0, z0] = P[i], [x1, z1] = P[i + 1], L = Math.hypot(x1 - x0, z1 - z0), nx = -(z1 - z0) / L, nz = (x1 - x0) / L;
        for (let k = 0; k < Math.ceil(L / 7); k++) for (const sd of [-1, 1]) { const t = (k + rnd()) * 7 / L, off = sd * (4.5 + rnd() * rnd() * 20), x = x0 + (x1 - x0) * t + nx * off, z = z0 + (z1 - z0) * t + nz * off; if (C.vegBlocked(x, z, 2) && rnd() < 0.5) continue; const u = rnd();
          if (u < 0.34) prop(SP.rockS, x, z); else if (u < 0.5) prop(SP.rockM, x, z); else if (u < 0.82) prop(SP.bush, x, z); else if (u < 0.92) prop(SP.fern, x, z); else if (u < 0.96) prop(SP.floor, x, z); else tree(x, z, 'dead'); } } }
    // sites: a ring of rocks, shrubs, stumps + logs round every named place; richer round the cabin + hangar
    const ringProps = (sx, sz, r0, r1, n, mixes) => { for (let k = 0; k < n; k++) { const a = rnd() * 6.2832, d = r0 + (r1 - r0) * Math.sqrt(rnd()), x = sx + Math.cos(a) * d, z = sz + Math.sin(a) * d; if (C.vegBlocked(x, z, 1)) continue; let u = rnd(), L = mixes[mixes.length - 1][1]; for (const [p, l] of mixes) { if (u < p) { L = l; break; } u -= p; } prop(L, x, z); } };
    const mix = [[0.3, SP.bush], [0.22, SP.rockS], [0.12, SP.rockM], [0.14, SP.fern], [0.1, SP.floor], [0.12, SP.grass]];
    for (const s of C.POIS) ringProps(s.x, s.z, 14, 55, 46, mix);
    ringProps(32, -15, 9, 40, 110, mix); ringProps(C.HANGAR.x, C.HANGAR.z, 10, 36, 50, mix);
    for (const T of C.TOWNS) ringProps(T.x, T.z, T.r * 0.78, T.r + 70, 150, mix);
    for (const S of C.DLV_STRIPS) ringProps(S.pad ? S.pad[0] : S.x, S.pad ? S.pad[1] : S.z, 16, 70, 50, mix);
    // a few Synty trees round the cabin, the hangar, the towns and the strips (the old game's trees there are hidden with the rest)
    const ringTrees = (sx, sz, r0, r1, n, pc) => { for (let k = 0; k < n; k++) { const a = rnd() * 6.2832, d = r0 + (r1 - r0) * Math.sqrt(rnd()), x = sx + Math.cos(a) * d, z = sz + Math.sin(a) * d; if (C.vegBlocked(x, z, 3) || C.rd2Dist(x, z) < 7) continue; tree(x, z, rnd() < pc ? 'conifer' : 'broad'); } };
    ringTrees(32, -34, 14, 70, 22, 0.55); ringTrees(C.HANGAR.x, C.HANGAR.z, 22, 80, 16, 0.5);
    for (const T of C.TOWNS) ringTrees(T.x, T.z, T.r * 0.9, T.r + 90, 30, 0.45);
    for (const S of C.DLV_STRIPS) ringTrees(S.pad ? S.pad[0] : S.x, S.pad ? S.pad[1] : S.z, 30, 110, 14, 0.5);
    // cabin yard: a campfire ring with logs, a chest by the door, a fence run and a roadsign; a stone wall by the hangar
    { const cx = 32, cz = -34; byName('SM_Prop_CampFire_01', cx, cz, 1.4, 0, 0.05); for (let k = 0; k < 4; k++) { const a = k * 1.5708 + 0.4, x = cx + Math.cos(a) * 2.3, z = cz + Math.sin(a) * 2.3; byName('SM_Tree_Log_01', x, z, 0.8, a + 1.57, 0.12); }
      for (let k = 0; k < 9; k++) { const x = 18 + k * 2.9, z = -52; byName(k % 2 ? 'SM_Prop_Fence_01' : 'SM_Prop_Fence_02', x, z, 1, 0, 0); }
      byName('SM_Prop_Chest_Wood_01', 29.4, -9.2, 1.1, 0.4, 0); byName('SM_Prop_RoadSign_01', 24, -62, 1.2, 1.2, 0);
      for (let k = 0; k < 6; k++) byName(k % 3 === 0 ? 'SM_Prop_StoneWall_01' : k % 3 === 1 ? 'SM_Prop_StoneWall_02' : 'SM_Prop_StoneWall_03', C.HANGAR.x - 22 - k * 4.4, C.HANGAR.z + 22, 1, 0.1, 0.02); }
    for (const T of C.TOWNS) { for (let k = 0; k < 12; k++) { const a = rnd() * 6.2832, x = T.x + Math.cos(a) * (T.r + 8 + rnd() * 12), z = T.z + Math.sin(a) * (T.r + 8 + rnd() * 12); if (C.vegBlocked(x, z, 2)) continue; byName(['SM_Prop_Fence_01', 'SM_Prop_Fence_02', 'SM_Prop_StoneWall_02'][k % 3], x, z, 1, a + 1.57, 0); }
      byName('SM_Prop_RoadSign_01', T.x + 6, T.z + T.r * 0.7, 1.2, 0.5, 0); byName('SM_Prop_CampFire_01', T.x - 12, T.z + T.r * 0.82, 1.3, 0, 0.05); }
  }
  // sort the fixed trees' buffers by seed (they carry tiny seeds so they always pass the thinning prefix)
  addFixed();

  // ---------------- streaming + refresh ----------------
  const ST = { hx: 1e9, hy: 0, hz: 1e9, forced: true, queue: [], qi: 0, qT: 0, gen: 0, nearGen: 0, farT: 0, ms: 0, refreshMs: 0, imp: 0, near: 0, draws: 0, tris: 0, cells: 0, lastQ: 0 };
  const ring = (R, fn) => { const hx0 = ST.hx, hz0 = ST.hz, r = Math.ceil(R / CS) + 1, ix0 = Math.floor(hx0 / CS), iz0 = Math.floor(hz0 / CS); for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const ix = ix0 + dx, iz = iz0 + dz, cx = (ix + 0.5) * CS - hx0, cz = (iz + 0.5) * CS - hz0, d = Math.sqrt(cx * cx + cz * cz); if (d <= R + CELL_R) fn(ix, iz, d); } };
  function plan() {   // which cells need what, nearest first
    const reach = U.uReach.value; const need = [];
    ring(IMP_R * reach, (ix, iz, d) => { const lv = d < 420 * reach ? 2 : 1, q = lv === 2 ? 1 : qImp(Math.max(0, d - CELL_R) / reach), nn = Math.ceil(NTREE * q), c = cells.get(key(ix, iz));
      if (!c || c.done < nn || (lv === 2 && !c.smDone)) need.push([d, ix, iz, nn, lv]); });
    need.sort((a, b) => a[0] - b[0]); ST.queue = need; ST.qi = 0; }
  function runQueue(budgetMs) {
    const t = performance.now(); let n = 0;
    while (ST.qi < ST.queue.length) { const [, ix, iz, nn, lv] = ST.queue[ST.qi++], c = cellOf(ix, iz); if (c.done < nn) genTrees(c, nn); if (lv === 2 && !c.smDone) { genSmall(c); ST.nearGen++; } n++; if (performance.now() - t > budgetMs) break; }
    ST.gen += n; return n; }
  const seedIdx = (B, q) => { let lo = 0, hi = B.n; const a = B.a; while (lo < hi) { const m = (lo + hi) >> 1; if (a[m * 8 + 5] < q) lo = m + 1; else hi = m; } return lo; };
  function ensure(o, n) { if (n > o.cap) { let c = o.cap; while (c < n) c *= 2; grow(o, c); } }
  const put4 = (A, Bb, k, a, o) => { A[k * 4] = a[o]; A[k * 4 + 1] = a[o + 1]; A[k * 4 + 2] = a[o + 2]; A[k * 4 + 3] = a[o + 3]; Bb[k * 4] = a[o + 4]; Bb[k * 4 + 1] = a[o + 5]; Bb[k * 4 + 2] = a[o + 6]; Bb[k * 4 + 3] = a[o + 7]; };
  const IMG = 140;   // the impostor list is rebuilt only every ~IMG/2 m of travel: its thinning prefix is cut IMG m generous, the exact thinning is per instance in the shader
  function refreshImp() {
    const t = performance.now(), reach = U.uReach.value; IMP.n = 0; let nImp = 0; ST.ix = ST.hx; ST.iz = ST.hz;
    // pass 1: impostors (cells out to IMP_R: the seed-ordered prefix that survives the thinning at that range)
    ring(IMP_R * reach + IMG, (ix, iz, d) => { const c = cells.get(key(ix, iz)); if (!c) return; const dn = Math.max(0, d - CELL_R - IMG) / reach, q = qImp(dn); if (dn > IMP_R) return;
      nImp += seedIdx(c.tr, q + 0.07) + c.bg.n; });
    ensure(IMP, nImp + 16); const IAa = IMP.A, IBa = IMP.B; let ni = 0;
    ring(IMP_R * reach + IMG, (ix, iz, d) => { const c = cells.get(key(ix, iz)); if (!c) return; const dn = Math.max(0, d - CELL_R - IMG) / reach; if (dn > IMP_R) return; const q = qImp(dn), m = seedIdx(c.tr, q + 0.07), a = c.tr.a;
      for (let i = 0; i < m; i++) if (IMPOK[a[i * 8 + 6]]) { put4(IAa, IBa, ni, a, i * 8); ni++; } const g = c.bg.a; for (let i = 0; i < c.bg.n; i++) { put4(IAa, IBa, ni, g, i * 8); ni++; } });
    IMP.n = ni;
    IMP.a.needsUpdate = true; IMP.b.needsUpdate = true; IMP.geo.instanceCount = IMP.n; IMP.mesh.visible = IMP.n > 0; IMP.a.clearUpdateRanges(); IMP.b.clearUpdateRanges(); IMP.a.addUpdateRange(0, IMP.n * 4); IMP.b.addUpdateRange(0, IMP.n * 4);
    ST.imp = IMP.n; ST.impMs = performance.now() - t; }
  function refresh(withImp) {
    const t = performance.now(), reach = U.uReach.value, hx0 = ST.hx, hy0 = ST.hy, hz0 = ST.hz, MG = 22 * Math.max(1, reach);
    if (withImp || ST.ix === undefined || Math.abs(hx0 - ST.ix) + Math.abs(hz0 - ST.iz) > IMG * 0.5) refreshImp();
    for (const bk of BK) bk.n = 0;
    // pass 2: the 3D LODs (every instance in a cell within the biggest switch distance, binned by the distances it can be seen at)
    const far = 560 * reach + CELL_R + MG; let nn3 = 0;
    ring(far, (ix, iz) => { const c = cells.get(key(ix, iz)); if (!c) return;
      for (let pass = 0; pass < 3; pass++) { const B = pass === 0 ? c.tr : pass === 1 ? c.sm : c.bg, a = B.a;
        for (let i = 0; i < B.n; i++) { const o = i * 8, mi = a[o + 6] | 0, sc = a[o + 3], dx = a[o] - hx0, dy = a[o + 1] - hy0, dz = a[o + 2] - hz0, d = Math.sqrt(dx * dx + dy * dy + dz * dz) / reach;
          const S = MSZ[mi] * sc, j = 0.9 + 0.2 * a[o + 5], b0 = clamp(S * LOD_B[0], 14, 130) * j, b1 = clamp(S * LOD_B[1], 34, 280) * j, b2 = clamp(S * LOD_B[2], 80, 560) * j, mg = MG / reach;
          if (d > b2 * 1.12 + mg) continue; nn3++;
          if (d < b0 * 1.2 + mg) { const O = BK[bkOf[mi][0]]; if (O.n >= O.cap) { const A = O.A, Bb = O.B; grow(O, O.cap * 2); O.A.set(A); O.B.set(Bb); } put4(O.A, O.B, O.n++, a, o); }
          if (d > b0 * 0.8 - mg && d < b1 * 1.16 + mg) { const O = BK[bkOf[mi][1]]; if (O.n >= O.cap) { const A = O.A, Bb = O.B; grow(O, O.cap * 2); O.A.set(A); O.B.set(Bb); } put4(O.A, O.B, O.n++, a, o); }
          if (d > b1 * 0.84 - mg) { const O = BK[bkOf[mi][2]]; if (O.n >= O.cap) { const A = O.A, Bb = O.B; grow(O, O.cap * 2); O.A.set(A); O.B.set(Bb); } put4(O.A, O.B, O.n++, a, o); } } } });
    let draws = 0, tris = 0;
    for (const O of BK) { O.a.needsUpdate = true; O.b.needsUpdate = true; O.geo.instanceCount = O.n; O.mesh.visible = O.n > 0; if (O.n) { draws++; tris += O.n * O.vmax / 3; } O.a.clearUpdateRanges(); O.b.clearUpdateRanges(); O.a.addUpdateRange(0, O.n * 4); O.b.addUpdateRange(0, O.n * 4); }
    if (IMP.n) { draws++; tris += IMP.n * 4; }
    ST.draws = draws; ST.tris = tris; ST.near = nn3; ST.refreshMs = performance.now() - t; ST.cells = cells.size; }

  // ---------------- per-frame ----------------
  let lastPlan = 0;
  SYN.tick = dt => {
    if (!SYN.on) return;
    const E = (SYN.cam || C.activeCam()).matrixWorld.elements, x = E[12], y = E[13], z = E[14]; U.uHead.value.set(x, y, z); U.uReach.value = clamp(C.GFX.dist, 0.6, 1.3);
    const mv = Math.abs(x - ST.hx) + Math.abs(y - ST.hy) + Math.abs(z - ST.hz);
    if (ST.forced || mv > 14) { ST.hx = x; ST.hy = y; ST.hz = z; plan(); runQueue(ST.forced ? 4 : 1.5); refresh(ST.forced); ST.forced = false; lastPlan = 0; ST.nearGen = 0; ST.farT = 0; }
    else if (ST.qi < ST.queue.length) { const n = runQueue(2); if (n) { ST.farT++; if ((ST.nearGen && ++lastPlan >= 4) || ST.farT >= 24 || (ST.qi >= ST.queue.length && ST.farT > 2)) { refresh(ST.farT >= 24 || ST.qi >= ST.queue.length); lastPlan = 0; ST.nearGen = 0; if (ST.farT >= 24 || ST.qi >= ST.queue.length) ST.farT = 0; } } } };
  SYN.fill = (ms) => { const E = (SYN.cam || C.activeCam()).matrixWorld.elements; ST.hx = E[12]; ST.hy = E[13]; ST.hz = E[14]; plan(); const t = performance.now(); while (ST.qi < ST.queue.length && performance.now() - t < ms) runQueue(10); ST.forced = true; };
  SYN.apply = () => { const on = !!C.GFX.synty && SYN.ok; SYN.on = on; root.visible = on; if (on) { ST.forced = true; } C.updateChunks && C.updateChunks(true); };
  SYN.warm = () => { const vis = []; root.traverse(o => { if (o.isMesh) { vis.push(o, o.visible); o.visible = true; } }); root.visible = true; for (let c = 0; c < 4; c++) { C.PL.visible = !!(c & 1); C.SL.visible = !!(c & 2); renderer.compile(scene, camera); } for (let i = 0; i < vis.length; i += 2) vis[i].visible = vis[i + 1]; root.visible = SYN.on; };
  SYN.stats = ST; SYN.cells = cells; SYN.meta = meta; SYN.BK = BK; SYN.IMP = IMP; SYN.names = names; SYN.root = root; SYN.U = U; SYN.plan = plan; SYN.refresh = refresh; SYN.mid = mid;
  SYN.ok = true; SYN.loadMs = performance.now() - t0;
  SYN.apply();
  return SYN;
}
