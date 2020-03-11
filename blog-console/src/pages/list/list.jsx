
import React from 'react'
import { List, Avatar } from 'antd'
import IconText from '../../components/iconText/IconText'
import { connect } from 'dva'
import Link from 'umi/link'
import ModalCom from '../../components/modal/Modal'
// import styles from './list.less'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import { deleteBlogService } from '../../services/request'

@connect(state => ({ lists: state.list.lists, count: state.list.count }), {
  getList: (condition) => ({ type: 'list/getList', payload: condition })
})
class BlogList extends React.Component {
  state = {
    page: 1,
    visible: false,
    confirmLoading: false,
    title: '',
    id: ''
  }

  toDelete = (id, title) => {
    this.setState({
      title,
      id
    })
    this.setModal(true, false)
  }

  handlerGetList = async (page, first) => {
    if (this.props.lists[page + 1] && !first) return
    const ret = await this.props.getList({ page, first })
    if (ret && ret.error) {
      openNotificationWithIcon('error', '获取博文失败！', ret.message)
      return
    }
  }

  pageChange = async (page) => {
    this.setState({
      page
    })
    this.handlerGetList(page - 1)
  }

  onOk = async () => {
    this.setModal(true, true)
    try {
      await deleteBlogService(this.state.id)
      await this.handlerGetList(0, true)
      this.setState({
        page: 1
      })
      openNotificationWithIcon('success', '删除成功！')
    } catch (error) {
      openNotificationWithIcon('error', '删除失败！', error.response.data.error)
    } finally {
      this.setModal(false, false)
    }
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

  componentDidMount () {
    this.props.getList({ page: 0, first: true })
  }

  render () {
    const { page, visible, confirmLoading, title } = this.state
    const { lists, count } = this.props
    const showList = lists[page]
    return (
      <>
        <List
          dataSource={showList}
          footer={
            <div>
              <b>共有{count}条</b>
            </div>
          }
          itemLayout="vertical"
          pagination={{
            current: page,
            onChange: page => this.pageChange(page),
            total: count
          }}
          renderItem={(item, idx) => (
            <List.Item
              actions={[
                <Link style={{ color: 'rgba(0, 0, 0, 0.45)' }}
                  key="look"
                  to={'/blog/' + item._id}>
                  <IconText key="list-vertical-eye-o"
                    text="查看"
                    type="eye-o" />
                </Link>,
                <Link style={{ color: 'rgba(0, 0, 0, 0.45)' }}
                  key="edit"
                  to={'/create/' + item._id}>
                  <IconText key="list-vertical-edit-o"
                    text="编辑"
                    type="edit-o" /></Link>,
                <IconText key="list-vertical-delete-o"
                  text="删除"
                  onClick={() => this.toDelete(item._id, item.title)}
                  type="delete-o" />
              ]}
              extra={
                <img
                  alt=""
                  src={item.cover}
                  width={272}
                  height={160}
                />
              }
              key={item._id}
            >
              <List.Item.Meta
                avatar={<Avatar>{idx + 1}</Avatar>}
                description={<>
                  <span style={{ marginRight: 25 }}>tags: {item.tags.join('  ')}</span>
                  <span>时间：{item.created_time}</span>
                </>}
                title={<a href="void:;">{item.title}</a>}
              />
              {item.outline}
            </List.Item>
          )}
          size="large"
        />
        <ModalCom title="发布"
          visible={visible}
          confirmLoading={confirmLoading}
          handleOk={() =>this.onOk()}
          handleCancel={() => this.onCancel()} >确认删除{<span style={{ color: '#1890ff' }}> {title}</span>} ？</ModalCom>
      </>
    )
  }
}

export default BlogList