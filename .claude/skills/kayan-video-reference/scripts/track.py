#!/usr/bin/env python3
"""track.py <parentdir> <framesSubdir> <settledFrame> <first> <last> x0,y0,x1,y1 [...]
Per frame and per box (one box per WORD, taken from the settled frame): opacity %% of settled brightness and
vertical offset in px of the ink centroid (+ = below final). This is how the word-by-word headline timing was measured."""
import numpy as np, sys
from PIL import Image
S,clip,settle,a,b=sys.argv[1:6]; settle,a,b=int(settle),int(a),int(b)
boxes=[tuple(map(int,s.split(','))) for s in sys.argv[6:]]  # x0,y0,x1,y1 (ink bbox in settled frame, approx)
def L(n): return np.asarray(Image.open(f'{S}/{clip}/f_{n:04d}.png').convert('RGB')).astype(float)
def fg(f): return np.clip(f.max(2)-75,0,None)
ref=fg(L(settle)); R=[]
for (x0,y0,x1,y1) in boxes:
    r=ref[y0-40:y1+40,x0:x1]; w=r.sum(1); R.append((np.percentile(r,99.5),(w*np.arange(len(w))).sum()/w.sum(), r.sum()))
for n in range(a,b+1):
    f=fg(L(n)); o=[]
    for (x0,y0,x1,y1),(p,cy,tot) in zip(boxes,R):
        r=f[y0-40:y1+40,x0:x1]; w=r.sum(1)
        if w.sum()<tot*0.01: o.append('   -      '); continue
        o.append(f'{np.percentile(r,99.5)/p*100:4.0f}% {(w*np.arange(len(w))).sum()/w.sum()-cy:+6.1f}')
    print(f'f{n:<4}{(n-1)/30:6.3f}s  '+' | '.join(o))
