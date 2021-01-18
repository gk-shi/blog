import React from 'react'
// import styles from './comment.less'
import Reply from '../../components/reply/Reply'
import { connect } from 'dva'
import { openNotificationWithIcon } from '../../components/notification/Notification'

@connect(state => ({ blesses: state.bless.blesses, count: state.bless.count, userInfo: state.user }), {
  getBless: (condition) => ({ type: 'bless/getBless', payload: condition }),
  addBless: (bless) => ({ type: 'bless/addBless', payload: bless }),
  deleteBless: (condition) => ({ type: 'bless/deleteBless', payload: condition })
})
class Bless extends React.Component {

  state ={
    page: 1
  }

  pageChange = (page) => {
    this.setState({
      page
    })
    if (!this.props.blesses[page]) {
      this.props.getBless({ page: page - 1 })
    }
  }

  deleteBless = async (id) => {
    const res = await this.props.deleteBless(id)
    if (res.errno === 0) {
      openNotificationWithIcon('success', '删除成功！')
      this.setState({
        page: 1
      })
      this.props.getBless({ page: 0, first: true })
    }
  }

  publish = async (text) => {
    const { userInfo } = this.props
    const bless = {
      username: userInfo.nickname,
      avt: userInfo.avatar,
      is_admin: userInfo.isTest ? false : true,
      content: text
    }
    const res = await this.props.addBless(bless)
    if (res.errno === 0) {
      openNotificationWithIcon('success', '发布成功！')
      this.props.getBless({ page: 0, first: true })
    }
  }

  componentDidMount () {
    this.props.getBless({ page: 0, first: true })
  }

  render () {
    const { page } = this.state
    const { blesses, count } = this.props
    // const [start, end] = [(page - 1) * 10, page * 10]
    const list = blesses[page]
    return (
      <div>
        <Reply list={list}
          delete={(id) => this.deleteBless(id)}
          publish={(text) => this.publish(text)}
          paginationConfig={{ current: page, total: count, onChange: (page) => this.pageChange(page) }} />
      </div>
    )
  }
}

export default Bless
