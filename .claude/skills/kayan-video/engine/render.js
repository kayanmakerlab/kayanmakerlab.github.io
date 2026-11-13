#!/usr/bin/env node
// KAYAN MAKER LAB video renderer.
//   node render.js <workdir> stills <frame> [<frame> ...]   -> <workdir>/out/still_NNNN.png
//   node render.js <workdir> video [out.mp4]                 -> <workdir>/out/<slug>.mp4 (muxes storyboard.audio if set)
// Reads <workdir>/storyboard.json and <workdir>/site/meta.json (written by capture.js).
// The logo is read from the website's own index.html (symbols logo-mark / logo-word).
const {chromium}=require('playwright'); const {spawn,execFileSync}=require('child_process');
const fs=require('fs'); const path=require('path');
const ENGINE=__dirname, REPO=path.resolve(ENGINE,'../../../..');
const [work,mode,...rest]=process.argv.slice(2);
if(!work||!mode){console.error('usage: render.js <workdir> stills|video ...');process.exit(1);}
const W=path.resolve(work); const sb=JSON.parse(fs.readFileSync(path.join(W,'storyboard.json'),'utf8'));
const metaP=path.join(W,'site','meta.json'); const meta=fs.existsSync(metaP)?JSON.parse(fs.readFileSync(metaP,'utf8')):{shots:{},events:[]};

// ---- validate storyboard against the guide
const errs=[], warns=[];
if(!(sb.frames>0)) errs.push('frames missing');
if(sb.frames>(sb.maxFrames||600)) errs.push(`frames ${sb.frames} > maxFrames ${sb.maxFrames||600} (20 s)`);
let prev=-1; sb.scenes.forEach((s,i)=>{ if(s.start<=prev) errs.push(`scene ${i} start not increasing`); prev=s.start;
 if(s.type==='site'&&!meta.shots[s.shot]) errs.push(`scene ${i}: shot "${s.shot}" not captured (run capture.js)`);
 const end=i<sb.scenes.length-1?sb.scenes[i+1].start:sb.frames;
 if(end-s.start<45&&s.type!=='outro') warns.push(`scene ${i} is ${((end-s.start)/30).toFixed(2)} s (guide: 1.5–5.4 s)`);
 (s.headlines||[]).forEach(h=>{ if(h.lines.length>2) errs.push(`scene ${i}: headline has ${h.lines.length} lines (max 2)`);
  h.lines.forEach(l=>{ if(l.length>4) warns.push(`scene ${i}: line "${l.join(' ')}" has ${l.length} words (guide max 4)`); });
  if(h.start<s.start-3||(h.end!=null&&h.end>end)) warns.push(`scene ${i}: headline "${h.lines[0][0]}…" outside its scene`); }); });
sb.scenes.forEach((s,i)=>{ if(!['site','image','text','photo','brand','outro'].includes(s.type)) errs.push(`scene ${i}: unknown type ${s.type}`);
 if((s.type==='photo'||s.type==='image')&&s.src&&!/^(https?|file|data):/.test(s.src)&&!fs.existsSync(path.resolve(W,s.src))) errs.push(`scene ${i}: image not found ${s.src}`);
 if(s.type==='brand'&&!s.sub) errs.push(`scene ${i}: brand scene needs "sub"`); });
const last=sb.scenes[sb.scenes.length-1]; if(last.type!=='outro') errs.push('last scene must be the outro (guide section 8)');
if(last.type==='outro'){ const nd=(last.phone||'81 424 535').replace(/\s/g,'').length; if(last.digits&&last.digits.length!==nd) errs.push(`outro: ${last.digits.length} digit times for ${nd} digits`);
 const lastDigit=last.start+Math.max(...(last.digits||[last.timing==='compact'?41+5*(nd-1):81+10*(nd-1)]));
 if(last.timing==='compact') warns.push('outro uses compact timing (deviation: master outro is ~6.5 s)'); if(sb.frames-(lastDigit+15)<24) warns.push(`outro hold after last digit is ${sb.frames-lastDigit-15} frames (guide: >= 24)`); }
