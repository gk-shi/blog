import React, { Component } from 'react'
import Editor from 'for-editor'
// import marked from 'marked'
import marked from '../../utils/marked'

// // 配置 markdown 转 html 规则， 语言高亮
// marked.setOptions({
//   renderer: new marked.Renderer(),
//   highlight: function(code, language) {
//     const hljs = require('highlight.js')
//     const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
//     return hljs.highlight(validLanguage, code).value
//   },
//   pedantic: false,
//   gfm: true,
//   breaks: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false,
//   xhtml: false
// })

class MarkdownEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.$vm = React.createRef()
  }

  addImg = async (file) => {
    const ret = await this.props.addImg(file)
    this.$vm.current.$img2Url(file.name, ret)
  }

  handleChange = (value) => {
    this.setState({
      value
    })
    this.props.onChange(value, marked(value))
  }

  copyHtml = () => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', marked(this.state.value))
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
    }
    document.body.removeChild(input)
  }

  setDefaultValue = (value) => {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    return <Editor value={value}
      ref={this.$vm}
      addImg={(file) => this.addImg(file)}
      preview
      subfield
      onSave={this.copyHtml}
      onChange={(value) => this.handleChange(value)} />
  }
}

export default MarkdownEditor