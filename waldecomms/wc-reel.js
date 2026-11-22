(()=>{
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
document.querySelectorAll(".wc-media video").forEach(function(v){if(!rm){var p=v.play();if(p&&p.catch)p.catch(function(){})}});
var dlg;
function open(){
 if(!dlg){dlg=document.createElement("dialog");dlg.id="wc-modal";dlg.setAttribute("aria-label","WaldeComms showreel");
  dlg.innerHTML='<button class="wc-x" type="button" aria-label="Close showreel">×</button><video controls playsinline preload="none" poster="img/reel-poster.jpg"><source src="video/reel-720.mp4" type="video/mp4"></video>';
  document.body.appendChild(dlg);
  var v=dlg.querySelector("video");
  dlg.querySelector(".wc-x").onclick=function(){dlg.close()};
  dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
  dlg.addEventListener("close",function(){v.pause()});}
 dlg.showModal();var v2=dlg.querySelector("video");v2.currentTime=0;v2.play().catch(function(){});
}
document.querySelectorAll(".wc-reel").forEach(function(b){b.addEventListener("click",open)});
})();
