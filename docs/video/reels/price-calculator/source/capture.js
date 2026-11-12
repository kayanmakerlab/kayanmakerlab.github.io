const {chromium}=require('playwright'); const fs=require('fs');
const VW=390,VH=464,DSF=4;
const ease=t=>t<0?0:t>1?1:(t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2);
(async()=>{
 const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const ctx=await b.newContext({viewport:{width:VW,height:VH},deviceScaleFactor:DSF,colorScheme:'dark',locale:'ar'});
 await ctx.route('**/three.min.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync('node_modules/three/build/three.min.js')}));
 await ctx.route('https://wa.me/**',r=>r.abort());
 const p=await ctx.newPage(); p.on('pageerror',e=>console.log('pageerror',e.message));
 await p.goto('http://localhost:8765/',{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
 const meta={vw:VW,vh:VH,events:[],log:[]};
 const scrollTo=y=>p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);
 const scrollY=()=>p.evaluate(()=>scrollY);
 const rect=async sel=>p.evaluate(s=>{const e=document.querySelector(s);const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,cx:r.x+r.width/2,cy:r.y+r.height/2}},sel);
 const docY=async sel=>(await rect(sel)).y+(await scrollY());
 const shot=async(scene,f)=>{await p.waitForTimeout(25);await p.screenshot({path:`site/s${scene}_f${String(f).padStart(4,'0')}.jpg`,type:'jpeg',quality:93});};
 const ev=(scene,frame,pt,type)=>meta.events.push({scene,frame,x:Math.round(pt.x),y:Math.round(pt.y),type});
 const note=async(k)=>{meta.log.push(k);console.log(k)};

 // ---------- S1: open + browse hero (f0..94)
 for(let f=0;f<=94;f++){ await scrollTo(Math.round(150*ease((f-30)/55))); await shot(1,f); }

 // ---------- S2: upload (f86..214)
 const viewY=await docY('#view'); const s2a=viewY-250, s2b=viewY-110;
 let dz;
 for(let f=86;f<=214;f++){
   await scrollTo(Math.round(s2a+(s2b-s2a)*ease((f-94)/22)));
   if(f===120){dz=await rect('#view'); ev(2,96,{x:330,y:430},'start'); ev(2,146,{x:dz.cx+10,y:dz.cy+25},'move');}
   if(f===146){await p.mouse.move(dz.cx+10,dz.cy+25);}
   if(f===150){ev(2,150,{x:dz.cx+10,y:dz.cy+25},'click');}
   if(f===153){await p.setInputFiles('#file','stl/vase.stl');}
   if(f===154){await p.waitForTimeout(900); await note('fname='+await p.evaluate(()=>document.getElementById('fname').textContent)+' has='+await p.evaluate(()=>document.getElementById('view').classList.contains('has')));}
   // real drag on the preview to rotate (site feature: اسحب للتدوير)
   if(f===172){const r=await rect('#cv'); meta.cv=r; ev(2,172,{x:r.cx+40,y:r.cy+10},'move'); await p.mouse.move(r.cx+40,r.cy+10); await p.mouse.down(); ev(2,174,{x:r.cx+40,y:r.cy+10},'down');}
   if(f>172&&f<=204){const r=meta.cv; const t=ease((f-172)/32); const x=r.cx+40-110*t,y=r.cy+10+14*Math.sin(t*Math.PI); await p.mouse.move(x,y); if(f%4===0||f===204)ev(2,f,{x,y},'drag');}
   if(f===205){await p.mouse.up(); ev(2,205,{x:meta.cv.cx-70,y:meta.cv.cy+10},'up');}
   await shot(2,f);
 }

 // ---------- S3: options + price (f206..364)
 const matY=await docY('#mat'); const qualY=await docY('#qual'); const priceY=await docY('#sP');
 const s3a=matY-170, s3b=qualY-150, s3c=priceY-210;
 await note(`matY ${matY} qualY ${qualY} priceY ${priceY}`);
 let m,q,c,pl,pr;
 for(let f=206;f<=364;f++){
   let y=s3a; if(f>=244) y=s3a+(s3b-s3a)*ease((f-244)/16); if(f>=318) y=s3b+(s3c-s3b)*ease((f-318)/18);
   await scrollTo(Math.round(y));
   if(f===214){m=await rect('#mat'); ev(3,214,{x:60,y:420},'start'); ev(3,230,{x:m.cx,y:m.cy},'move'); }
   if(f===230){await p.mouse.move(m.cx,m.cy);}
   if(f===232){ev(3,232,{x:m.cx,y:m.cy},'click');}
   if(f===235){await p.selectOption('#mat','PETG'); await note('mat='+await p.inputValue('#mat')+' price='+await p.textContent('#sP'));}
   if(f===262){q=await rect('#qual label:nth-of-type(2)'); ev(3,274,{x:q.cx,y:q.cy},'move');}
   if(f===274){await p.mouse.move(q.cx,q.cy);}
   if(f===276){ev(3,276,{x:q.cx,y:q.cy},'click'); await p.mouse.click(q.cx,q.cy);}
   if(f===278){await note('qual='+await p.evaluate(()=>document.querySelector('#qual input:checked').value)+' price='+await p.textContent('#sP')); c=await rect('#colors label:nth-of-type(1)'); ev(3,290,{x:c.cx,y:c.cy},'move');}
   if(f===290){await p.mouse.move(c.cx,c.cy);}
   if(f===292){ev(3,292,{x:c.cx,y:c.cy},'click'); await p.mouse.click(c.cx,c.cy);}
   if(f===294){await note('color='+await p.textContent('#cname')); pl=await rect('.stepper button[data-d="1"]'); ev(3,306,{x:pl.cx,y:pl.cy},'move');}
   if(f===306){await p.mouse.move(pl.cx,pl.cy);}
   if(f===308){ev(3,308,{x:pl.cx,y:pl.cy},'click'); await p.mouse.click(pl.cx,pl.cy);}
   if(f===310){await note('qty='+await p.inputValue('#qty')+' price='+await p.textContent('#sP'));}
   if(f===316){ev(3,316,{x:pl.cx,y:pl.cy},'hide');}
   if(f===340){pr=await rect('#sP'); meta.price=pr; meta.priceRow=await rect('.price');}
   await shot(3,f);
 }

 // ---------- S4: WhatsApp button (f356..484)
 const sendY=await docY('#send'); const s4a=s3c, s4b=sendY-300;
 let sd;
 for(let f=356;f<=484;f++){
   await scrollTo(Math.round(s4a+(s4b-s4a)*ease((f-388)/20)));
   if(f===357){meta.priceRow4=await rect('.price');}
   if(f===410){sd=await rect('#send'); meta.send=sd; meta.priceRow4b=await rect('.price'); ev(4,404,{x:70,y:120},'start'); ev(4,428,{x:sd.cx-30,y:sd.cy+4},'move');}
   if(f===428){await p.mouse.move(sd.cx-30,sd.cy+4);}
   if(f===432){ev(4,432,{x:sd.cx-30,y:sd.cy+4},'click'); await p.mouse.down();}
   if(f===435){await p.mouse.move(sd.cx-30,sd.cy+5);}
   await shot(4,f);
 }
 meta.finalPrice=await p.textContent('#sP'); meta.disabled=await p.evaluate(()=>document.getElementById('send').disabled);
 fs.writeFileSync('site/meta.json',JSON.stringify(meta,null,1)); console.log('final price',meta.finalPrice,'send disabled',meta.disabled);
 await b.close();
})();
