#!/usr/bin/env bash
# extract.sh <video.mp4> <outdir>  -> outdir/f_NNNN.png (every frame, 1-based), outdir/sheet_*.jpg (every 6th frame, timecoded),
#                                     outdir/spectrum.png, and the probe/loudness summary on stdout
set -euo pipefail; V="$1"; O="$2"; mkdir -p "$O"
ffprobe -v error -show_entries stream=codec_name,profile,width,height,r_frame_rate,nb_frames,pix_fmt,color_space,sample_rate,channels,bit_rate:format=duration,size -of default=nw=1 "$V"
ffmpeg -hide_banner -nostats -i "$V" -af loudnorm=print_format=summary -f null - 2>&1 | grep -E "Input (Integrated|True Peak|LRA)" || true
ffmpeg -v error -i "$V" "$O/f_%04d.png"
ffmpeg -v error -i "$V" -vf "select='not(mod(n,6))',scale=320:-1,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=22:fontcolor=yellow:box=1:boxcolor=black,tile=6x3" -vsync 0 -q:v 3 "$O/sheet_%02d.jpg"
ffmpeg -v error -y -i "$V" -lavfi "showspectrumpic=s=1900x700:legend=1:scale=log:fscale=log:start=40:stop=16000" "$O/spectrum.png" || true
ffmpeg -hide_banner -nostats -i "$V" -af silencedetect=noise=-42dB:d=0.08 -f null - 2>&1 | grep -oE "silence_(start|end): [0-9.]+" | paste - - || true
echo "frames: $(ls "$O"/f_*.png | wc -l) in $O"
