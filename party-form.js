(function(){'use strict';
 function fit(e){if(!e||!e.offsetParent)return;e.style.height='auto';e.style.height=Math.max(44,e.scrollHeight+2)+'px';}
 function all(){document.querySelectorAll('#madd textarea.party-grow').forEach(fit);}
 document.addEventListener('input',function(e){if(e.target.matches('#madd textarea.party-grow'))fit(e.target);});
 document.addEventListener('toggle',all,true);window.addEventListener('resize',all);document.addEventListener('change',all);
 document.addEventListener('DOMContentLoaded',function(){
  [['mclitype','mcliLegalSwitch'],['madvtype','madvLegalSwitch']].forEach(function(a){var s=document.getElementById(a[0]),b=document.getElementById(a[1]);if(!s||!b)return;
   function sync(){b.checked=s.value==='legal';}sync();s.addEventListener('change',sync);
   b.addEventListener('change',function(){s.value=b.checked?'legal':'natural';s.dispatchEvent(new Event('change',{bubbles:true}));all();});
   // Form fill/reset sets the select's value programmatically; sync when shown.
   document.addEventListener('click',function(){setTimeout(sync,0);},true);
  });all();
 });
})();
