window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50)});
function toggleNav(){document.getElementById('hamburger').classList.toggle('active');document.getElementById('navLinks').classList.toggle('active')}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{document.getElementById('hamburger').classList.remove('active');document.getElementById('navLinks').classList.remove('active')}));
const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
function switchTab(species){
  document.querySelectorAll('.species-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelector(`[onclick="switchTab('${species}')"]`).classList.add('active');
  document.getElementById('tab-'+species).classList.add('active');
}
/* 说明书下载次数：GitHub Releases 计数 */
(function(){
  var API='https://api.github.com/repos/huayan2026/huayanbio-website/releases/tags/manuals-v1';
  var CACHE_KEY='hb-dl-counts-v1';
  var TTL=60*1000;
  var nums=Array.prototype.slice.call(document.querySelectorAll('.dl-num[data-key]'));
  if(!nums.length) return;
  function render(assets){
    nums.forEach(function(el){
      var name=el.getAttribute('data-key')+'-manual.pdf';
      var found=(assets||[]).filter(function(a){return a.name===name;})[0];
      el.textContent=found?found.download_count:'0';
    });
  }
  function load(){
    var cached=null;
    try{cached=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');}catch(e){}
    if(cached && Date.now()-cached.t<TTL){render(cached.data);return;}
    fetch(API).then(function(r){return r.ok?r.json():Promise.reject();}).then(function(release){
      var assets=(release&&release.assets)||[];
      render(assets);
      try{localStorage.setItem(CACHE_KEY,JSON.stringify({t:Date.now(),data:assets}));}catch(e){}
    }).catch(function(){});
  }
  document.querySelectorAll('a[download]').forEach(function(a){
    var el=a.querySelector('.dl-num[data-key]');
    if(!el) return;
    a.addEventListener('click',function(){ el.textContent=(parseInt(el.textContent,10)||0)+1; });
  });
  load();
})();