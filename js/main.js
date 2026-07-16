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