import sys, math, numpy as np
from PIL import Image
S,W=sys.argv[1:3]
ORIG=f'{S}/ref2/C'; ENG=f'{W}/out'; OUT=f'{W}/final'
WIPE=[1076,960,721,318,-86.5,-324.5,-441.5]; TAN=math.tan(math.radians(13.4))
Y,X=np.mgrid[0:1920,0:1080]
def right_mask(i):            # True = right of the wipe line (where the NEW scene is)
    xb=WIPE[i]; xt=xb+1895*TAN; xbb=xb-25*TAN
    lx=xt+(xbb-xt)*Y/1920.0
    return X>lx
def src(f):                   # f = 0-based frame
    o=lambda: np.asarray(Image.open(f'{ORIG}/f_{f+1:04d}.png').convert('RGB'))
    e=lambda: np.asarray(Image.open(f'{ENG}/still_{f:04d}.png').convert('RGB'))
    for mid,new_is_engine in ((96,True),(171,False),(978,True)):
        if mid-3<=f<=mid+3:
            m=right_mask(f-(mid-3))[...,None]
            return np.where(m,e(),o()) if new_is_engine else np.where(m,o(),e())
    if 100<=f<=167 or f>=982: return e()
    return o()
for f in range(1176):
    Image.fromarray(src(f)).save(f'{OUT}/f_{f:04d}.png', compress_level=1)
print('frames written')
