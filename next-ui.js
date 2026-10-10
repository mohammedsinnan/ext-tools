/* Native client presentation controls. No account or connection APIs. */
(function(){
 const palettes={
  midnight:{backgroundColor:'#0c121b',gridColor:'#203344',gridTextColor:'#182633',gridTextSize:600,gridWidth:18,borderStyle:'default',borderColor:'#6b8b9d',borderWidth:36,foodColor:'#8ecbbc',virusColor:'#183d32',virusBorderColor:'#65b98b',multiboxActive:'#b6f36b',multiboxInactive:'#afa8ec',multiboxRingWidth:5,nickFont:'Segoe UI',massFont:'Segoe UI',nickColor:'#f2f7fa',massColor:'#f2f7fa',cellMaterial:'glass'},
  frost:{backgroundColor:'#e8f0f5',gridColor:'#b9cfdd',gridTextColor:'#d5e3ec',gridTextSize:600,gridWidth:18,borderStyle:'default',borderColor:'#68899f',borderWidth:36,foodColor:'#398c8f',virusColor:'#98cab2',virusBorderColor:'#39875d',multiboxActive:'#6baa34',multiboxInactive:'#8573c0',multiboxRingWidth:5,nickFont:'Segoe UI',massFont:'Segoe UI',nickColor:'#ffffff',massColor:'#ffffff',cellMaterial:'glass'},
  ember:{backgroundColor:'#171016',gridColor:'#3b2632',gridTextColor:'#281b23',gridTextSize:600,gridWidth:18,borderStyle:'default',borderColor:'#936a74',borderWidth:36,foodColor:'#e3a47e',virusColor:'#44312a',virusBorderColor:'#d89967',multiboxActive:'#ffa877',multiboxInactive:'#c699d7',multiboxRingWidth:5,nickFont:'Segoe UI',massFont:'Segoe UI',nickColor:'#fff4ef',massColor:'#fff4ef',cellMaterial:'glass'}
 };
 window.NEXT_CLIENT_UI={init(api){
  const theme=document.getElementById('next-interface-theme'),opacity=document.getElementById('next-menu-opacity'),motion=document.getElementById('next-menu-motion');if(!theme||theme.dataset.bound)return;theme.dataset.bound='true';
  let selected=api.get('theme');if(!Object.hasOwn(palettes,selected))selected='midnight';
  let alpha=Number(api.get('opacity'));if(!Number.isFinite(alpha)||alpha<45||alpha>100)alpha=90;
  let animate=api.get('motion')!=='off';
  function paint(){document.documentElement.dataset.nextTheme=selected;document.documentElement.dataset.nextMotion=animate?'on':'off';document.documentElement.style.setProperty('--next-alpha',String(alpha/100));theme.value=selected;opacity.value=alpha;motion.checked=animate;document.getElementById('next-opacity-value').textContent=alpha+'%'}
  paint();theme.addEventListener('change',()=>{if(!Object.hasOwn(palettes,theme.value))return;selected=theme.value;api.set('theme',selected);paint()});opacity.addEventListener('input',()=>{alpha=Math.max(45,Math.min(100,Number(opacity.value)||90));paint()});opacity.addEventListener('change',()=>api.set('opacity',alpha));motion.addEventListener('change',()=>{animate=motion.checked;api.set('motion',animate?'on':'off');paint()});
  for(const button of document.querySelectorAll('[data-next-preset]'))button.addEventListener('click',()=>{const name=button.dataset.nextPreset;if(!Object.hasOwn(palettes,name))return;api.applyPalette({...palettes[name]});selected=name;api.set('theme',selected);paint()});
  // Show only the old client's visible status flags. A missing status never
  // becomes a synthetic "ready" state.
  const status=document.getElementById('next-session-text');const update=()=>{const text=document.getElementById('drag-plus-connection-status')?.textContent||'';const match=/Tab1:\s*(\w+)\s*\|\s*Tab2:\s*(\w+)/.exec(text);const value=match?'P1 '+match[1]+' / P2 '+match[2]:'Waiting for connection status';if(status.textContent!==value)status.textContent=value;const ready=String(!!match&&['Ready','Alive'].includes(match[1])&&['Ready','Alive'].includes(match[2]));if(status.parentElement.dataset.ready!==ready)status.parentElement.dataset.ready=ready};
  let watched;const observer=new MutationObserver(()=>{watch();update()});function watch(){const hud=document.getElementById('drag-plus-connection-status');if(hud&&hud!==watched){watched=hud;observer.disconnect();observer.observe(hud,{childList:true,subtree:true,characterData:true})}}observer.observe(document.body,{childList:true,subtree:true});watch();update();
  for(const link of document.querySelectorAll('.next-nav [role=button]'))link.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();link.click()}});
  const brand=document.querySelector('.next-brand');brand?.addEventListener('click',event=>event.preventDefault());
 }};
})();
