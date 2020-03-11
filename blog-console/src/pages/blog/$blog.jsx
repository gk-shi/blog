
import React from 'react'
import styles from './$blog.less'
import Reply from '../../components/reply/Reply'
import { Divider, Icon } from 'antd'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import { getArticleService, getCommentsService, issueCommentService, deleteCommentService } from '../../services/request'
import { connect } from 'dva'

@connect(state => ({ userInfo: state.user }))
class Blog extends React.Component {

  state = {
    id: '',
    blog: {},
    // 以下为该博文评论相关
    comments: {},
    page: 1,
    count: 0
  }

  getBlog = async (id) => {
    try {
      const ret = await getArticleService(id)
      this.setState({
        blog: ret.data
      })
    } catch (error) {
      openNotificationWithIcon('error', '获取博文失败！', error.response.data.error)
    }
  }

  getComments = async (id, page, first) => {
    // page 从 0 开始
    if (this.state.comments[page + 1] && !first) return
    try {
      const ret = await getCommentsService(id, page, first)
      if (first) {
        return this.setState({
          comments: {
            '1': ret.data[0]
          },
          count: ret.data[1]
        })
      }
      this.setState((state) => {
        const t = { ...state.comments }
        t[`${page + 1}`] = ret.data[0]
        return {
          comments: { ...t }
        }
      })
    } catch (error) {
      openNotificationWithIcon('error', '获取评论失败！', error.response.data.error)
    }
  }

  pageChange = (page) => {
    this.setState({
      page
    })
    this.getComments(this.state.id, page - 1)
  }

  deleteComment = async (id) => {
    try {
      await deleteCommentService(id)
      this.getComments(this.state.id, 0, true)
      this.setState({
        page: 1
      })
      openNotificationWithIcon('success', '删除成功！')
    } catch (error) {
      openNotificationWithIcon('error', '删除失败！', error.response.data.error)
    }
  }

  publishComment = async (text) => {
    const { userInfo } = this.props
    const comment = {
      username: userInfo.nickname,
      content: text,
      avt: userInfo.avatar,
      art_id: this.state.id,
      is_admin: userInfo.isTest ? false : true
    }
    try {
      await issueCommentService(comment)
      openNotificationWithIcon('success', '发布成功！')
      this.getComments(this.state.id, 0, true)
      this.setState({
        page: 1
      })
    } catch (error) {
      openNotificationWithIcon('error', '发布失败！', error.response.data.error)
    }
  }

  arr2Str = (arr) => {
    if (!arr) return
    return arr.join('  ')
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.setState({
      id
    })
    this.getBlog(id)
    this.getComments(id, 0, true)
  }

  render () {
    const { blog, comments, page, count } = this.state
    const showList = comments[page]
    return (
      <div>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles['blog-info']}>
          <time className={styles.time}><Icon className={styles['blog-info-icon']}
            type="clock-circle" />{blog.created_time}</time>
          <p><Icon className={styles['blog-info-icon']}
            type="tags" />{this.arr2Str(blog.tags)}</p>
        </div>
        <div className="markdown-body">
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
        <Divider className="divider">这是一条很羞涩的分割线⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</Divider>
        <Reply list={showList}
          delete={(id) => this.deleteComment(id)}
          publish={(text) => this.publishComment(text)}
          paginationConfig={{ current: page, total: count, onChange: (page) => this.pageChange(page) }} />
      </div>
    )
  }
}

export default Blog