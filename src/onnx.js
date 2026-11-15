'use strict';

function fields(buf) {
  const out = []; let p = 0;
  const varint = () => { let n = 0n, shift = 0n; for (let i = 0; i < 10 && p < buf.length; i++) { const b = buf[p++]; n |= BigInt(b & 127) << shift; if (!(b & 128)) return n; shift += 7n; } throw new Error('Invalid protobuf varint.'); };
  while (p < buf.length) {
    const tag = Number(varint()), id = tag >>> 3, wire = tag & 7;
    if (!id) throw new Error('Invalid ONNX protobuf field.');
    if (wire === 0) out.push([id, wire, varint()]);
    else if (wire === 1) { if (p + 8 > buf.length) throw new Error('Truncated ONNX field.'); out.push([id, wire, buf.subarray(p, p + 8)]); p += 8; }
    else if (wire === 2) { const n = Number(varint()); if (n < 0 || p + n > buf.length) throw new Error('Truncated ONNX field.'); out.push([id, wire, buf.subarray(p, p + n)]); p += n; }
    else if (wire === 5) { if (p + 4 > buf.length) throw new Error('Truncated ONNX field.'); out.push([id, wire, buf.subarray(p, p + 4)]); p += 4; }
    else throw new Error(`Unsupported protobuf wire type ${wire}.`);
  }
  return out;
}
const text = b => Buffer.from(b).toString('utf8');
const DTYPES={1:'float32',2:'uint8',3:'int8',4:'uint16',5:'int16',6:'int32',7:'int64',9:'bool',10:'float16',11:'float64',12:'uint32',13:'uint64',16:'bfloat16'};
function valueInfo(buf){const f=fields(buf),type=f.find(x=>x[0]===2&&x[1]===2)?.[2],tensor=type&&fields(type).find(x=>x[0]===1&&x[1]===2)?.[2];let dtype='',shape=[];if(tensor){const t=fields(tensor);dtype=DTYPES[Number(t.find(x=>x[0]===1)?.[2]||0n)]||`type ${t.find(x=>x[0]===1)?.[2]||0}`;const s=t.find(x=>x[0]===2&&x[1]===2)?.[2];if(s)shape=fields(s).filter(x=>x[0]===1&&x[1]===2).map(x=>{const d=fields(x[2]);return String(d.find(y=>y[0]===1)?.[2]??text(d.find(y=>y[0]===2)?.[2]||Buffer.from('?')))});}return{name:text(f.find(x=>x[0]===1)?.[2]||[]),dtype,shape};}
function parseOnnx(buf, options={}) {
  const root = fields(buf), graphBytes = root.find(x => x[0] === 7 && x[1] === 2)?.[2];
  if (!graphBytes) throw new Error('No graph found. The file may not be an ONNX model.');
  const gf = fields(graphBytes), nodes = gf.filter(x => x[0] === 1 && x[1] === 2).map(x => {
    const f = fields(x[2]); const attributes=f.filter(y=>y[0]===5&&y[1]===2).map(y=>{const a=fields(y[2]),type=Number(a.find(z=>z[0]===20)?.[2]||0n),raw=a.find(z=>[2,3,4].includes(z[0]))?.[2];return{name:text(a.find(z=>z[0]===1)?.[2]||[]),type,value:raw instanceof Buffer?text(raw):String(raw??'')}}); return { inputs: f.filter(y => y[0] === 1).map(y => text(y[2])), outputs: f.filter(y => y[0] === 2).map(y => text(y[2])), name: text(f.find(y => y[0] === 3)?.[2] || []), op: text(f.find(y => y[0] === 4)?.[2] || []), attributes };
  });
  const names = id => gf.filter(x => x[0] === id && x[1] === 2).map(x => valueInfo(x[2])).filter(x=>x.name);
  const opsets = root.filter(x => x[0] === 8 && x[1] === 2).map(x => { const f = fields(x[2]); return { domain: text(f.find(y => y[0] === 1)?.[2] || []), version: String(f.find(y => y[0] === 2)?.[2] || '') }; });
  const init = gf.filter(x => x[0] === 5 && x[1] === 2).map(x => { const f = fields(x[2]); const dims = f.filter(y => y[0] === 1).map(y => String(y[2])); const type = Number(f.find(y => y[0] === 2)?.[2] || 0n); const name = text(f.find(y => y[0] === 8)?.[2] || []); const raw=f.find(y=>y[0]===9&&y[1]===2)?.[2];const external={};for(const y of f.filter(y=>y[0]===13&&y[1]===2)){const kv=fields(y[2]);external[text(kv.find(z=>z[0]===1)?.[2]||[])]=text(kv.find(z=>z[0]===2)?.[2]||[])}return { name, dims, type, dtype:DTYPES[type]||`type ${type}`, bytes:Number(raw?.length||external.length||0), ...(options.includeData?{rawData:raw?Buffer.from(raw):null,externalData:external,values:f.filter(y=>[4,5,7,10,11].includes(y[0])).map(y=>[y[0],y[1]===2?Buffer.from(y[2]):String(y[2])])}:{}) }; });
  return { irVersion: String(root.find(x => x[0] === 1)?.[2] || ''), graphName: text(gf.find(x => x[0] === 2)?.[2] || []), nodes, inputs: names(11), outputs: names(12), initializers: init, opsets, bytes: buf.length };
}
module.exports = { fields, valueInfo, parseOnnx, DTYPES };
