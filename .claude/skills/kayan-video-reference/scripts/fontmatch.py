#!/usr/bin/env python3
"""fontmatch.py <frame.png> <x0,y0,x1,y1> <canddir> : rank candidate renders (from fontcands.js, same text) by shape
overlap (IoU) with the text inside the box of a video frame, and print the implied font size in px.
Box = generous crop around ONE line of text. >0.9 = match; the reference's Arabic scored 0.96 (IBM Plex Sans Arabic 700)."""
import sys, glob, os, numpy as np
from PIL import Image
frame, box, cd = sys.argv[1], tuple(map(int, sys.argv[2].split(','))), sys.argv[3]
def ink(m): ys, xs = np.where(m); return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
f = np.asarray(Image.open(frame).convert('RGB')).astype(float)[box[1]:box[3], box[0]:box[2]]
lo = np.percentile(f.max(2), 20); v = np.clip((f.max(2) - lo) / (f.max(2).max() - lo), 0, 1)
b = ink(v > .5); v = v[b[1]:b[3], b[0]:b[2]]; H, W = v.shape
res = []
for p in glob.glob(cd + '/*.png'):
    c = np.asarray(Image.open(p).convert('L')).astype(float) / 255; bb = ink(c > .5); c = c[bb[1]:bb[3], bb[0]:bb[2]]
    sc = W / c.shape[1]; h2 = max(1, int(round(c.shape[0] * sc)))
    cr = np.asarray(Image.fromarray((c * 255).astype('uint8')).resize((W, h2), Image.LANCZOS)) / 255.
    best = 0
    for dy in range(-12, 13):
        A = np.zeros((H + 60, W)); B = np.zeros((H + 60, W)); A[30:30 + H] = v; y = 30 + dy
        if y < 0 or y + h2 > H + 60: continue
        B[y:y + h2] = cr; a, q = A > .5, B > .5; best = max(best, (a & q).sum() / (a | q).sum())
    res.append((best, os.path.basename(p)[:-4], 200 * sc))
for s, n, px in sorted(res, reverse=True)[:12]: print(f'{s:.3f}  {n:40s} size ~{px:.0f}px')
