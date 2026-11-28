#!/usr/bin/env python3
# Packs the Synty POLYGON Nature textures used by the prototype into ONE 2048x1024 atlas (see build.mjs for the UV remap).
# usage: atlas.py <SourceFiles/Textures dir> <out.webp>
import sys, numpy as np
from PIL import Image
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
def load(p, size):
    im = Image.open(f'{src}/{p}').convert('RGBA'); a = np.array(im).astype(np.float32)
    al = a[..., 3] > 8
    if not al.all():   # grow the colour into the empty texels so bilinear / mips never pull black or magenta into a leaf edge
        idx = ndimage.distance_transform_edt(~al, return_distances=False, return_indices=True)
        rgb = a[..., :3][idx[0], idx[1]]; a[..., :3] = np.where(al[..., None], a[..., :3], rgb)
    im = Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGBA')
    return im.resize((size, size), Image.LANCZOS) if im.size[0] != size else im
R = {'pine': ('Leaves/Leaves_Pine_Texture.png', 0, 0), 'generic': ('Leaves/Leaves_Generic_Texture.png', 512, 0),
     'dead': ('Leaves/Tree_Dead_Branch.png', 1024, 0), 'under': ('Leaves/Undergrowth_Texture.png', 1536, 0),
     'pal': ('PolygonNature_01.png', 0, 512), 'birch': ('Leaves/Birch_Trunk_Texture.png', 512, 512), 'willow': ('Leaves/Leaves_Willow_Texture.png', 1024, 512)}
A = Image.new('RGBA', (2048, 1024), (0, 0, 0, 0))
for k, (p, x, y) in R.items(): A.paste(load(p, 512), (x, y))
A.save(out, 'WEBP', quality=93, method=6, alpha_quality=100)
print('atlas', out)
