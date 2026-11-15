'use strict';
const { readPsd } = require('ag-psd');
function parsePsd(buf) {
  const psd = readPsd(buf, { skipLayerImageData: false, skipCompositeImageData: false, useImageData: true });
  const layers = [];
  function walk(items, parent = '') { for (const l of items || []) { const path = parent ? `${parent}/${l.name || '(unnamed)'}` : (l.name || '(unnamed)'); layers.push({ name: l.name || '(unnamed)', path, left: l.left || 0, top: l.top || 0, right: l.right || 0, bottom: l.bottom || 0, opacity: l.opacity ?? 1, hidden: !!l.hidden, text: l.text?.text || '', group: !!l.children }); if (l.children) walk(l.children, path); } }
  walk(psd.children);
  const image = psd.imageData;
  return { width: psd.width, height: psd.height, colorMode: psd.colorMode, bitsPerChannel: psd.bitsPerChannel, channels: psd.channels, layers, composite: image ? { width: image.width, height: image.height, data: Array.from(image.data) } : null, warnings: psd.warnings || [] };
}
module.exports = { parsePsd };
