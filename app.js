const dialog=document.querySelector('#noteDialog'),title=document.querySelector('#dialogTitle'),label=document.querySelector('#dialogLabel'),body=document.querySelector('#dialogBody');
let language='zh',activeNote=null;
const controls=document.createElement('div');controls.className='nav-controls';controls.innerHTML='<div class="language-switch" role="group" aria-label="Language / 语言"><button data-lang="zh" lang="zh-CN">中</button><button data-lang="en" lang="en">EN</button></div>';document.querySelector('.nav-cta').before(controls);
function renderDialog() {
  const article = (language === 'en' ? articleEnglish : articles)[activeNote];
  if (!article) return;
  label.textContent = article.label;
  title.textContent = article.title;
  body.replaceChildren();
  for (const text of article.paragraphs) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    body.append(paragraph);
  }
  const notice = document.createElement('p');
  notice.className = 'dialog-notice';
  notice.textContent = ui[language].sample;
  body.append(notice);
}
function setLanguage(next){language=next==='en'?'en':'zh';translations.forEach(item=>item.element.innerHTML=item[language]);document.documentElement.lang=language==='en'?'en':'zh-CN';document.title=ui[language].pageTitle;document.querySelector('meta[name="description"]').content=ui[language].description;document.querySelector('.nav nav').setAttribute('aria-label',ui[language].nav);document.querySelector('.filters').setAttribute('aria-label',ui[language].filter);document.querySelector('.hero-art').setAttribute('aria-label',ui[language].art);document.querySelector('.close').setAttribute('aria-label',ui[language].close);document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));if(dialog.open)renderDialog();try{localStorage.setItem('explorerLanguage',language)}catch{}}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.note').forEach(note=>{note.hidden=button.dataset.filter!=='all'&&note.dataset.category!==button.dataset.filter})}));
document.querySelectorAll('[data-note]').forEach(button=>button.addEventListener('click',()=>{activeNote=button.dataset.note;renderDialog();dialog.showModal()}));document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');let paused=reducedMotion.matches,frame=0,lastTime=0;
function setPaused(value){paused=value;document.body.classList.toggle('motion-paused',paused);cancelAnimationFrame(frame);if(!paused&&!document.hidden)frame=requestAnimationFrame(draw);else drawStill()}
reducedMotion.addEventListener('change',event=>setPaused(event.matches));
const canvas=document.querySelector('#network'),ctx=canvas.getContext('2d');let width=0,height=0,nodes=[],starTime=0;const pointer={x:-1000,y:-1000};
function resize(){width=innerWidth;height=innerHeight;const scale=Math.min(devicePixelRatio||1,1.5);canvas.width=width*scale;canvas.height=height*scale;canvas.style.width=width+'px';canvas.style.height=height+'px';ctx?.setTransform(scale,0,0,scale,0,0);nodes=Array.from({length:width<700?42:84},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:Math.random()*1.2+.65,phase:Math.random()*Math.PI*2,speed:.9+Math.random()*1.9,spark:Math.random()>.75}));drawStill()}
function paint(move,elapsed=0){if(!ctx)return;if(move)starTime+=elapsed;ctx.clearRect(0,0,width,height);for(let i=0;i<nodes.length;i++){const a=nodes[i];if(move){a.x=(a.x+a.vx+width)%width;a.y=(a.y+a.vy+height)%height}const pulse=Math.pow((Math.sin(starTime*a.speed+a.phase)+1)/2,2),alpha=.12+pulse*.85,radius=a.r*(.65+pulse*.55),glowRadius=radius*(4+pulse*3);const glow=ctx.createRadialGradient(a.x,a.y,0,a.x,a.y,glowRadius);glow.addColorStop(0,`rgba(125,225,255,${alpha*.45})`);glow.addColorStop(.3,`rgba(90,190,240,${pulse*.14})`);glow.addColorStop(1,'rgba(90,190,240,0)');ctx.fillStyle=glow;ctx.fillRect(a.x-glowRadius,a.y-glowRadius,glowRadius*2,glowRadius*2);ctx.fillStyle=`rgba(195,240,255,${alpha})`;ctx.beginPath();ctx.arc(a.x,a.y,radius,0,Math.PI*2);ctx.fill();if(a.spark&&pulse>.65){const arm=radius*(2+pulse*2);ctx.strokeStyle=`rgba(180,235,255,${(pulse-.65)*1.2})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(a.x-arm,a.y);ctx.lineTo(a.x+arm,a.y);ctx.moveTo(a.x,a.y-arm);ctx.lineTo(a.x,a.y+arm);ctx.stroke()}for(let j=i+1;j<nodes.length;j++){const b=nodes[j],distance=Math.hypot(a.x-b.x,a.y-b.y);if(distance<145){ctx.strokeStyle=`rgba(91,200,225,${(1-distance/145)*.1})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}const distance=Math.hypot(a.x-pointer.x,a.y-pointer.y);if(distance<180){ctx.strokeStyle=`rgba(155,130,255,${(1-distance/180)*.35})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke()}}}
function drawStill(){paint(false)}function draw(time){if(paused||document.hidden)return;if(time-lastTime>32){paint(true,Math.min(time-lastTime,64)/1000);lastTime=time}frame=requestAnimationFrame(draw)}
addEventListener('resize',resize,{passive:true});addEventListener('pointermove',event=>{pointer.x=event.clientX;pointer.y=event.clientY;if(!paused){document.documentElement.style.setProperty('--pointer-x',event.clientX+'px');document.documentElement.style.setProperty('--pointer-y',event.clientY+'px')}},{passive:true});document.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000});document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden&&!paused)frame=requestAnimationFrame(draw)});
const progress=document.querySelector('.scroll-progress');let scrollQueued=false;function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;document.querySelector('.nav').classList.toggle('scrolled',scrollY>25);scrollQueued=false}addEventListener('scroll',()=>{if(!scrollQueued){requestAnimationFrame(updateScroll);scrollQueued=true}},{passive:true});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.section-heading,.about > div,.focus-grid article,.note,.contact').forEach((element,index)=>{element.classList.add('reveal');element.style.setProperty('--reveal-delay',Math.min(index%3*80,160)+'ms');observer.observe(element)})}
resize();setPaused(paused);let savedLanguage='zh';try{savedLanguage=localStorage.getItem('explorerLanguage')||'zh'}catch{}setLanguage(savedLanguage);updateScroll();

const wechatId = document.querySelector('#wechat-id');
const copyFeedback = document.querySelector('#copy-feedback');
document.querySelector('#copy-wechat').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(wechatId.textContent);
    copyFeedback.textContent = language === 'en' ? 'WeChat ID copied' : '已复制微信号';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(wechatId);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyFeedback.textContent = language === 'en' ? 'Select Copy to copy the highlighted ID' : '微信号已选中，请手动复制';
  }
});
