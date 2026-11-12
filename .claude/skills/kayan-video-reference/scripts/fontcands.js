#!/usr/bin/env node
// fontcands.js <outdir> "<text>" [family ...]
// Renders <text> (RTL) at 200px in every weight of each candidate Google font (via @fontsource, installed on the fly
// into <outdir>/node_modules), white on black, one PNG per family/weight: <outdir>/<family>_<weight>.png
const {execSync}=require('child_process'); const fs=require('fs'); const path=require('path'); const {chromium}=require('playwright');
const [out,text,...fam]=process.argv.slice(2);
const fams=fam.length?fam:['ibm-plex-sans-arabic','rubik','readex-pro','alexandria','tajawal','cairo','almarai','noto-kufi-arabic','noto-sans-arabic','changa','baloo-bhaijaan-2','vazirmatn','kufam','mada','el-messiri'];
fs.mkdirSync(out,{recursive:true}); if(!fs.existsSync(path.join(out,'package.json'))) fs.writeFileSync(path.join(out,'package.json'),'{"private":true}');
execSync(`npm i --no-audit --no-fund --silent ${fams.map(f=>'@fontsource/'+f).join(' ')}`,{cwd:out,stdio:'inherit'});
(async()=>{const b=await chromium.launch(); const p=await b.newPage({viewport:{width:2600,height:600}});
 for(const f of fams){ const dir=path.join(out,'node_modules/@fontsource',f,'files');
  for(const file of fs.readdirSync(dir).filter(x=>/-(arabic|latin)-\d00-normal\.woff2$/.test(x))){
   const m=file.match(/-(arabic|latin)-(\d00)-normal\.woff2$/), sub=m[1], w=m[2];
   const d=fs.readFileSync(path.join(dir,file)).toString('base64');
   await p.setContent(`<style>@font-face{font-family:X;src:url(data:font/woff2;base64,${d})} body{margin:0;background:#000;color:#fff} div{font:200px X;line-height:2.4;direction:rtl;white-space:nowrap;padding:0 80px;display:inline-block}</style><div>${text}</div>`);
   await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(40);
   await p.screenshot({path:path.join(out,`${f}_${w}_${sub}.png`)}); }}
 await b.close();})();
