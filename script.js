"use strict";
const menuButton=document.querySelector('[data-menu]');
const menu=document.querySelector('.mobile-nav');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
let size=15;
const textButtons=document.querySelectorAll('[data-text]');
textButtons.forEach(b=>b.addEventListener('click',()=>{size=Math.max(13,Math.min(19,size+Number(b.dataset.text)));document.documentElement.style.setProperty('--reading-size',size+'px');textButtons.forEach(x=>x.disabled=Number(x.dataset.text)<0?size===13:size===19);}));
document.querySelectorAll('[data-faq]').forEach(b=>b.addEventListener('click',()=>{const wasOpen=b.getAttribute('aria-expanded')==='true';document.querySelectorAll('[data-faq]').forEach(x=>{x.setAttribute('aria-expanded','false');document.getElementById(x.getAttribute('aria-controls')).hidden=true;});b.setAttribute('aria-expanded',String(!wasOpen));document.getElementById(b.getAttribute('aria-controls')).hidden=wasOpen;}));
const sections=Array.from(document.querySelectorAll('.article-section'));
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.scale=(max>0?scrollY/max:0)+' 1';const current=sections.slice().reverse().find(s=>s.getBoundingClientRect().top<180);if(current)document.querySelectorAll('.chapter-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current.id));}
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
