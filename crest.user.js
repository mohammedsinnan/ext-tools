// ==UserScript==
// @name         CREST
// @namespace    https://mohammedsinnan.github.io/ext-tools/
// @version      2.0.1
// @description  Crest client with ordered startup, bounded download retries and a visible loading screen.
// @match        *://3rb.io/*
// @match        *://*.3rb.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      mohammedsinnan.github.io
// @downloadURL  https://mohammedsinnan.github.io/ext-tools/crest.user.js
// @updateURL    https://mohammedsinnan.github.io/ext-tools/crest.user.js
// ==/UserScript==
(function(){
  if(window.__crestLoaderRunning)return;
  window.__crestLoaderRunning=true;
  const base='https://mohammedsinnan.github.io/ext-tools/';
  const shell="<!doctype html><meta charset=\"utf-8\"><style>#loading-screen{position:fixed!important;inset:0!important;z-index:2147483000!important;display:grid;place-items:center;background:radial-gradient(ellipse at 50% 36%,#15362e 0,transparent 44%),radial-gradient(ellipse at 80% 90%,#172530 0,transparent 45%),#060e13!important;color:#e8f6f0;font-family:Segoe UI,Arial,sans-serif!important;transition:opacity .18s ease}\n#loading-screen.crest-entered{opacity:0;pointer-events:none}\n.crest-entry{width:min(520px,calc(100vw - 48px));text-align:center;padding:32px 0}\n.crest-entry::before{content:'';position:absolute;width:280px;height:280px;border:1px solid #a4dcc510;left:50%;top:46%;transform:translate(-50%,-50%) rotate(45deg);border-radius:44px;pointer-events:none}\n.crest-emblem{width:100px;height:116px;margin:0 auto 28px;filter:drop-shadow(0 8px 25px #77e2b82b);position:relative}\n#loading-screen .ls-title{position:static!important;transform:none!important;font:600 42px/1 Segoe UI,Arial,sans-serif!important;color:#eaf7ef!important;letter-spacing:.28em!important;text-shadow:none!important;margin:0 0 14px;padding-left:.28em}\n.crest-entry-tag{font-size:10px;font-weight:600;letter-spacing:.34em;color:#8bbba9;margin-bottom:44px}\n#loading-screen #ls-message{position:static;display:block;font:400 14px/1.7 Segoe UI,Arial,sans-serif!important;color:#b3cbc3;min-height:46px;max-width:440px;margin:0 auto 16px}\n.crest-entry-track{height:3px;border-radius:5px;background:#c3e5d312;overflow:hidden;margin:0 auto 18px;max-width:300px}\n.crest-entry-track span{display:block;height:100%;width:28%;background:linear-gradient(90deg,#85e3b8,#e0d39a);border-radius:5px;transition:width .3s ease;animation:crest-breathe 1.8s ease-in-out infinite}\n.crest-entry-steps{display:flex;justify-content:center;gap:25px;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#68877d}.crest-entry-steps [data-ready=true]{color:#adddc8}\n#crest-start-retry{border:1px solid #a7dbc842;border-radius:10px;background:#16322b;color:#def1e7;padding:10px 22px;margin:20px 0 0;cursor:pointer;font:600 13px Segoe UI,sans-serif}#crest-start-retry[hidden]{display:none}\n.crest-entry-help{display:block;margin-top:28px;color:#6f9385;font-size:11px;text-decoration:none}.crest-entry-help:hover{color:#bfdfcf}.crest-entry button:focus-visible,.crest-entry a:focus-visible{outline:2px solid #bde8d3;outline-offset:4px}\n@keyframes crest-breathe{50%{opacity:.45}}@media(prefers-reduced-motion:reduce){.crest-entry-track span{animation:none}#loading-screen{transition:none}}\r\n</style><div id=\"loading-screen\"><div class=\"crest-entry\"><svg class=\"crest-emblem\" viewBox=\"0 0 100 116\" aria-hidden=\"true\"><defs><linearGradient id=\"crest-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1d6a7\"/><stop offset=\"1\" stop-color=\"#84dcb6\"/></linearGradient></defs><path d=\"M12 22 30 32 50 8 70 32 88 22 82 44H18Z\" fill=\"url(#crest-metal)\"/><path d=\"M17 49H83V74C83 91 67 103 50 111 33 103 17 91 17 74Z\" fill=\"#0d201c\" stroke=\"url(#crest-metal)\" stroke-width=\"2\"/><path d=\"M64 65C59 60 41 60 36 71 30 85 44 97 59 90L65 84\" fill=\"none\" stroke=\"url(#crest-metal)\" stroke-width=\"7\" stroke-linecap=\"square\"/><path d=\"M25 53H75\" stroke=\"#c3e4cc\" stroke-opacity=\".14\"/></svg><h1 class=\"ls-title\">CREST</h1><div class=\"crest-entry-tag\">YOUR NEXT ARENA</div><div id=\"ls-message\" role=\"status\" aria-live=\"polite\">Preparing your arena…</div><div class=\"crest-entry-track\"><span id=\"crest-start-progress\"></span></div><div class=\"crest-entry-steps\"><span data-step=\"0\">Interface</span><span data-step=\"1\">Client</span><span data-step=\"2\">Arenas</span></div><button type=\"button\" id=\"crest-start-retry\" hidden>Retry startup</button><a class=\"crest-entry-help\" href=\"https://mohammedsinnan.github.io/ext-tools/crest.user.js\">Install the latest Crest loader</a></div>\r\n</div>";
  let running=false;
  const show=(message,retry)=>{const el=document.getElementById('ls-message');if(el)el.textContent=message;const button=document.getElementById('crest-start-retry');if(button){button.hidden=!retry;button.onclick=run}};
  const request=(file)=>new Promise((resolve,reject)=>{GM_xmlhttpRequest({method:'GET',url:base+file+'?_='+Date.now(),timeout:12000,nocache:true,onload:r=>{if(r.status>=200&&r.status<300&&r.responseText?.trim())resolve(r.responseText);else reject(Error('Could not download '+file))},onerror:()=>reject(Error('Could not reach '+file)),ontimeout:()=>reject(Error('Download timed out: '+file)),onabort:()=>reject(Error('Download cancelled: '+file))})});
  const get=async(file)=>{let error;for(let attempt=0;attempt<3;attempt++){try{return await request(file)}catch(e){error=e;if(attempt<2)await new Promise(resolve=>setTimeout(resolve,700*(attempt+1)))}}throw error};
  async function run(){if(running)return;running=true;show('Preparing your arena…',false);try{
    const [html,library,shield,client]=await Promise.all(['index.html','v.js','shield.js','m.js'].map(get));
    if(!html.includes('crest-dom-ready')||!html.includes('id="canvas"')||!library.includes('perfectScrollbar')||!client.includes('class GameLoop')||!shield.includes('__SHIELD__'))throw Error('A client resource was incomplete');
    // Build the page before libraries inspect its root, head and body.
    document.open();
    document.write(html);
    document.close();
    new Function(library)();
    new Function(shield)();
    new Function(client)();
  }catch(error){if(!document.getElementById('ls-message')){document.open();document.write(shell);document.close()}console.error('Crest startup:',error);show('Startup could not finish. '+String(error.message||error)+'. Retry when your connection is ready.',true)}finally{running=false}}
  document.open();document.write(shell);document.close();
  run();
})();
