/* Tomas's version: lightweight scroll motion + original low-poly elephant */
(function(){
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var d=document,b=d.body;
var g=d.createElement('div');g.className='tv-grid';g.setAttribute('aria-hidden','true');b.prepend(g);
var pr=d.createElement('div');pr.className='tv-prog';pr.setAttribute('aria-hidden','true');b.appendChild(pr);
// reveals
var els=d.querySelectorAll('.cards>li,.fs-slot,.vals li,.sh,.phead .hero-h');
if(!RM&&'IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('tv-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
 els.forEach(function(el,i){el.classList.add(el.matches('.cards>li')?'tv-clip':'tv-up');el.style.transitionDelay=(i%5)*70+'ms';io.observe(el)});
}
// elephant section on home only
var ele=null,cv=null;
var proof=d.getElementById('proof');
if(proof){
 ele=d.createElement('section');ele.className='tv-ele';ele.setAttribute('aria-label','Moving design');
 ele.innerHTML='<div class="pin"><div class="big" aria-hidden="true">BUILD IT</div><canvas width="1600" height="1000" role="img" aria-label="An animated low-poly elephant that assembles as you scroll"></canvas><div class="cap"><h2>Big ideas, built light.</h2><p>Every line here is code I wrote. Scroll to build it.</p></div></div>';
 proof.parentNode.insertBefore(ele,proof);cv=ele.querySelector('canvas');
}
var P=[],E=[];
if(cv){
 // original elephant silhouette (facing right) in a 100x70 box
 var body=new Path2D('M10 40C10 22 25 14 45 15C55 8 72 6 82 14C90 20 92 30 90 38C89 48 92 58 96 64L93 66C86 60 83 50 82 44C80 46 78 47 76 46L76 62L68 62L67 48C58 50 45 50 36 48L35 62L27 62L26 46C18 44 12 44 10 40Z');
 var ear=new Path2D('M66 16C58 18 56 30 60 38C64 42 70 40 72 34C74 26 72 18 66 16Z');
 var t=d.createElement('canvas').getContext('2d');
 var seed=7;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
 // edge points
 var edgePts=[[10,40],[14,27],[25,18],[45,15],[55,9],[72,7],[82,14],[89,22],[90,38],[90,50],[96,64],[93,66],[86,58],[82,44],[76,46],[76,62],[68,62],[67,48],[50,50],[36,48],[35,62],[27,62],[26,46],[16,43],[66,16],[60,24],[60,38],[71,36],[73,24],[8,36],[6,46]];
 edgePts.forEach(function(p){P.push({x:p[0],y:p[1],ear:false})});
 var tries=0;while(P.length<95&&tries++<6000){var x=8+rnd()*88,y=6+rnd()*60;if(t.isPointInPath(body,x,y)){var ok=true;for(var i=0;i<P.length;i++){var dx=P[i].x-x,dy=P[i].y-y;if(dx*dx+dy*dy<16){ok=false;break}}if(ok)P.push({x:x,y:y})}}
 P.forEach(function(p){p.ear=t.isPointInPath(ear,p.x,p.y);p.sx=(rnd()-.5)*260;p.sy=(rnd()-.5)*180;p.ph=rnd()*6.28});
 // edges: connect each point to its 3 nearest neighbours
 var seen={};P.forEach(function(p,i){var ds=P.map(function(q,j){return[(q.x-p.x)*(q.x-p.x)+(q.y-p.y)*(q.y-p.y),j]}).sort(function(a,c){return a[0]-c[0]});for(var k=1;k<=3;k++){var j=ds[k][1],key=i<j?i+'-'+j:j+'-'+i;if(!seen[key]&&ds[k][0]<160){seen[key]=1;E.push([i,j])}}});
 var cx=cv.getContext('2d');
}
var sy=0,tick=false,last=-1,t0=performance.now();
function draw(prog,time){
 var W=cv.width,H=cv.height,cx2=cv.getContext('2d');cx2.clearRect(0,0,W,H);
 var s=Math.min(W/110,H/78),ox=W/2-53*s,oy=H/2-40*s;
 var a=Math.min(1,Math.max(0,prog*2.4)); // assemble
 var e=1-Math.pow(1-a,3), walk=prog*6.28*2;
 var pts=P.map(function(p){var bob=RM?0:Math.sin(time/900+p.ph)*0.6;var x=p.x+(1-e)*p.sx,y=p.y+(1-e)*p.sy+bob;
  if(p.y>48&&!RM){y+=Math.sin(walk+(p.x>50?0:3.14))*1.2*e}
  if(p.x>84&&p.y>40&&!RM){x+=Math.sin(time/700)*1.4*e}
  return[ox+x*s,oy+y*s]});
 cx2.save();cx2.translate(ox,oy);cx2.scale(s,s);cx2.lineWidth=1.6/s;cx2.strokeStyle='rgba(122,164,255,'+(0.55*e*e)+')';cx2.stroke(body);cx2.fillStyle='rgba(43,108,255,'+(0.06*e)+')';cx2.fill(body);cx2.strokeStyle='rgba(255,59,92,'+(0.6*e*e)+')';cx2.stroke(ear);cx2.restore();
 cx2.lineWidth=1.2;
 E.forEach(function(ed){var A=pts[ed[0]],B=pts[ed[1]];var ear=P[ed[0]].ear&&P[ed[1]].ear;cx2.strokeStyle=ear?'rgba(255,59,92,'+(0.25+0.6*e)+')':'rgba(43,108,255,'+(0.18+0.6*e)+')';cx2.beginPath();cx2.moveTo(A[0],A[1]);cx2.lineTo(B[0],B[1]);cx2.stroke()});
 pts.forEach(function(q,i){cx2.fillStyle=P[i].ear?'#ff3b5c':(i%7?'#7aa4ff':'#eef2ff');cx2.beginPath();cx2.arc(q[0],q[1],i%7?2.2:3.4,0,6.28);cx2.fill()});
}
function frame(time){
 tick=false;
 var h=d.documentElement.scrollHeight-innerHeight;pr.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
 var f=d.querySelector('.s1-fig');if(f&&!RM)f.style.transform='translate3d(0,'+(scrollY*-0.18)+'px,0)';
 if(cv){var r=ele.getBoundingClientRect();var prog=RM?1:Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
  var big=ele.querySelector('.big');if(!RM)big.style.transform='translate3d('+(30-prog*60)+'%,50%,0)';
  if(r.bottom>0&&r.top<innerHeight){draw(prog,time||performance.now());if(!RM){tick=true;requestAnimationFrame(frame);return}}}
}
function onS(){if(!tick){tick=true;requestAnimationFrame(frame)}}
addEventListener('scroll',onS,{passive:true});addEventListener('resize',onS);onS();
})();
