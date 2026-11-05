'use strict';
const {test}=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'), {WebSocket}=require('ws'), {createRelay}=require('./relay.cjs');
const hello=(arena='alpha2.3rb.io',name='Alice')=>{
  const pos=Buffer.alloc(9);pos[0]=16;pos.writeInt16LE(321,1);pos.writeInt16LE(-89,3);pos.writeUInt32LE(1234,5);
  return [Buffer.from('\x01'+name+'\0'),Buffer.from([2,1,2,3]),Buffer.from('\x04ABC1234||ABCDEF|MO1:'+encodeURIComponent(JSON.stringify(['wss://'+arena+'/game',1,[],[]]))+'\0'),Buffer.from([32,1]),pos];
};
async function fixture(t){
  const relay=createRelay({rooms:['T_LOCALCHECK','T_OTHER'],flushMs:15});
  await new Promise((resolve,reject)=>{relay.server.once('error',reject);relay.server.listen(0,'127.0.0.1',resolve)});
  const port=relay.server.address().port;t.after(()=>relay.close());
  const connect=async(room='T_LOCALCHECK',origin='https://3rb.io')=>{
    const ws=new WebSocket('ws://127.0.0.1:'+port+'/?room='+room,{origin}), messages=[];
    ws.on('message',b=>messages.push(Buffer.from(b)));
    await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject)});
    return {ws,messages,send(frames){frames.forEach(b=>ws.send(b))}};
  };
  return {connect,port};
}
const latest=c=>c.messages.findLast(b=>b[0]===1);
const count=b=>b?.[2+(b[1]||0)*4];
async function until(fn){for(let i=0;i<100;i++){const r=fn();if(r)return r;await new Promise(r=>setTimeout(r,10))}throw Error('Expected event did not arrive')}
test('two real WebSocket clients share matching-room positions and exclude self',async t=>{
  const {connect,port}=await fixture(t);const health=await fetch('http://127.0.0.1:'+port+'/healthz');assert.deepEqual(await health.json(),{ok:true});
  const a=await connect(),b=await connect();a.send(hello());b.send(hello('alpha2.3rb.io','Bob'));
  const out=await until(()=>count(latest(b))===1&&latest(b));assert.equal(count(out),1);
  assert.equal(out.readUInt32LE(3),a.messages[0].readUInt32LE(1));assert.equal(out[7],119);
  assert.equal(out.subarray(8,13).toString(),'Alice');
  const tail=out.length-11;assert.equal(out.readInt16LE(tail),321);assert.equal(out.readInt16LE(tail+2),-89);assert.equal(out.readUInt32LE(tail+4),1234);
  assert.equal(out[tail+8],1);a.ws.close();const removed=await until(()=>latest(b)?.[1]===1&&latest(b));assert.equal(removed.readUInt32LE(2),a.messages[0].readUInt32LE(1));assert.equal(count(removed),0);
});
test('rooms and game servers are isolated and changing arena removes stale teammates',async t=>{
  const {connect}=await fixture(t),a=await connect(),b=await connect(),c=await connect('T_OTHER'),d=await connect();
  a.send(hello());b.send(hello('alpha2.3rb.io','Bob'));c.send(hello());d.send(hello('alpha3.3rb.io'));
  await until(()=>count(latest(a))===1&&latest(c)&&latest(d));assert.equal(count(latest(c)),0);assert.equal(count(latest(d)),0);
  a.send(hello('alpha3.3rb.io'));await until(()=>latest(b)?.[1]===1&&count(latest(d))===1);
  assert.equal(count(latest(b)),0);
});
test('requires an allowed room and a 3rb browser origin',async t=>{
  const {connect}=await fixture(t);await assert.rejects(connect('T_UNKNOWN'),/403/);await assert.rejects(connect('T_LOCALCHECK','https://3rb.io.example.com'),/403/);
});
test('existing CREST sender and parser work over the relay without wire changes',{skip:!process.env.CREST_CLIENT_FILE},async t=>{
  const {connect}=await fixture(t);const source=fs.readFileSync(process.env.CREST_CLIENT_FILE,'utf8');
  const extract=n=>{const p=source.indexOf('  class '+n+' {'),q=source.indexOf('\n  }',p);assert.ok(p>=0&&q>p,n);return source.slice(p,q+4)};
  const a=await connect(),b=await connect();
  const data={teamPlayers:new Map(),teamAlternator:true,teamData:{1:{},2:{}},biggest:{},getPlayer(id){if(!this.teamPlayers.has(id))this.teamPlayers.set(id,{});return this.teamPlayers.get(id)},remove(id){this.teamPlayers.delete(id)}};
  const ws={connected:true,send(buffer){a.ws.send(buffer)}},game={ip:'wss://alpha2.3rb.io/game'},p={nick:'CREST Player',nick2:'',skin:'ABC1234',colorObject:{r:1,g:2,b:3},isAlive:true,x:321,y:-89,mass:1234,tag:'LOCALCHECK'};
  const {sender,parser}=new Function('RelayWs','RelayData','Player','WsConnection','MoSharedCosmetics',extract('DataReader')+'\n'+extract('RelaySender')+'\n'+extract('RelayParser')+'\nreturn {sender:RelaySender,parser:RelayParser}')(ws,data,p,game,{payload(){return 'MO1:'+encodeURIComponent(JSON.stringify([game.ip,1,[],[]]))},read(){}});
  sender.init();b.send(hello('alpha2.3rb.io','Bob'));
  const packet=await until(()=>count(latest(b))===1&&latest(b));parser.parse({data:Uint8Array.from(packet).buffer});
  const player=[...data.teamPlayers.values()][0];assert.equal(player.nick,p.nick);assert.equal(player.x,321);assert.equal(player.y,-89);assert.equal(player.mass,1234);assert.equal(player.isAlive,1);
});