warns.forEach(w=>console.log('WARN',w)); if(errs.length){errs.forEach(e=>console.log('ERROR',e));process.exit(2);}

// ---- logo from the website
const html=fs.readFileSync(path.join(REPO,'index.html'),'utf8');
const sym=id=>{const m=html.match(new RegExp(`<symbol id="${id}" viewBox="([^"]+)">([\\s\\S]*?)</symbol>`)); if(!m) throw new Error('logo symbol '+id+' not found in index.html'); return {viewBox:m[1],body:m[2]};};
const mk=sym('logo-mark'), wd=sym('logo-word');
const LOGO_MARK={viewBox:mk.viewBox,body:mk.body,outline:(mk.body.match(/<path fill="currentColor" d="([^"]+)"/)||[])[1]};
const LOGO_WORD={viewBox:wd.viewBox,main:(wd.body.match(/<path fill="currentColor"[^>]*\/>/g)||[]).join('').replace(/fill="currentColor"/g,''),sub:(wd.body.match(/<path class="lb"[^>]*\/>/g)||[]).join('').replace(/class="lb"/g,'')};

let page=fs.readFileSync(path.join(ENGINE,'template.html'),'utf8')
 .replace(/__FONTS__/g,'file://'+path.join(ENGINE,'fonts'))
 .replace('__SB__',JSON.stringify(sb)).replace('__META__',JSON.stringify(meta))
 .replace('__LOGO_MARK__',JSON.stringify(LOGO_MARK)).replace('__LOGO_WORD__',JSON.stringify(LOGO_WORD));
fs.writeFileSync(path.join(W,'comp.html'),page); fs.mkdirSync(path.join(W,'out'),{recursive:true});

(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 p.on('pageerror',e=>{console.log('PAGE ERROR',e.message);process.exitCode=3;});
 await p.goto('file://'+path.join(W,'comp.html')); const pw=await p.evaluate(()=>window.prep()); pw.forEach(w=>console.log('WARN',w));
 if(mode==='stills'){
  for(const f of rest.map(Number)){await p.evaluate(f=>window.render(f),f); const o=path.join(W,'out',`still_${String(f).padStart(4,'0')}.png`); await p.screenshot({path:o}); console.log(o);}
 } else if(mode==='video'){
  const silent=path.join(W,'out','_silent.mp4');
  const out=rest[0]?path.resolve(rest[0]):path.join(W,'out',(sb.slug||'reel')+'.mp4');
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','png','-i','-','-c:v','libx264','-profile:v','high','-pix_fmt','yuv420p',
   '-b:v','9M','-maxrate','11M','-bufsize','18M','-preset','slow','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv',
   '-vf','scale=out_color_matrix=bt709:out_range=tv','-movflags','+faststart','-r','30',silent],{stdio:['pipe','inherit','inherit']});
  for(let f=0;f<sb.frames;f++){await p.evaluate(f=>window.render(f),f); const buf=await p.screenshot({type:'png'});
   if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(f%60===0) process.stdout.write(`frame ${f}/${sb.frames}\r`);}
  ff.stdin.end(); await new Promise(r=>ff.on('close',r));
  if(sb.audio){ // guide 1 + 7: AAC 48 kHz 128 kbps, mono voice on both channels, loudness of the reference unless overridden
   const a=path.resolve(W,sb.audio), lufs=sb.loudness!=null?sb.loudness:-23.6, off=(sb.audioOffset||0);
   execFileSync('ffmpeg',['-v','error','-y','-i',silent,'-itsoffset',String(off),'-i',a,'-map','0:v','-map','1:a','-c:v','copy',
    '-af',`pan=stereo|c0=c0|c1=c0,loudnorm=I=${lufs}:TP=-1.5:LRA=7,aresample=48000`,'-c:a','aac','-b:a','128k','-ar','48000','-t',String(sb.frames/30),'-movflags','+faststart',out],{stdio:'inherit'});
  } else fs.renameSync(silent,out);
  if(fs.existsSync(silent)) fs.unlinkSync(silent);
  console.log('\nwrote',out, sb.audio?'(with audio)':'(SILENT: no storyboard.audio)');
 }
 await b.close();
})();
