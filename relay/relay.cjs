'use strict';
const http = require('node:http');
const {WebSocket, WebSocketServer} = require('ws');
const ALLOWED_ORIGIN = /^https:\/\/(?:[a-z0-9-]+\.)*3rb\.io$/i;
const ROOM = /^[A-Z0-9_-]{1,64}$/;
const MAX_PEERS = 128, MAX_ROOM = 32, MAX_PENDING = 262144;
const wireString = b => Buffer.concat([b, Buffer.from([0])]);
const uint = n => { const b=Buffer.alloc(4); b.writeUInt32LE(n); return b; };
function arenaOf(skin) {
  const field = skin.split('|')[3];
  if (!field?.startsWith('MO1:') || field.length > 1800) return null;
  try {
    const data = JSON.parse(decodeURIComponent(field.slice(4)));
    if (!Array.isArray(data) || data.length !== 4 || typeof data[0] !== 'string' || data[0].length > 180) return null;
    const url = new URL(data[0]);
    if (!['wss:', 'ws:'].includes(url.protocol) || !/(^|\.)3rb\.io$/i.test(url.hostname) ||
        url.username || url.password || url.search || url.hash) return null;
    return url.href;
  } catch { return null; }
}
function row(p) {
  const pos = Buffer.alloc(10);
  pos.writeInt16LE(p.x,0);pos.writeInt16LE(p.y,2);pos.writeUInt32LE(p.mass,4);
  pos[8]=p.alive;pos[9]=p.rgb;
  return Buffer.concat([uint(p.id),Buffer.from([119]),wireString(p.nick),p.color,wireString(p.skin),pos]);
}
function snapshot(peers, previous, biggest) {
  const next = new Set(peers.map(p=>p.id)), gone = [...previous].filter(id=>!next.has(id));
  return {next, bytes:Buffer.concat([Buffer.from([1,gone.length]),...gone.map(uint),Buffer.from([peers.length]),
    ...peers.map(row),biggest ? Buffer.concat([Buffer.from([1]),biggest]) : Buffer.from([0])])};
}
function createRelay({rooms, flushMs=125}={}) {
  const allowed = new Set(rooms || []);
  if (!allowed.size || [...allowed].some(r=>!ROOM.test(r))) throw Error('Set CREST_ROOMS to comma-separated uppercase room names.');
  const wss = new WebSocketServer({noServer:true,maxPayload:2048,perMessageDeflate:false});
  const clients=new Map(), dirty=new Set();
  let nextId=1, closed=false;
  const server=http.createServer((req,res)=>{
    if(req.method==='GET' && req.url==='/healthz') {
      res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'}).end('{"ok":true}');
    } else res.writeHead(404).end();
  });
  function send(p,b) {
    if(p.ws.readyState!==WebSocket.OPEN) return;
    if(p.ws.bufferedAmount>MAX_PENDING){p.ws.terminate();return}
    p.ws.send(b,{binary:true},error=>{if(error)p.ws.terminate()});
  }
  const scope=p=>p.arena ? p.room+'\n'+p.arena : null;
  function mark(k){if(k)dirty.add(k)}
  function disconnect(p){mark(scope(p));clients.delete(p.ws)}
  function receive(p,b,isBinary) {
    const now=Date.now();
    if(now-p.rateAt>=1000){p.rateAt=now;p.frames=0}
    if(++p.frames>80){p.ws.close(1008,'Rate limit');return}
    if(!isBinary||!b.length){p.ws.close(1003,'Binary frames only');return}
    const op=b[0], old=scope(p);
    switch(op) {
      case 1:
        if(b.length>240||b.length<2||b.at(-1)!==0||b.subarray(1,-1).includes(0))return;
        p.nick=Buffer.from(b.subarray(1,-1).toString('utf8').replace(/[<>&\x00-\x1f\x7f]/g,''),'utf8');break;
      case 2:
        if(b.length!==4)return;
        p.color=Buffer.from(b.subarray(1));break;
      case 4: {
        if(b.length<2||b.at(-1)!==0||b.subarray(1,-1).includes(0))return;
        const value=b.subarray(1,-1).toString('ascii'), fields=value.split('|');
        const arena=arenaOf(value);
        if(!arena || fields.length!==4 || !fields.slice(0,2).every(s=>/^[a-z0-9]{0,16}$/i.test(s)) ||
           !/^(?:[a-f0-9]{6})?$/i.test(fields[2])) {p.arena=null;p.skin=Buffer.alloc(0);break}
        p.arena=arena;p.skin=Buffer.from(value,'ascii');break;
      }
      case 16:
        if(b.length!==9)return;
        p.x=b.readInt16LE(1);p.y=b.readInt16LE(3);p.mass=b.readUInt32LE(5);break;
      case 32:
        if(b.length!==2||b[1]>1)return;
        p.lastAlive=now;if(p.alive===b[1])return;
        p.alive=b[1];break;
      case 128:
        if(b.length!==5||!old||now-p.lastCommand<500)return;
        p.lastCommand=now;
        for(const q of clients.values()) if(q!==p&&scope(q)===old)send(q,Buffer.concat([Buffer.from([3]),b.subarray(1)]));
        return;
      case 0:
        if(b[1]===8&&b.length===3&&b[2]<=1)p.rgb=b[2];
        else if(b[1]===16&&b.length===6){p.biggest=Buffer.from(b.subarray(2));p.biggestAt=now}
        else return;
        break;
      default: return; // Legacy tag/IP packets cannot move a socket into another room.
    }
    const current=scope(p);
    if(old!==current) {
      mark(old);p.biggest=null;
      if(!current&&p.seen.size){const out=snapshot([],p.seen,null);p.seen=out.next;send(p,out.bytes)}
    }
    mark(current);
  }
  server.on('upgrade',(req,socket,head)=>{
    let url;
    try{url=new URL(req.url,'http://localhost')}catch{socket.destroy();return}
    const room=url.searchParams.get('room');
    const deny=(code,phrase)=>socket.end('HTTP/1.1 '+code+' '+phrase+'\r\nConnection: close\r\nContent-Length: 0\r\n\r\n');
    if(url.pathname!=='/'||!ALLOWED_ORIGIN.test(req.headers.origin||'')||!allowed.has(room))return deny(403,'Forbidden');
    if(clients.size>=MAX_PEERS||[...clients.values()].filter(p=>p.room===room).length>=MAX_ROOM)return deny(503,'Service Unavailable');
    wss.handleUpgrade(req,socket,head,ws=>{
      const now=Date.now(), p={ws,room,id:nextId++,arena:null,seen:new Set(),nick:Buffer.alloc(0),
        skin:Buffer.alloc(0),color:Buffer.from([160,160,160]),x:0,y:0,mass:0,alive:0,rgb:0,lastAlive:now,
        rateAt:now,frames:0,lastCommand:0,biggest:null,biggestAt:0};
      clients.set(ws,p);send(p,Buffer.concat([Buffer.from([4]),uint(p.id)]));
      ws.on('message',(b,isBinary)=>receive(p,b,isBinary));
      ws.on('close',()=>disconnect(p));ws.on('error',()=>ws.terminate());
    });
  });
  const timer=setInterval(()=>{
    const now=Date.now();
    for(const p of clients.values()){
      if(now-p.lastAlive>30000)p.ws.terminate();
      if(p.biggest&&now-p.biggestAt>3000){p.biggest=null;mark(scope(p))}
    }
    if(!dirty.size)return;
    const groups=new Map();
    for(const p of clients.values()){const k=scope(p);if(!dirty.has(k))continue;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(p)}
    for(const group of groups.values()) for(const p of group){
      const peers=group.filter(q=>q!==p), leader=peers.filter(q=>q.biggest).sort((a,b)=>b.biggestAt-a.biggestAt)[0];
      const out=snapshot(peers,p.seen,leader?.biggest);p.seen=out.next;send(p,out.bytes);
    }
    dirty.clear();
  },flushMs);
  return {server,close(){if(closed)return;closed=true;clearInterval(timer);for(const p of clients.values())p.ws.terminate();wss.close();return new Promise(resolve=>server.close(resolve))}};
}
if(require.main===module){
  const rooms=(process.env.CREST_ROOMS||'').split(',').map(s=>s.trim()).filter(Boolean);
  const relay=createRelay({rooms});
  relay.server.listen(Number(process.env.PORT||8080),process.env.HOST||'127.0.0.1',()=>console.log('CREST relay listening'));
  for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>relay.close());
}
module.exports={createRelay};
