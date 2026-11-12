#!/usr/bin/env node
// Records REAL website footage, one screenshot per video frame, driven by storyboard.capture.
//   node capture.js <workdir> [shotId ...]
// Output: <workdir>/site/<shot>_fNNNN.jpg (NNNN = timeline frame) and <workdir>/site/meta.json
// (cursor events for the composition + recorded values such as prices).
// url "local" serves this repository on port 8765 (the live domain may be blocked in cloud sessions).
// The site's three.js CDN script is answered from <workdir>/node_modules (see setup.sh).
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path'); const {spawn}=require('child_process'); const http=require('http');
const REPO=path.resolve(__dirname,'../../../..');
const W=path.resolve(process.argv[2]||'.'); const only=process.argv.slice(3);
const sb=JSON.parse(fs.readFileSync(path.join(W,'storyboard.json'),'utf8')); const C=sb.capture;
const [VW,VH]=C.viewport||[390,464], DSF=C.scale||4;
const eio=t=>t<0?0:t>1?1:(t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2);
const up=u=>new Promise(r=>http.get(u,res=>{res.resume();r(res.statusCode<500)}).on('error',()=>r(false)));
(async()=>{
 let server=null, url=C.url||'local';
 if(url==='local'){ url='http://localhost:8765/';
  if(!(await up(url))){ server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{cwd:REPO,stdio:'ignore'}); for(let i=0;i<40&&!(await up(url));i++) await new Promise(r=>setTimeout(r,150)); } }
 const three=path.join(W,'node_modules/three/build/three.min.js');
 const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const ctx=await b.newContext({viewport:{width:VW,height:VH},deviceScaleFactor:DSF,colorScheme:C.theme||'dark',locale:'ar'});
 if(fs.existsSync(three)) await ctx.route('**/three.min.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync(three)}));
 await ctx.route('https://wa.me/**',r=>r.abort());              // never send a real WhatsApp message
 const p=await ctx.newPage(); p.on('pageerror',e=>console.log('PAGE ERROR',e.message));
 await p.goto(url,{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
 fs.mkdirSync(path.join(W,'site'),{recursive:true});
 const metaP=path.join(W,'site','meta.json');
 const meta=fs.existsSync(metaP)&&only.length?JSON.parse(fs.readFileSync(metaP,'utf8')):{viewport:[VW,VH],shots:{},events:[],records:{}};
 const rect=s=>p.evaluate(s=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height,cx:r.x+r.width/2,cy:r.y+r.height/2}},s);
 const need=async s=>{const r=await rect(s); if(!r) throw new Error('selector not found: '+s); return r;};
 const sy=()=>p.evaluate(()=>scrollY);
 const text=s=>p.evaluate(s=>{const e=document.querySelector(s);return e?(e.value!==undefined&&e.tagName!=='BUTTON'?e.value:e.textContent).trim():null},s);
 const pt=(r,a)=>({x:r.cx+(a.dx||0),y:r.cy+(a.dy||0)});
 let lastCursor=null, lastFrame=-1;
 for(const shot of C.shots){
  if(only.length&&!only.includes(shot.id)) { continue; }
  meta.events=meta.events.filter(e=>e.shot!==shot.id); meta.shots[shot.id]={from:shot.from,to:shot.to};
  lastCursor=null; lastFrame=-1;
  const ev=(frame,q,type)=>{frame=Math.max(frame,lastFrame); meta.events.push({shot:shot.id,frame,x:Math.round(q.x),y:Math.round(q.y),type}); lastCursor={x:q.x,y:q.y}; lastFrame=frame;};
  const acts=(shot.actions||[]).map(a=>({...a}));
  for(let f=shot.from;f<=shot.to;f++){
   for(const a of acts){
    const at=a.at!=null?a.at:a.from;
    if(a.type==='scroll'){ if(f===a.from){a._y0=await sy(); a._y1=a.y!=null?a.y:Math.round((await need(a.target)).y+a._y0-(a.offset||0));}
     if(f>=a.from&&f<=a.to) await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),Math.round(a._y0+(a._y1-a._y0)*(a.to===a.from?1:eio((f-a.from)/(a.to-a.from))))); }
    if(f!==at) continue;
    if(a.type==='cursor') ev(f,{x:a.x,y:a.y},'start');
    if(a.type==='hide') ev(f,lastCursor||{x:0,y:0},'hide');
    if(a.type==='wait') await p.waitForTimeout(a.ms||500);
    if(a.type==='click'||a.type==='press'){ const r=await need(a.target), q=pt(r,a), travel=a.travel||16;
     if(lastCursor&&lastFrame<f-4-travel) ev(f-4-travel,lastCursor,'move');
     ev(f-4,q,'move'); ev(f,q,'click'); await p.mouse.move(q.x,q.y);
     if(a.type==='press') await p.mouse.down();                 // pressed, not released: shows the press without navigating away
     else if(a.real!==false) await p.mouse.click(q.x,q.y); }
    if(a.type==='select') await p.selectOption(a.target,a.value);
    if(a.type==='check') await p.check(a.target);
    if(a.type==='upload'){ await p.setInputFiles(a.input||'input[type=file]',path.resolve(W,a.file)); await p.waitForTimeout(a.ms||1200); }
    if(a.type==='record'){ meta.records[a.name]={frame:f,text:await text(a.target),rect:await rect(a.target)}; }
    if(a.type==='drag'){ const r=await need(a.target), q=pt(r,a); a._q=q; if(lastCursor&&lastFrame<f-16) ev(f-16,lastCursor,'move'); ev(f-2,q,'move'); ev(f,q,'down'); await p.mouse.move(q.x,q.y); await p.mouse.down(); }
    if(a.log) console.log(`  ${shot.id} f${f} ${a.type}: ${a.log} = ${await text(a.log)}`);
   }
   for(const a of acts) if(a.type==='drag'&&a._q&&f>a.at&&f<=a.to){ const t=eio((f-a.at)/(a.to-a.at)), x=a._q.x+a.by[0]*t, y=a._q.y+a.by[1]*t+(a.by[2]||0)*Math.sin(t*Math.PI);
     await p.mouse.move(x,y); if((f-a.at)%4===0||f===a.to) ev(f,{x,y},f===a.to?'up':'drag'); if(f===a.to) await p.mouse.up(); }
   await p.waitForTimeout(25);
   await p.screenshot({path:path.join(W,'site',`${shot.id}_f${String(f).padStart(4,'0')}.jpg`),type:'jpeg',quality:93});
  }
  console.log(`shot ${shot.id}: frames ${shot.from}-${shot.to} captured`);
 }
 fs.writeFileSync(metaP,JSON.stringify(meta,null,1)); console.log('records:',JSON.stringify(Object.fromEntries(Object.entries(meta.records).map(([k,v])=>[k,v.text]))));
 await b.close(); if(server) server.kill();
})().catch(e=>{console.error(e);process.exit(1);});
