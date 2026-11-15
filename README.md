# ONNX Viewer & Model Graph

onnx model viewer in VS Code. Open an .onnx file to inspect graph nodes, edges, inputs and outputs without an account or a network connection.

![ONNX Viewer & Model Graph showing resnet18-v1-7.onnx in the VS Code editor](images/screenshot.png)

- The free view lists operators and their input and output names.
- Search the node list and review graph inputs, outputs, opsets and initializers.
- Files stay on your computer. The model isn't modified.

## Zovo Pro

Zovo Pro: USD 19 once.

- Save a model summary and opset check.
- Compare the graph operations, inputs and outputs in two models.
- Export a node map as SVG and raw initializer tensors as NPY files.

## Limits

The reader handles common ONNX graph fields. It doesn't decode string tensors or values stored outside raw tensor data. External tensor paths must stay beside the model. The graph view shows the first 200 nodes and uses file order within each dependency layer.

Made by Zovo.

## Support Zovo

Zovo Pro: USD 19 once, every Zovo viewer. [Get Zovo Pro on GitHub Sponsors](https://github.com/sponsors/theluckystrike/sponsorships?tier_id=679878) to turn on the Pro tools in this extension and in the other Zovo extensions you use. The free features stay free.

Zovo extensions have no ads and no tracking. They are made by [theluckystrike](https://github.com/theluckystrike) on GitHub. You can also support the work with no Pro:

- [Sponsor on GitHub](https://github.com/sponsors/theluckystrike)
- [PayPal](https://www.paypal.com/paypalme/najzzz)
- [Follow theluckystrike on GitHub](https://github.com/theluckystrike)

### Need your format supported?

Open a [format request](https://github.com/theluckystrike/zovo-plugin-factory/issues/new?template=format-request.yml) with a sample file, and I reply there whether it can be done. For USD 299 once, through [this GitHub Sponsors tier](https://github.com/sponsors/theluckystrike/sponsorships?tier_id=679995), I add your file format or a missing feature to this extension, with tests, within 7 days.

## More tools by Zovo

- [PDF Viewer & PDF Reader to Read and View PDF (Dark Mode)](https://marketplace.visualstudio.com/items?itemName=zovo.pdf-viewer-dark) reads PDFs with a real dark mode, search, an outline and thumbnails.
- [XLSX Viewer, Excel Viewer, CSV Viewer & Parquet Viewer (XLS, CSV Preview)](https://marketplace.visualstudio.com/items?itemName=zovo.table-viewer-vscode) opens CSV, TSV, Excel and Parquet files as a sortable, filterable table.
- [DOCX Viewer & ODT Viewer, Word Document Preview (Dark Mode)](https://marketplace.visualstudio.com/items?itemName=zovo.docx-viewer-vscode) previews Word and ODT files with dark mode, an outline and search.

See [all Zovo extensions on the Marketplace](https://marketplace.visualstudio.com/publishers/zovo).
