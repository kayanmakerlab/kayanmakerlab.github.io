# original ambient pad (royalty-free, generated here): slow Am-F-C-G, soft sines, gentle shimmer
import sys, numpy as np, wave
out, dur = sys.argv[1], float(sys.argv[2]); sr=48000; n=int(dur*sr); t=np.arange(n)/sr
m2f=lambda m:440*2**((m-69)/12)
chords=[[57,60,64,69],[53,57,60,65],[48,55,60,64],[55,59,62,67]]   # Am F C G
seg=8.0; y=np.zeros(n)
for k in range(int(dur//seg)+2):
    c=chords[k%4]; t0=k*seg; env=np.clip(np.minimum((t-t0+1.5)/3.0,(t0+seg+1.5-t)/3.0),0,1)**1.5
    for j,m in enumerate(c):
        f=m2f(m); ph=np.random.rand()*6.28
        y+=env*(0.22/(1+j*0.3))*(np.sin(2*np.pi*f*t+ph)+0.35*np.sin(2*np.pi*f*1.003*t+ph)+0.15*np.sin(2*np.pi*f*2*t))
    y+=env*0.05*np.sin(2*np.pi*m2f(c[0]-12)*t)
shimmer=0.02*np.sin(2*np.pi*m2f(81)*t)*(0.5+0.5*np.sin(2*np.pi*0.13*t))
y=(y+shimmer)*(0.85+0.15*np.sin(2*np.pi*0.07*t))
fade=np.clip(np.minimum(t/3.0,(dur-t)/2.5),0,1); y*=fade; y/=np.abs(y).max()*1.25
st=np.stack([y,np.roll(y,int(0.012*sr))],1)
w=wave.open(out,'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((st*32767).astype('<i2').tobytes()); w.close()
