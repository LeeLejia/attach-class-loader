const cheerio = require('cheerio')
const loaderUtils = require('loader-utils');

const defaultConfig = {
  tranfClass: 'tranf-node',
  tranfSelector: 'p,h1,h2,h3,h4,h5,h6,img',
  // 是否处理只有文本的Div节点
  textDiv: true,
  nodeMap: [
    { test: /.html/, nodeName: 'body' },
    { test: /.vue/, nodeName: 'template' }
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
  const nodeName = docType.nodeName
  return source.replace(new RegExp(`<${nodeName}[^>]*>[\\s\\S]*<\/[^>]*${nodeName}>`, 'ig'), node => {
    $ = cheerio.load(node, {
      decodeEntities: false,
      xmlMode: true
    });
    if (!$.length) {
      // 非dom对象
      return node;
    }
    const textBlock = $(config.tranfSelector)
    textBlock.addClass(config.tranfClass)
    if (config.textDiv) {
      const divList = $('div,li')
      divList.filter(function () {
        return $(this).children().filter(function () {
          return !['span'].includes(this.name)
        }).length === 0
      }).addClass(config.tranfClass)
    }
    return $.html()
  })
}

module.exports = attachClassLoader;
