module.exports = {
  "id": "zovo.zovo-onnx-viewer",
  "prefix": "onnxViewer",
  "kind": "onnx",
  "name": "ONNX Viewer & Model Graph",
  "selector": [
    "onnx"
  ],
  "tools": [
    {
      "id": "summary",
      "feature": "summary",
      "title": "Model summary and checks"
    },
    {
      "id": "compare",
      "feature": "compare",
      "title": "Compare two ONNX models"
    },
    {
      "id": "export",
      "feature": "export",
      "title": "Export graph and tensors"
    }
  ]
};
