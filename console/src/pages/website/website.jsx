
import React, { useState, useEffect } from 'react'
import MarkdownEditor from '../../components/markdownEditor/MarkdownEditor'
import { uploadImg, getQnToken, getWebsiteService, addWebsiteService, updateWebsiteService } from '../../services/request'
import { getNow } from '../../utils/utils'
import { Button, message } from 'antd'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import styles from './website.less'

// 由于 componentWillMount 钩子的原因，不适用
// const MarkdownPanel = dynamic({
//   loader: () => import('../../components/markdownEditor/MarkdownEditor')
// })import { connect } from 'dva'

const setMessage = (type, text, infinite) => {
  if (!infinite) {
    return message[type](text)
  }
  return message[type](text, 0)
}

const markAddImg = async (file) => {
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

export default function () {

  let $mark = React.createRef()

  const [isAdd, setIsAdd] = useState(0)
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  const getMarkAndHtml = (mark, html) => {
    setHtml(html)
    setMarkdown(mark)
  }

  const update = async () => {
    setIsSubmit(true)
    const body = { markdown, html }
    try {
      let ret
      if (isAdd) {
        ret = await addWebsiteService(body)
      } else {
        ret = await updateWebsiteService(body)
      }
      if (ret.data.errno === 0) {
        openNotificationWithIcon('success', `${isAdd ? '添加' : '修改'}成功！`)
      }
    } finally {
      setIsSubmit(false)
    }
  }

  useEffect(() => {
    const getWebsite = async () => {
      const { data } = await getWebsiteService()
      if (data.errno === 0) {
        const { markdown = undefined } = data.data[0] || {}
        if (!markdown || markdown.length === 0) {
          setIsAdd(1)
          return
        }
        $mark.current.setDefaultValue(markdown)
      }
    }
    getWebsite()
    //虽然依赖 $mark ，但因为只需要模拟一次 componentDidMount 就行
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => $mark = null
  }, [])

  return (
    <>
      <MarkdownEditor addImg={(file) => markAddImg(file)}
        ref={$mark}
        value={markdown}
        onChange={(mark, html) => getMarkAndHtml(mark, html)} />
      <Button
        type="primary"
        onClick={update}
        disabled={markdown.length === 0 || isSubmit}
        className={styles.btn}
      >
        {isAdd ? '添加' : '修改'}
      </Button>
    </>
  )
}
