const cheerio = require('cheerio')
const loaderUtils = require('loader-utils');

const defaultConfig = {
  tranfClass: 'tranf-node',
  tranfSelector: 'p,h1,h2,h3,h4,h5,h6,img',
  // 是否处理只有文本的Div节点
  textDiv: true,
  nodeMap: [
    { test: /.html/, rootSelector: 'body' },
    { test: /.vue/, rootSelector: 'template' }
  ]
}

function attachClassLoader(source) {
  const options = loaderUtils.getOptions(this);
  const config = Object.assign({}, defaultConfig, options)
  const sourcePath = this.resourcePath;
  const docType = config.nodeMap.find(it => it.test.test(sourcePath))
  if (!docType) {
    return source
  }
  const rootSelector = docType.rootSelector
  $ = cheerio.load(source, {
    decodeEntities: false,
    xmlMode: true
  });
  if (!$.length) {
    // 非dom对象
    return source;
  }

  // 处理
  function tranf(node) {
    const textBlock = node.find(config.tranfSelector)
    textBlock.addClass(config.tranfClass)
    if (config.textDiv) {
      const divList = node.find('div')
      divList.filter(function () {
        return $(this).children().length === 0;
      }).addClass(config.tranfClass)
    }
  }
  const root = $(rootSelector)
  if (!root.length) {
    return source
  }
  tranf(root)
  return $.html()
}

module.exports = attachClassLoader;