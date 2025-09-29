/*  CURSOR FOLLOWER  */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animate(){
  ringX += (mouseX - ringX) * .2;
  ringY += (mouseY - ringY) * .2;
  dot.style.transform  = `translate(${mouseX}px, ${mouseY}px)`;
  ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animate);
}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) animate();

/*  MAGNETIC BUTTONS  */
document.querySelectorAll('a, button, .card').forEach(el=>{
  el.addEventListener('mouseenter',()=> ring.style.transform += ' scale(1.5)');
  el.addEventListener('mouseleave',()=> ring.style.transform += ' scale(1)');
});

/*  ACTIVE NAV  */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.remove('active'));
      document.querySelector(`.nav-links a[href="#${entry.target.id}"]`).classList.add('active');
    }
  });
},{threshold:.6});
sections.forEach(sec=>observer.observe(sec));

/*  REVEAL ON SCROLL  */
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('reveal-visible');
  });
},{threshold:.2});
document.querySelectorAll('.about, .timeline, .card').forEach(el=>{el.classList.add('reveal'); reveal.observe(el);});

/*  PROJECT FILTER  */
const pills = document.querySelectorAll('.filter-pills button');
const cards = document.querySelectorAll('.card');
pills.forEach(pill=>{
  pill.addEventListener('click',()=>{
    pills.forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.filter;
    cards.forEach(card=>{
      const show = cat==='all' || card.dataset.cat===cat;
      card.style.display = show ? 'block' : 'none';
    });
  });
});

/*  FORM  */
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
  btn.disabled = true;
  setTimeout(()=>{btn.innerHTML='<span>Sent ✔</span>';},1500);
});

/*  YEAR  */
document.getElementById('year').textContent = new Date().getFullYear();