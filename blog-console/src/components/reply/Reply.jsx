import React, { Component } from 'react'
import ReplyBox from './ReplyBox'
import ReplyList from './ReplyList'
import ModalCom from '../modal/Modal'
import { Pagination } from 'antd'
import styles from './Reply.less'
import { openNotificationWithIcon } from '../notification/Notification'

class Reply extends Component {

  // 通过状态提升来解决兄弟组件共用值的问题
  state = {
    text: '',
    visible: false,
    confirmLoading: false,
    isDelete: false,
    id: '',
    idx: ''
  }

  textChangeValue = (text) => {
    this.setState({
      text
    })
  }

  addValue = (value) => {
    this.setState((state) => ({ text: state.text + value }))
  }

  onOk = async () => {
    const { isDelete, text, id } = this.state
    if (!isDelete) {
      if(text.length === 0) {
        openNotificationWithIcon('warn', '内容为空', '发布内容不能为空！')
        this.setModal(false, false)
        return
      }
    }
    this.setModal(true, true)
    if (isDelete) {
      await this.props.delete(id)
    } else {
      await this.props.publish(this.state.text)
    }
    this.setModal(false, false)
  }

  onCancel = () => {
    this.setModal(false, false)
  }

  setModal = (visible, confirmLoading) => {
    this.setState({
      visible,
      confirmLoading
    })
  }

  toSubmit = () => {
    this.setState({
      isDelete: false
    })
    this.setModal(true, false)
  }

  replyPerson = (person) => {
    this.addValue(`  @${person}  `)
  }

  toDelete = (id) => {
    this.setModal(true, false)
    this.setState({
      isDelete: true,
      id
    })
  }

  render () {
    const { text, confirmLoading, visible, isDelete } = this.state
    const { list, paginationConfig } = this.props
    return (
      <>
        <ReplyBox textArea={text}
          toSubmit={() => this.toSubmit()}
          emojiSelect={(emoji) => this.addValue(emoji)}
          textOnChange={(e) => this.textChangeValue(e.target.value)} />
        <ReplyList list={list}
          toDelete={(id) => this.toDelete(id)}
          toReplyPerson={(person) => this.replyPerson(person)} />
        <span style={{ margin: '20px 0', display: 'block' }}>共有{paginationConfig.total}条</span>
        <Pagination
          {...paginationConfig}
          className={styles.pagination}
          // current={page}
        />
        <ModalCom title="发布"
          visible={visible}
          confirmLoading={confirmLoading}
          handleOk={() =>this.onOk()}
          handleCancel={() => this.onCancel()} >确认{isDelete ? '删除' : '发布'}？</ModalCom>
      </>
    )
  }
}

export default Reply