import React from 'react'
import { Input, DatePicker, Button, message } from 'antd'
import styles from './create.less'
import LabelInput from '../../components/labelInput/LabelInput'
import EditableTagGroup from '../../components/tag/Tag'
import UploadImg from '../../components/uploadImg/UploadImg'
import MarkdownEditor from '../../components/markdownEditor/MarkdownEditor'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment'
import { getNow } from '../../utils/utils'
import { uploadImg, getQnToken, addBlogService, getArticleService, updateBlogService } from '../../services/request'
import router from 'umi/router'

moment.locale('zh-cn')

const dateForm = 'MM-DD YYYY'

const setMessage = (type, text, infinite) => {
  if (!infinite) {
    return message[type](text)
  }
  return message[type](text, 0)
}

const { TextArea } = Input
const InputGroup = Input.Group

class Create extends React.Component {
  state = {
    title: '',
    tags: [],
    tagStr: '',
    cover: '',
    outline: '',
    created_time: moment().format(dateForm),
    content: '',
    markdown: '',
    id: '',
    $mark: React.createRef(),
    $cover: React.createRef()
  }

  getInputValue = (type, value) => {
    const t = {}
    t[type] = value
    this.setState({
      ...t
    })
  }

  getMarkAndHtml = (mark, html) => {
    this.setState({
      content: html,
      markdown: mark
    })
  }

  markAddImg = async (file) => {
    const handler = setMessage('loading', '图片上传中...', true)
    try {
      const { data: token } = await getQnToken()
      const data = new FormData()
      data.append('token', token)
      data.append('key', getNow() + file.name)
      data.append('file', file)
      const ret = await uploadImg(data)
      setMessage('success', '图片上传成功！')
      return `${process.env.UMI_APP_IMG}/${ret.data.key}`
    } catch (error) {
      setMessage('error', '图片上传失败！')
    } finally {
      setTimeout(handler, 0)
    }
  }


  recordUpload = info => {
    // 处理封面
    switch (info.file.status) {
    case 'done':
      openNotificationWithIcon('success', '上传成功！')
      this.setState({
        cover: `${process.env.UMI_APP_IMG}/${info.file.response.key}`
      })
      break
    case 'error':
      openNotificationWithIcon('error', '上传失败')
      break
    default:
      break
    }
  }

  formatTags = (oTags, tagsStr) => {
    const nTags = tagsStr.split(';')
    return Array.from(new Set([...oTags, ...nTags]))
  }

  getTag = tags => {
    this.setState({
      tags
    })
  }

  dateChange = (date, dateStr) => {
    if (date && dateStr) {
      this.setState({
        created_time: date.format(dateForm)
      })
    } else {
      this.setState({
        created_time: moment().format(dateForm)
      })
    }
  }

  getOldArticle = async (id) => {
    try {
      const ret = await getArticleService(id)
      this.setState({
        title: ret.data.title,
        tagStr: ret.data.tags.join(';'),
        cover: ret.data.cover,
        outline: ret.data.outline,
        created_time: ret.data.created_time,
        content: ret.data.content,
        markdown: ret.data.markdown || ''
      })
      ret.data.markdown && this.state.$mark.current.setDefaultValue(ret.data.markdown)
      ret.data.cover && this.state.$cover.current.setDefaultImg(ret.data.cover)
    } catch (error) {
      openNotificationWithIcon('error', '获取文章失败！', error.response.data.error)
    }
  }

  submit = async () => {

    const { tags, tagStr, title, cover, outline, created_time, content, markdown, id } = this.state
    if (!title || !content || !markdown) {
      return openNotificationWithIcon('warn', '无法发布！', '请检查标题、内容是否有空缺！')
    }
    const nTags = this.formatTags(tags, tagStr)
    const article = {
      title, cover, outline, created_time, content, markdown, tags: nTags
    }
    try {
      id ? await updateBlogService(id, article) : await addBlogService(article)
      openNotificationWithIcon('success', `${ id ? '修改' : '发布' }成功！`)
      router.push('/list')

    } catch (error) {
      openNotificationWithIcon('error', `${ id ? '修改' : '发布' }失败！`, error.response.data.error)
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    if (id) {
      this.setState({
        id
      })
      this.getOldArticle(id)
    }
  }

  render() {
    const { title, $cover, tagStr, outline, created_time, markdown, id, $mark } = this.state
    return (
      <div>
        <div className={styles['form-item']}>
          <LabelInput
            label="标题"
            value={title}
            onChange={e => this.getInputValue('title', e.target.value)}
          />
        </div>
        <div className={styles['form-item']}
          style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className={styles.tags}>
            <span>
              可选标签
            </span>
            <EditableTagGroup getTag={this.getTag} />
          </div>
          <p style={{ fontSize: 11, color: '#ff0000', marginTop: 10 }}>* 点击选择或取消，x 是删除数据库数据</p>
        </div>
        <div className={styles['form-item']}>
          <LabelInput
            label="文章Tags"
            value={tagStr}
            onChange={e => this.getInputValue('tagStr', e.target.value)}
            placeholder="该博文独有，用 ; (半角)隔离每个 Tag"
          />
        </div>
        <div className={styles['form-item']}>
          <span className={styles['label-span']}
            style={{ paddingRight: 10 }}>
            封面
          </span>
          <UploadImg
            ref={$cover}
            uploadStatus={info => this.recordUpload(info)} />
        </div>
        <div className={styles['form-item']}>
          <span className={styles['label-span']}
            style={{ paddingRight: 10 }}>
            概要
          </span>
          <TextArea
            value={outline}
            onChange={e => this.getInputValue('outline', e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <div className={styles['form-item']}>
          <span className={styles['label-span']}
            style={{ paddingRight: 10 }}>
            发布时间
          </span>
          <InputGroup compact>
            <DatePicker locale={locale}
              placeholder={id ? created_time : moment().format(dateForm)}
              format={dateForm}
              onChange={(date, dataStr) => this.dateChange(date, dataStr)}
            />
          </InputGroup>
        </div>
        <div>
          <span style={{ display: 'block', paddingBottom: 10 }}>博文内容</span>
          <MarkdownEditor addImg={(file) => this.markAddImg(file)}
            ref={$mark}
            value={markdown}
            onChange={(mark, html) =>this.getMarkAndHtml(mark, html)} />
        </div>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={this.submit}
          >
            {id ? '修改' : '发布'}
          </Button>
        </div>
      </div>
    )
  }
}

export default Create
