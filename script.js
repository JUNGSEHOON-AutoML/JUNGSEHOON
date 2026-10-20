'use strict';
(function(){
  const root=document.documentElement;
  const toggle=document.querySelector('#menu-toggle');
  const nav=document.querySelector('#main-nav');
  const navAnchors=nav ? Array.from(nav.querySelectorAll('a')) : [];
  const modeButtons=Array.from(document.querySelectorAll('[data-view-button]'));
  // Default stays Recruiter View to keep the first read concise.
  function setMode(mode){
    if(mode !== 'recruiter' && mode !== 'full') return;
    root.dataset.view=mode;
    modeButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.viewButton===mode)));
  }
  modeButtons.forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.viewButton)));
  if(toggle && nav){
    function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기');}
    toggle.addEventListener('click',()=>{
      const isOpen=nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(isOpen));
      toggle.setAttribute('aria-label',isOpen?'메뉴 닫기':'메뉴 열기');
    });
    navAnchors.forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu();});
    document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
  }
  const prog=document.getElementById('scroll-indicator');
  const updateScroll=()=>{if(prog){const h=document.documentElement.scrollHeight-window.innerHeight;prog.style.width=(h>0?100*window.scrollY/h:0)+'%';}};
  window.addEventListener('scroll',updateScroll,{passive:true});window.addEventListener('resize',updateScroll,{passive:true});updateScroll();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reduced){
    const targets=document.querySelectorAll('.proof-card,.publication-row,.research-feature,.graduate-course-card,.work-card,.archive-card,.activity-item,.agent-feature,.section-heading,.contact-panel');
    const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}});},{threshold:.07,rootMargin:'0px 0px -25px 0px'});
    targets.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
  }
  if('IntersectionObserver' in window && navAnchors.length){
    const links=new Map(navAnchors.filter(a=>a.hash).map(a=>[a.hash.substring(1),a]));
    const observer=new IntersectionObserver((entries)=>{for(const entry of entries){if(entry.isIntersecting){navAnchors.forEach(a=>a.classList.remove('active'));links.get(entry.target.id)?.classList.add('active');}}},{rootMargin:'-120px 0px -60% 0px'});
    links.forEach((_,id)=>{const el=document.getElementById(id);if(el)observer.observe(el);});
  }
  // Image enlargements on project pages. Native <dialog> handles focus & Escape.
  const galleryImages=document.querySelectorAll('[data-enlarge]');
  if(galleryImages.length){
    const dialog=document.createElement('dialog');dialog.className='image-dialog';dialog.setAttribute('aria-label','프로젝트 이미지 크게 보기');
    const css=document.createElement('style');css.textContent='.image-dialog{width:min(95vw,1250px);max-height:94vh;margin:auto;border:1px solid rgba(192,223,233,.24);background:#0b1625;color:white;border-radius:15px;padding:16px;box-shadow:0 30px 100px #000a}.image-dialog::backdrop{background:rgba(0,0,0,.82)}.image-dialog img{display:block;max-width:100%;max-height:80vh;width:auto;height:auto;object-fit:contain;margin:auto;border-radius:8px}.image-dialog button{float:right;border:0;background:#24364a;color:white;border-radius:8px;padding:6px 12px;cursor:pointer;margin-bottom:10px}.image-dialog figcaption{font-size:12px;color:#aabed3;margin-top:10px;text-align:center}img[data-enlarge]{cursor:zoom-in}';
    document.head.appendChild(css);document.body.appendChild(dialog);
    galleryImages.forEach(img=>{img.setAttribute('tabindex','0');img.setAttribute('role','button');img.setAttribute('aria-label',(img.alt||'프로젝트 이미지')+' 크게 보기');
      const open=()=>{dialog.innerHTML='';const close=document.createElement('button');close.type='button';close.textContent='닫기 ×';close.addEventListener('click',()=>dialog.close());const f=document.createElement('figure');const full=document.createElement('img');full.src=img.src;full.alt=img.alt;f.appendChild(full);const cap=document.createElement('figcaption');cap.textContent=img.alt;f.appendChild(cap);dialog.append(close,f);dialog.showModal();};
      img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    });dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  }
})();
