#!/usr/bin/env python3
"""wipe.py <framesdir> : find frames where a saturated accent line crosses the top (y=25) / bottom (y=H-25) rows,
and report its x positions and angle — this is how the 13.4 deg diagonal wipe was measured."""
import sys, glob, math, numpy as np
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + '/f_*.png'))
def runs(r):
    xs = np.where((r[:, 2] > 150) & (r[:, 2] - r[:, 0] > 90))[0]
    if not len(xs): return []
    g = [[xs[0], xs[0]]]
    for x in xs[1:]:
        if x - g[-1][1] <= 3: g[-1][1] = x
        else: g.append([x, x])
    return [(int(a), int(b)) for a, b in g]
for p in fs:
    f = np.asarray(Image.open(p).convert('RGB')).astype(int); H = f.shape[0]
    t, b = runs(f[25]), runs(f[H - 25])
    if t or b:
        s = ''
        if t and b:
            tm = max(t, key=lambda g: g[1] - g[0]); bm = max(b, key=lambda g: g[1] - g[0])
            s = f'  angle {math.degrees(math.atan2(sum(tm) / 2 - sum(bm) / 2, H - 50)):.1f} deg, width {tm[1] - tm[0] + 1}px'
        print(p.split('/')[-1], 'top', t, 'bottom', b, s)
