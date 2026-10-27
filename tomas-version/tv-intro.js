/* Tomas's version: intro where the silhouette assembles from glowing points and lines. Loaded before app.js. */
(function(){
var raf=0,cv=null,P=null,E=null,img=null;
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
function start(intro){
 prep(function(){
  if(!cv){cv=document.createElement('canvas');cv.className='tv-icv';cv.setAttribute('aria-hidden','true');intro.appendChild(cv)}
  var dpr=Math.min(devicePixelRatio||1,2),W=cv.width=innerWidth*dpr,H=cv.height=innerHeight*dpr,x=cv.getContext('2d');
  var hh=H*.78,ww=hh/P[0].ar,ox=W/2-ww/2,oy=H*.11,t0=performance.now();
  function f(t){
   var k=Math.min(1,(t-t0)/900),e=1-Math.pow(1-k,4);x.clearRect(0,0,W,H);
   var q=P.map(function(p){var sc=(1-e);return[ox+(p.x+p.ax*sc)*ww,oy+(p.y+p.ay*sc*.8)*hh]});
   x.globalCompositeOperation='lighter';x.fillStyle='rgba(43,108,255,'+(.05*e)+')';x.beginPath();E.forEach(function(g,n){if(n%3)return;var a=q[g[0]],c=q[g[1]];x.moveTo(a[0],a[1]);x.lineTo(c[0],c[1]);x.lineTo((a[0]+c[0])/2+(c[1]-a[1])*.5,(a[1]+c[1])/2-(c[0]-a[0])*.5)});x.fill();x.lineWidth=1.2*dpr;x.strokeStyle='rgba(80,140,255,'+(.2+.7*e)+')';x.beginPath();
   E.forEach(function(g){if(P[g[0]].hr&&P[g[1]].hr)return;x.moveTo(q[g[0]][0],q[g[0]][1]);x.lineTo(q[g[1]][0],q[g[1]][1])});x.stroke();x.lineWidth=1.8*dpr;x.strokeStyle='rgba(255,45,85,'+(.35+.65*e)+')';x.beginPath();E.forEach(function(g){if(!(P[g[0]].hr&&P[g[1]].hr))return;x.moveTo(q[g[0]][0],q[g[0]][1]);x.lineTo(q[g[1]][0],q[g[1]][1])});x.stroke();
   q.forEach(function(p,i){var r=(i%9?1.3:2.4)*dpr;x.fillStyle=P[i].hr?'#ff6b85':'rgba(122,164,255,.9)';x.fillRect(p[0]-r,p[1]-r,r*2,r*2)});
   x.fillStyle='rgba(43,108,255,.12)';q.forEach(function(p,i){if(i%5===0){x.beginPath();x.arc(p[0],p[1],7*dpr,0,6.283);x.fill()}});
   raf=requestAnimationFrame(f)}
  cancelAnimationFrame(raf);raf=requestAnimationFrame(f);intro.classList.add('tv-i');
 });
}
function stop(){cancelAnimationFrame(raf)}
window.TVI={start:start,stop:stop};
})();
