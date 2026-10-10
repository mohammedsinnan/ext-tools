import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
let html=read('index.html');
html=html.replace(/<style id="next-client-style">[\s\S]*?<\/style>/,'<style id="next-client-style">'+read('next-ui.css')+'</style>');
html=html.replace(/<script id="next-client-ui">[\s\S]*?<\/script>/,'<script id="next-client-ui">'+read('next-ui.js')+'</script>');
writeFileSync(new URL('index.html',import.meta.url),html);
const header=`// ==UserScript==
// @name         3RB NEXT — Native Client
// @namespace    https://github.com/mohammedsinnan/ext-tools
// @version      1.0.0
// @description  Redesigned native client menu and canvas cell materials, based on the working two-player client.
// @match        *://*.3rb.io/
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==
`;
const source=header+`(() => {
 'use strict';
 const html=${JSON.stringify(html)};
 const vendor=${JSON.stringify(read('v.js'))};
 const shield=${JSON.stringify(read('shield.js'))};
 const client=${JSON.stringify(read('m.js'))};
 // Pinned, bundled copies of the existing client. No remote code loader.
 window.stop(); document.open(); document.write(html); document.close();
 let started=false;
 function start(){if(started)return;started=true;try{new Function(vendor)();new Function(shield)();new Function(client)();}catch(error){console.error('[3RB NEXT] Client startup failed',error);const loading=document.getElementById('loading-screen');if(loading){loading.style.display='block';loading.textContent='3RB NEXT could not start. Disable this script and refresh to restore your previous client.'}}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
`;
mkdirSync(new URL('dist/',import.meta.url),{recursive:true});writeFileSync(new URL('dist/3rb-next-client.user.js',import.meta.url),source);writeFileSync(new URL('script.txt',import.meta.url),source);
console.log('Built native client document and standalone Tampermonkey userscript.');
