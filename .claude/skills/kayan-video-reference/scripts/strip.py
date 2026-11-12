#!/usr/bin/env python3
"""strip.py <parentdir> <framesSubdir> <firstFrame> <lastFrame> <step> <x0> <y0> <x1> <y1> <scale> <cols> <out.jpg>
Frame-by-frame strip of a crop (frames are f_NNNN.png, 1-based), each tile labelled with frame and time."""
import sys
from PIL import Image, ImageDraw
S,clip,a,b,step,x0,y0,x1,y1,scale,cols,out=sys.argv[1:13]
a,b,step,x0,y0,x1,y1,cols=map(int,(a,b,step,x0,y0,x1,y1,cols)); scale=float(scale)
fr=list(range(a,b+1,step)); w=int((x1-x0)*scale); h=int((y1-y0)*scale)
rows=(len(fr)+cols-1)//cols
sheet=Image.new('RGB',(cols*w,rows*h))
for i,n in enumerate(fr):
    im=Image.open(f'{S}/{clip}/f_{n:04d}.png').crop((x0,y0,x1,y1)).resize((w,h),Image.LANCZOS)
    d=ImageDraw.Draw(im); d.rectangle((0,0,96,14),fill=(0,0,0)); d.text((2,1),f'f{n} {(n-1)/30:.3f}s',fill=(255,255,0))
    sheet.paste(im,((i%cols)*w,(i//cols)*h))
sheet.save(out,quality=88); print(out,sheet.size)
