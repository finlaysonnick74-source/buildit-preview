/* Tomas's version v2: lightweight scroll motion on every page (no libraries). */
(function(){
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,d=document,b=d.body;
function mk(t,c,p){var e=d.createElement(t);e.className=c;e.setAttribute('aria-hidden','true');(p||b).appendChild(e);return e}
var g=mk('div','tv-grid');b.prepend(g);var pr=mk('div','tv-prog');
var main=d.querySelector('main');if(!main)return;
// floating glass shape layered over the first heading on inner pages
var stage=d.querySelector('.tv-stage'),host=null,fl=null;
if(!stage){host=main.querySelector('section');if(host&&host.querySelector('h1')&&!host.querySelector('.s1-fig')){host.classList.add('tv-host');fl=d.createElement('img');fl.className='tv-float';fl.src='img/tv-shape.webp';fl.alt='';fl.width=560;fl.height=711;fl.decoding='async';fl.setAttribute('aria-hidden','true');host.appendChild(fl)}}
// hairlines with travelling dots
var secs=[].slice.call(main.querySelectorAll('main>section.s:not(:first-of-type),.oldwrap>section:not(:first-child)'));
secs.forEach(function(s){var h=mk('div','tv-hl',s);h.appendChild(d.createElement('i'))});
if(RM){secs.forEach(function(s){s.style.setProperty('--p',.5)})}
// split headings into words
function split(el){var w=d.createTreeWalker(el,NodeFilter.SHOW_TEXT),n,list=[];while(n=w.nextNode())list.push(n);
 list.forEach(function(t){var parts=t.nodeValue.split(/(\s+)/),f=d.createDocumentFragment();parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(p));return}var o=d.createElement('span');o.className='tv-w';var i=d.createElement('span');i.textContent=p;o.appendChild(i);f.appendChild(o)});t.parentNode.replaceChild(f,t)});
 [].forEach.call(el.querySelectorAll('.tv-w>span'),function(s,i){s.style.transitionDelay=Math.min(i*45,600)+'ms'})}
if(!RM&&'IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('tv-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});
 [].forEach.call(main.querySelectorAll('h1,h2'),function(h){if(h.closest('.tv-stage'))return;split(h);io.observe(h)});
 [].forEach.call(main.querySelectorAll('.cards>li'),function(el,i){el.classList.add('tv-clip');el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
 [].forEach.call(main.querySelectorAll('.lead,.body,.kicker,.fs-slot,.vals li,.pull,.sample,.prose,.label,.note,section li:not(.cards>li):not(.vals li)'),function(el,i){if(el.closest('.tv-stage,.cards,.rv'))return;el.classList.add('tv-up');el.style.transitionDelay=(i%4)*60+'ms';io.observe(el)});
}
// elephant stage
var ring,word,ele,dots,dx,DP=[];
if(stage){ring=stage.querySelector('.tv-ring');word=stage.querySelectorAll('.tv-word span');ele=stage.querySelector('.tv-eleimg');dots=stage.querySelector('.tv-dots');
 var dpr=Math.min(devicePixelRatio||1,1.5);function rs(){dots.width=dots.clientWidth*dpr;dots.height=dots.clientHeight*dpr}rs();addEventListener('resize',rs);dx=dots.getContext('2d');
 var s=3;function r(){s=(s*16807)%2147483647;return s/2147483647}for(var i=0;i<46;i++)DP.push({x:r(),y:r(),z:.3+r()*.9,v:(r()-.5)*.00025});}
function drawDots(t,p){var W=dots.width,H=dots.height;dx.clearRect(0,0,W,H);var q=DP.map(function(o){o.x=(o.x+o.v+1)%1;return[o.x*W,((o.y-p*.5*o.z)%1+1)%1*H,o.z]});
 dx.strokeStyle='rgba(43,108,255,.22)';dx.lineWidth=1;dx.beginPath();for(var i=0;i<q.length;i++)for(var j=i+1;j<q.length;j++){var a=q[i][0]-q[j][0],c=q[i][1]-q[j][1];if(a*a+c*c<(W*.09)*(W*.09)){dx.moveTo(q[i][0],q[i][1]);dx.lineTo(q[j][0],q[j][1])}}dx.stroke();
 dx.fillStyle='#9dbbff';q.forEach(function(o){var rr=o[2]*2*dpr;dx.fillRect(o[0]-rr/2,o[1]-rr/2,rr,rr)})}
var imgs=[].slice.call(main.querySelectorAll('.wc img')),fig=d.querySelector('.s1-fig'),tick=false;
function frame(t){tick=false;var y=scrollY,vh=innerHeight,h=d.documentElement.scrollHeight-vh;pr.style.transform='scaleX('+(h>0?y/h:0)+')';
 if(!RM){
  secs.forEach(function(s){var r=s.getBoundingClientRect();if(r.bottom>0&&r.top<vh)s.style.setProperty('--p',Math.min(1,Math.max(0,1-(r.top+r.height*.2)/vh)).toFixed(3))});
  imgs.forEach(function(im){var r=im.getBoundingClientRect();if(r.bottom>0&&r.top<vh)im.style.setProperty('--py',((r.top+r.height/2-vh/2)/vh*-14).toFixed(1)+'px')});
  if(fig){var fr=fig.getBoundingClientRect();if(fr.bottom>0&&fr.top<vh)fig.style.transform='translate3d(0,'+((fr.top-vh*.3)*-.12).toFixed(1)+'px,0)'}
  if(fl){fl.style.setProperty('--fy',(y*.35).toFixed(1)+'px');fl.style.setProperty('--fr',(y*.06).toFixed(1)+'deg')}
  if(stage){var sr=stage.getBoundingClientRect();if(sr.bottom>0){var p=Math.min(1,Math.max(0,-sr.top/(sr.height-vh)));
   word[0].style.transform='translate3d('+(-p*28)+'vw,0,0)';word[1].style.transform='translate3d('+(p*28)+'vw,0,0)';
   ele.style.setProperty('--es',(1+p*.1).toFixed(3));ele.style.setProperty('--ex',(p*-4).toFixed(2)+'vw');ele.style.setProperty('--ey',(Math.sin((t||0)/1400)*6-p*30).toFixed(1)+'px');
   ring.style.setProperty('--rs',(1+p*.25).toFixed(3));ring.style.setProperty('--rr',(p*120+(t||0)/90%360).toFixed(1)+'deg');
   drawDots(t,p);tick=true;requestAnimationFrame(frame);return}}
 }else if(stage&&dx){drawDots(0,0)}
}
function on(){if(!tick){tick=true;requestAnimationFrame(frame)}}
addEventListener('scroll',on,{passive:true});addEventListener('resize',on);on();
})();
