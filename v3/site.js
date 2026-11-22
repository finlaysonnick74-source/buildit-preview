(()=>{
const b=document.querySelector('.menu-btn'),n=document.getElementById('nav');
if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Close':'Menu'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.textContent='Menu';b.focus()}})}
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// reveal
const rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window&&!rm){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});rv.forEach(el=>io.observe(el))}else rv.forEach(el=>el.classList.add('in'));
// loops: play when visible, not under reduced motion
document.querySelectorAll('video[data-loop]').forEach(v=>{
 const btn=v.parentElement.querySelector('[data-toggle]');let user=rm?'paused':null;
 const set=()=>{if(btn){btn.textContent=v.paused?'Play':'Pause';btn.setAttribute('aria-label',btn.getAttribute('aria-label').replace(/^(Play|Pause)/,v.paused?'Play':'Pause'))}};
 if(btn)btn.addEventListener('click',()=>{if(v.paused){user=null;v.play().catch(()=>{})}else{user='paused';v.pause()}});
 v.addEventListener('play',set);v.addEventListener('pause',set);set();
 if('IntersectionObserver' in window){new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!user){v.preload='auto';v.play().catch(()=>{})}}else v.pause()}),{threshold:.25}).observe(v)}
});
// showreel
let d;
document.querySelectorAll('[data-reel]').forEach(x=>x.addEventListener('click',()=>{
 if(!d){d=document.createElement('dialog');d.id='reel';d.setAttribute('aria-label','WaldeComms showreel');
  d.innerHTML='<button class="x" type="button" aria-label="Close showreel">×</button><video controls playsinline preload="none" poster="img/reel-poster.webp" width="1920" height="1080"><source src="video/reel-720.mp4" type="video/mp4"></video>';
  document.body.appendChild(d);const v=d.querySelector('video');d.querySelector('.x').onclick=()=>d.close();
  d.addEventListener('click',e=>{if(e.target===d)d.close()});d.addEventListener('close',()=>{v.pause();x.focus()})}
 d.showModal();const v=d.querySelector('video');v.currentTime=0;v.play().catch(()=>{})}));
// orbit pause
const p=document.querySelector('[data-pause-anim]');
if(p){const svg=document.querySelector('.agd');if(rm){p.hidden=true}
 p.addEventListener('click',()=>{const on=p.getAttribute('aria-pressed')!=='true';svg.getAnimations({subtree:true}).forEach(a=>on?a.pause():a.play());p.setAttribute('aria-pressed',on);p.textContent=on?'Play animation':'Pause animation'})}
})();
