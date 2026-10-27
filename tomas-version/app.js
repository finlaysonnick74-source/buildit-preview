(()=>{
/* BuildIT site script: intro, scroll effects, character, menu. You rarely need to edit this. */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement;
/* ---------- intro ---------- */
const intro=$('#intro'),line=$('#introLine'),cnt=$('#introCount');
const TEXT="I'm flipping my life around through BuildIT.";
let timers=[],raf=0;
function build(){line.innerHTML='';let i=0;
  TEXT.split(' ').forEach(w=>{const wd=document.createElement('span');wd.className='wd'+(w==='flipping'?' flip':'')+(w.startsWith('BuildIT')?' brand':'');
    [...w].forEach(c=>{const ch=document.createElement('span');ch.className='ch';ch.textContent=c;ch.style.setProperty('--i',i++);wd.appendChild(ch)});line.appendChild(wd)});
  $$('.intro-strips i').forEach((s,k)=>s.style.setProperty('--s',k));}
function end(){if(intro.hidden)return;timers.forEach(clearTimeout);cancelAnimationFrame(raf);
  if(window.TVI){root.classList.add('tv-settle');setTimeout(()=>{TVI.stop();root.classList.remove('tv-settle')},2600)}
  try{sessionStorage.setItem('bi-intro','1')}catch(e){}
  const fin=()=>{intro.hidden=true;intro.classList.remove('out','fade','build');root.classList.remove('intro-on');const h=$('#h1');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}};
  if(RM){intro.animate([{opacity:1},{opacity:0}],{duration:500}).onfinish=fin}
  else{intro.classList.add('out');timers=[setTimeout(fin,1400)]}}
function play(){if(window.TVI){if(RM){intro.hidden=true;root.classList.remove('intro-on');try{sessionStorage.setItem('bi-intro','1')}catch(e){}return}
  build();window.scrollTo({top:0,behavior:'instant'});root.classList.add('intro-on');intro.hidden=false;intro.classList.remove('out','build');$('#introSkip').focus();TVI.start(intro);
  timers=[setTimeout(end,2100)];return}
  build();window.scrollTo({top:0,behavior:'instant'});root.classList.add('intro-on');intro.hidden=false;intro.classList.remove('out','build');line.classList.remove('go');
  void line.offsetWidth;$('#introSkip').focus();
  if(RM){line.classList.add('go');line.animate([{opacity:0},{opacity:1}],{duration:900,fill:'forwards'});cnt.textContent='100';timers=[setTimeout(()=>intro.classList.add('build'),1200),setTimeout(end,3000)];return}
  line.classList.add('go');const n=TEXT.replace(/ /g,'').length,dur=n*38+1900,t0=performance.now();
  const tick=t=>{const p=Math.min(1,(t-t0)/dur);cnt.textContent=String(Math.round(p*100)).padStart(3,'0');if(p<1)raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
  timers=[setTimeout(()=>intro.classList.add('build'),dur+200),setTimeout(end,dur+2400)];}
$('#introSkip').addEventListener('click',end);
addEventListener('keydown',e=>{if(e.key==='Escape'&&!intro.hidden)end()});
intro.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();$('#introSkip').focus()}});
$('#logo').addEventListener('click',e=>{const home=!!document.getElementById('proof');if(!home){try{sessionStorage.removeItem('bi-intro')}catch(_){};return}e.preventDefault();try{sessionStorage.removeItem('bi-intro')}catch(_){};history.replaceState(null,'',location.pathname);resetPage();play()});
function resetPage(){$$('.scrub .w').forEach(w=>w.classList.remove('on'));$$('.vlist li').forEach(l=>l.classList.remove('on'));}
if(root.classList.contains('intro-on'))play();
/* ---------- scrub words ---------- */
$$('[data-scrub] p').forEach(p=>{p.innerHTML=p.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ')});
const words=$$('.scrub .w');
/* ---------- values ---------- */
const vals=$$('.vlist li');
/* ---------- reel ---------- */
const proof=$('#proof')||document.createElement('div'),track=$('#track')||document.createElement('ul'),pinMQ=matchMedia('(min-width:900px) and (prefers-reduced-motion:no-preference)');
let maxX=0;
function sizeReel(){if(!$('#track')||!pinMQ.matches){proof.style.removeProperty('--pinh');track.style.transform='';return}
  maxX=Math.max(0,track.scrollWidth-innerWidth+parseFloat(getComputedStyle(proof.querySelector('.reel')).paddingLeft)*2);
  proof.style.setProperty('--pinh',(innerHeight+maxX)+'px');}
function onScroll(){const vh=innerHeight;
  for(const w of words){const r=w.getBoundingClientRect();w.classList.toggle('on',r.top<vh*.72)}
  let act=null;for(const l of vals){const r=l.getBoundingClientRect();if(r.top<vh*.6&&r.bottom>vh*.25)act=l}
  vals.forEach(l=>l.classList.toggle('on',l===act||(RM)));
  if($('#track')&&pinMQ.matches){const r=proof.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/(r.height-vh||1)));track.style.transform=`translate3d(${-p*maxX}px,0,0)`}}
let ticking=false;addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{onScroll();ticking=false})}},{passive:true});
addEventListener('resize',()=>{sizeReel();onScroll()});
addEventListener('load',()=>{sizeReel();onScroll()});sizeReel();onScroll();
/* keyboard focus inside pinned reel: scroll page to reveal card */
track.addEventListener('focusin',e=>{if(!pinMQ.matches)return;const c=e.target.closest('.card');const i=[...track.children].indexOf(c);const n=track.children.length-1;
  const r=proof.getBoundingClientRect();const top=scrollY+r.top+(r.height-innerHeight)*(i/n);window.scrollTo({top,behavior:'instant'})});
/* ---------- mobile menu ---------- */
const mb=$('.menu-btn'),nav=$('#nav');if(mb&&nav){mb.addEventListener('click',()=>{const o=mb.getAttribute('aria-expanded')!=='true';mb.setAttribute('aria-expanded',o);document.body.classList.toggle('menu-open',o)});
  nav.addEventListener('click',e=>{if(e.target.closest('a')){mb.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){mb.click();mb.focus()}})}
/* ---------- contact form plan from ?plan= ---------- */
const cf=$('[data-contact-form]');if(cf){const pi=cf.querySelector('[name="plan"]'),w=new URLSearchParams(location.search).get('plan');if(pi&&['design','design-hosting','unsure'].includes(w))pi.value=w}
/* ---------- buddy ---------- */
const buddy=$('#buddy'),bsecs=$$('[data-buddy]');
function buddyState(){if(!buddy)return;let st='hero';const m=innerHeight*.5;for(const s of bsecs){const r=s.getBoundingClientRect();if(r.top<m&&r.bottom>m)st=s.dataset.buddy}
  if(scrollY+innerHeight>=document.documentElement.scrollHeight-4)st='start';if(buddy.dataset.state!==st)buddy.dataset.state=st}
addEventListener('scroll',()=>requestAnimationFrame(buddyState),{passive:true});buddyState();
/* ---------- cursor + magnetic ---------- */
if(!RM&&matchMedia('(pointer:fine)').matches){const c=$('.cursor');let x=0,y=0,cx=0,cy=0;
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;c.classList.add('live')});
  (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)})();
  document.addEventListener('pointerover',e=>c.classList.toggle('big',!!e.target.closest('a,button')));
  $$('.magnetic').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});}
})();
