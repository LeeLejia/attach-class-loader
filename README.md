# attach-class-loader

attach-class-loader 用于在项目打包阶段在 xml 模版指定节点添加 class。

# options

```json
// defaultOptions
{
  // 附加的class名称
  "tranfClass": "tranf-node",
  // 该选择器选中的节点将附加 tranfClass
  "tranfSelector": "p,h1,h2,h3,h4,h5,h6,img",
  // 是否为只包含了文本的div节点添加 tranfClass
  "textDiv": true,
  // 文件名和对应开始处理的节点
  "nodeMap": [
    { "test": /.html/, "rootSelector": "body" },
    { "test": /.vue/, "rootSelector": "template" }
  ]
}
```
