const {chromium}=require('playwright'); const {spawn}=require('child_process'); const path=require('path');
const args=process.argv.slice(2); const mode=args[0];
(async()=>{const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 p.on('pageerror',e=>console.log('pageerror',e.message)); p.on('console',m=>{if(m.type()==='error')console.log('err',m.text())});
 await p.goto('file://'+path.resolve('comp.html')+(process.env.REF?'#ref':'')); await p.evaluate(()=>window.prep());
 if(mode==='stills'){ for(const f of args.slice(1).map(Number)){await p.evaluate(f=>window.render(f),f); await p.screenshot({path:`out/still_${String(f).padStart(4,'0')}.png`});} }
 else { const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','png','-i','-','-c:v','libx264','-profile:v','high','-pix_fmt','yuv420p','-b:v','9M','-maxrate','11M','-bufsize','18M','-preset','slow','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-vf','scale=out_color_matrix=bt709:out_range=tv','-movflags','+faststart','-r','30',args[1]],{stdio:['pipe','inherit','inherit']});
   for(let f=0;f<600;f++){await p.evaluate(f=>window.render(f),f); const buf=await p.screenshot({type:'png'}); if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(f%100===0)console.log('frame',f);}
   ff.stdin.end(); await new Promise(r=>ff.on('close',r)); }
 await b.close();})();
