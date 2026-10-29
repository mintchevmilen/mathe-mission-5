// Optional (braucht Playwright): node tests/svg-layout.check.cjs <Projektordner>
// Zeichnet viele Aufgaben mit Grafik und prueft, dass kein Text abgeschnitten wird und Quadrate quadratisch sind.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:360,height:700}});
 await pg.setContent('<style>.gsvg{width:100%;max-width:300px;height:auto;display:block}</style><div id=o></div>');
 await pg.addScriptTag({content:fs.readFileSync(process.argv[2]+'/js/data.js','utf8')+'\n'+fs.readFileSync(process.argv[2]+'/js/gen.js','utf8')+'\nwindow.GEN=GEN;window.erz=erzeugeAufgabe;window.KAP=KAPITEL;'});
 const res=await pg.evaluate(()=>{
  const bad=[];let n=0;const o=document.getElementById('o');
  const ids=KAP.flatMap(k=>k.themen.map(t=>t.id));
  for(const id of ids)for(const l of [1,2,3])for(let i=0;i<60;i++){
    const a=erz(id,l);if(!a||!a.grafik)continue;n++;
    o.innerHTML=a.grafik;const svg=o.querySelector('svg');const vb=svg.viewBox.baseVal;
    for(const el of svg.querySelectorAll('text,rect,polygon,circle,line')){
      const bb=el.getBBox();
      if(bb.x<-0.5||bb.y<-0.5||bb.x+bb.width>vb.width+0.5||bb.y+bb.height>vb.height+0.5){bad.push([id,l,el.tagName,el.textContent.slice(0,12),Math.round(bb.x),Math.round(bb.y),Math.round(bb.x+bb.width),Math.round(bb.y+bb.height),vb.width,vb.height]);break;}
    }
    // Quadrat-Check
    const r=svg.querySelector('rect[fill^="rgba(79"]');
    if(r&&/Quadrat/.test(o.textContent)){const w=+r.getAttribute('width'),h=+r.getAttribute('height');if(Math.abs(w-h)>0.5)bad.push([id,l,'quadrat nicht quadratisch',w,h]);}
  }
  return {n,bad:bad.slice(0,12),badN:bad.length};
 });
 console.log(JSON.stringify(res));await b.close();})();
