'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {parseOnnx,fields}=require('../src/onnx');
test('reads an ONNX graph, node links and opset',()=>{const m=parseOnnx(fs.readFileSync('samples/tiny-classifier.onnx'));assert.equal(m.nodes.length,1);assert.equal(m.nodes[0].op,'Gemm');assert.equal(m.inputs[0].name,'input');assert.equal(m.outputs[0].name,'scores');assert.equal(m.opsets[0].version,'17')});
test('rejects files without a graph',()=>assert.throws(()=>parseOnnx(Buffer.from([8,1])),/No graph/));
test('rejects truncated fields',()=>assert.throws(()=>fields(Buffer.from([10,5,1])),/Truncated/));
