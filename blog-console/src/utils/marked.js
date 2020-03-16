import marked from 'marked'

// 配置 markdown 转 html 规则， 语言高亮
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    const hljs = require('highlight.js')
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    return hljs.highlight(validLanguage, code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

/**
 * 改写 对于 code 的 renderer 方法，更好的适应 highlight.js
 *
 * 本方法基于 marked 原方法改写，改写方式参照官网：https://marked.js.org/#/USING_PRO.md#renderer
 *
 * 其原方法可以通过打印日志查看源文件中方法查看
 */
const renderer = new marked.Renderer()

renderer.code = function (code, infostring, escaped) {
  const lang = (infostring || '').match(/\S*/)[0]
  if (lang.toLowerCase() === 'katex') {
    // 新增处理 katex 公式，放在块级代码块中解析
    const katexHtml = code.trim().length !== 0 ? window.katex.renderToString(code, {
      throwOnError: false
    }) : ''
    return '<p style="text-align:center">' + katexHtml + '</p>'
  }
  if (this.options.highlight) {
    const out = this.options.highlight(code, lang)
    if (out !== null && out !== code) {
      escaped = true
      code = out
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>'
  }

  return '<pre><div class="hljs"><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></div></pre>\n'
}

const markFn = (markdownText) => {
  return marked(markdownText, { renderer: renderer })
}

export default markFn