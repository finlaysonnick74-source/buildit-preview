/* Tomas's version: intro where the silhouette assembles from glowing points and lines. Loaded before app.js. */
(function(){
var raf=0,cv=null,P=null,E=null,img=null;
function prep(cb){
 if(P)return cb();
 img=new Image();img.onload=function(){
  var w=96,h=Math.round(w*img.naturalHeight/img.naturalWidth),c=document.createElement('canvas');c.width=w;c.height=h;
  var x=c.getContext('2d');x.drawImage(img,0,0,w,h);var d=x.getImageData(0,0,w,h).data;
  function A(i,j){return(i<0||j<0||i>=w||j>=h)?0:d[(j*w+i)*4+3]}
  var pts=[],s=11;
  for(var j=0;j<h;j+=2)for(var i=0;i<w;i+=2){if(A(i,j)<128)continue;var edge=A(i-2,j)<128||A(i+2,j)<128||A(i,j-2)<128||A(i,j+2)<128;
   s=(s*16807)%2147483647;var r=s/2147483647;if(edge?r<.55:r<.2)pts.push({x:i/w,y:j/h})}
  P=pts.map(function(p){s=(s*16807)%2147483647;var a=s/2147483647*6.283;s=(s*16807)%2147483647;var rr=.6+s/2147483647;return{x:p.x,y:p.y,ax:Math.cos(a)*rr,ay:Math.sin(a)*rr,ar:h/w}});
  E=[];P.forEach(function(p,i){var best=[];P.forEach(function(q,k){if(k===i)return;var dd=(q.x-p.x)*(q.x-p.x)+(q.y-p.y)*(q.y-p.y)*p.ar*p.ar;if(best.length<3||dd<best[2][0]){best.push([dd,k]);best.sort(function(a,b){return a[0]-b[0]});best.length=Math.min(best.length,3)}});best.forEach(function(b){if(b[0]<.006&&b[1]>i)E.push([i,b[1]])})});
  cb()};
 img.src='img/tomas-silhouette.webp';
}
function start(intro){
 prep(function(){
  if(!cv){cv=document.createElement('canvas');cv.className='tv-icv';cv.setAttribute('aria-hidden','true');intro.appendChild(cv)}
  var dpr=Math.min(devicePixelRatio||1,2),W=cv.width=innerWidth*dpr,H=cv.height=innerHeight*dpr,x=cv.getContext('2d');
  var hh=H*.6,ww=hh/P[0].ar,ox=W/2-ww/2,oy=H*.36,t0=performance.now();
  function f(t){
   var k=Math.min(1,(t-t0)/900),e=1-Math.pow(1-k,4);x.clearRect(0,0,W,H);
   var q=P.map(function(p){var sc=(1-e);return[ox+(p.x+p.ax*sc)*ww,oy+(p.y+p.ay*sc*.8)*hh]});
   x.globalCompositeOperation='lighter';x.lineWidth=1.2*dpr;x.strokeStyle='rgba(80,140,255,'+(.2+.7*e)+')';x.beginPath();
   E.forEach(function(g){x.moveTo(q[g[0]][0],q[g[0]][1]);x.lineTo(q[g[1]][0],q[g[1]][1])});x.stroke();
   x.fillStyle='rgba(122,164,255,.9)';q.forEach(function(p,i){var r=(i%9?1.3:2.4)*dpr;x.fillRect(p[0]-r,p[1]-r,r*2,r*2)});
   x.fillStyle='rgba(43,108,255,.12)';q.forEach(function(p,i){if(i%5===0){x.beginPath();x.arc(p[0],p[1],7*dpr,0,6.283);x.fill()}});
   raf=requestAnimationFrame(f)}
  cancelAnimationFrame(raf);raf=requestAnimationFrame(f);intro.classList.add('tv-i');
 });
}
function stop(){cancelAnimationFrame(raf)}
window.TVI={start:start,stop:stop};
})();
