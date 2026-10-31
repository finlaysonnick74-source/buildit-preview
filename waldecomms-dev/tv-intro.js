/* Tomas's version: intro. Tomas builds from glowing points, his name and line land, then he glides into the hero. Loaded before app.js. */
(function(){
var eimg,raf=0,cv=null,sc=null,ele=null,P=null,E=null,img=null,txt=null,box=null,gliding=false;
function prep(cb){
 if(P)return cb();
 img=new Image();img.onload=function(){
  var w=150,h=Math.round(w*img.naturalHeight/img.naturalWidth),c=document.createElement('canvas');c.width=w;c.height=h;
  var x=c.getContext('2d');x.drawImage(img,0,0,w,h);var d=x.getImageData(0,0,w,h).data;
  function hr0(i,j){var o=(j*w+i)*4;return d[o]>110&&d[o]>d[o+1]*1.2&&d[o]>d[o+2]*1.4}function A(i,j){return(i<0||j<0||i>=w||j>=h)?0:d[(j*w+i)*4+3]}
  var pts=[],s=11;
  for(var j=0;j<h;j+=2)for(var i=0;i<w;i+=2){if(A(i,j)<128)continue;if(!hr0(i,j)&&((i+j)%2))continue;var edge=A(i-3,j)<128||A(i+3,j)<128||A(i,j-3)<128||A(i,j+3)<128;
   s=(s*16807)%2147483647;var r=s/2147483647;var o=(j*w+i)*4,hr=d[o]>110&&d[o]>d[o+1]*1.2&&d[o]>d[o+2]*1.4;if(hr||(edge?r<.75:r<.5)){s=(s*16807)%2147483647;var jx=(s/2147483647-.5)*2.6;s=(s*16807)%2147483647;var jy=(s/2147483647-.5)*2.6;pts.push({x:(i+jx)/w,y:(j+jy)/h,hr:hr})}}
  P=pts.map(function(p){s=(s*16807)%2147483647;var a=s/2147483647*6.283;s=(s*16807)%2147483647;var rr=.6+s/2147483647;return{hr:p.hr,x:p.x,y:p.y,ax:Math.cos(a)*rr,ay:Math.sin(a)*rr,ar:h/w}});
  E=[];var G={},cs=.03;P.forEach(function(p,i){var k=Math.floor(p.x/cs)+','+Math.floor(p.y*p.ar/cs);(G[k]=G[k]||[]).push(i)});
  P.forEach(function(p,i){var gx=Math.floor(p.x/cs),gy=Math.floor(p.y*p.ar/cs),best=[];for(var u=-1;u<=1;u++)for(var v=-1;v<=1;v++){(G[(gx+u)+','+(gy+v)]||[]).forEach(function(k){if(k===i)return;var q=P[k],dd=(q.x-p.x)*(q.x-p.x)+(q.y-p.y)*(q.y-p.y)*p.ar*p.ar;best.push([dd,k])})}
   best.sort(function(a,c){return a[0]-c[0]});best.slice(0,4).forEach(function(c){if(c[1]>i)E.push([i,c[1]])})});
  console.log&&0;
  cb()};
 img.src='img/tomas-silhouette.webp';
}

function layout(){var W=innerWidth,H=innerHeight,ar=P[0].ar,hh,ww,ox,oy,wide=W>=800;
 if(wide){hh=H*.66;ww=hh/ar;ox=W*.32-ww;oy=(H-hh)/2}else{hh=H*.44;ww=hh/ar;ox=W*.5-ww*.95;oy=H*.09}
 return{W:W,H:H,hh:hh,ww:ww,ox:ox,oy:oy,wide:wide}}
function start(intro){
 gliding=false;
 prep(function(){
  if(!cv){sc=document.createElement('div');sc.className='tv-scene';sc.setAttribute('aria-hidden','true');intro.appendChild(sc);ele=document.createElement('div');ele.className='tv-iele';eimg=new Image();eimg.alt='';eimg.src='img/tv-elephant-560.webp';ele.appendChild(eimg);sc.appendChild(ele);cv=document.createElement('canvas');cv.className='tv-icv';sc.appendChild(cv);
   txt=document.createElement('div');txt.className='tv-itxt';txt.innerHTML='<p class="tv-iname">Tomas</p><p class="tv-iline">Every site I build is a step forward.</p>';intro.appendChild(txt)}
  sc.style.transition='none';sc.style.transform='none';sc.style.opacity='1';ele.classList.remove('on');intro.style.transition='none';intro.style.backgroundColor='';
  txt.classList.remove('on','off');void txt.offsetWidth;
  var L=box=layout(),dpr=Math.min(devicePixelRatio||1,2);cv.width=L.W*dpr;cv.height=L.H*dpr;cv.style.width=L.W+'px';cv.style.height=L.H+'px';
  var eh=L.hh*.5;ele.style.height=eh+'px';ele.style.width=(eh*1.3667)+'px';ele.style.left=(L.ox+L.ww*.38)+'px';ele.style.top=(L.oy+L.hh*.4)+'px';var t0=Date.now(),eon=function(){setTimeout(function(){if(!gliding)ele.classList.add('on')},Math.max(0,250-(Date.now()-t0)))};(eimg.decode?eimg.decode():Promise.resolve()).then(eon,eon);
  txt.className='tv-itxt '+(L.wide?'w':'n');txt.style.top=L.wide?'50%':(L.oy+L.hh+18)+'px';if(L.wide)txt.style.left=(L.ox+L.ww*.38+eh*1.3667+L.W*.025)+'px';
  var x=cv.getContext('2d'),t0=performance.now(),ox=L.ox*dpr,oy=L.oy*dpr,ww=L.ww*dpr,hh=L.hh*dpr;
  function f(t){
   var k=Math.min(1,Math.max(0,(t-t0)/800)),e=1-Math.pow(1-k,4);x.clearRect(0,0,cv.width,cv.height);
   var q=P.map(function(p){var sc=(1-e);return[ox+(p.x+p.ax*sc)*ww,oy+(p.y+p.ay*sc*.8)*hh]});
   x.globalCompositeOperation='lighter';x.lineWidth=1.2*dpr;x.strokeStyle='rgba(80,140,255,'+(.2+.7*e)+')';x.beginPath();
   E.forEach(function(g){if(P[g[0]].hr&&P[g[1]].hr)return;x.moveTo(q[g[0]][0],q[g[0]][1]);x.lineTo(q[g[1]][0],q[g[1]][1])});x.stroke();
   x.lineWidth=1.8*dpr;x.strokeStyle='rgba(255,45,85,'+(.35+.65*e)+')';x.beginPath();
   E.forEach(function(g){if(!(P[g[0]].hr&&P[g[1]].hr))return;x.moveTo(q[g[0]][0],q[g[0]][1]);x.lineTo(q[g[1]][0],q[g[1]][1])});x.stroke();
   q.forEach(function(p,i){var r=(i%9?1.3:2.3)*dpr;x.fillStyle=P[i].hr?'#ff6b85':'rgba(122,164,255,.9)';x.fillRect(p[0]-r,p[1]-r,r*2,r*2)});
   if(k<1)raf=requestAnimationFrame(f)}
  cancelAnimationFrame(raf);raf=requestAnimationFrame(f);intro.classList.add('tv-i');
  setTimeout(function(){if(!gliding)txt.classList.add('on')},620);
 });
}
function glide(intro,done){
 if(gliding)return;gliding=true;
 var fin=function(){cancelAnimationFrame(raf);document.documentElement.classList.remove('tv-reveal');done()};
 if(!cv||!box){fin();return}
 txt.classList.add('on');
 ele.classList.add('on');var target=document.querySelector('.s1-fig .tv-me')||document.querySelector('.s1-fig img'),D=800;
 intro.style.transition='background-color '+(D-150)+'ms ease 150ms';intro.style.backgroundColor='rgba(4,5,10,0)';
 txt.classList.add('off');
 if(target){var r=target.getBoundingClientRect(),s=r.height/box.hh;
  sc.style.transition='transform '+D+'ms cubic-bezier(.65,0,.35,1),opacity 350ms ease '+(D-80)+'ms';
  requestAnimationFrame(function(){sc.style.transform='translate3d('+(r.left-box.ox*s)+'px,'+(r.top-box.oy*s)+'px,0) scale('+s+')';sc.style.opacity='0'});
  setTimeout(function(){document.documentElement.classList.add('tv-reveal')},D-120);
  setTimeout(fin,D+300);
 }else{sc.style.transition='opacity 500ms ease';sc.style.opacity='0';setTimeout(fin,550)}
}
window.TVI={start:start,glide:glide,stop:function(){cancelAnimationFrame(raf)}};
})();
