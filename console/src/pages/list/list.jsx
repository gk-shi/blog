
import React from 'react'
import { List, Avatar } from 'antd'
import IconText from '../../components/iconText/IconText'
import { connect } from 'dva'
import Link from 'umi/link'
import ModalCom from '../../components/modal/Modal'
import styles from './list.less'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import { deleteBlogService, baiduSeo } from '../../services/request'

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

  // 百度收录
  toIncluded = (blogs) => {
    const urls = blogs.map(item => {
      return  process.env.UMI_APP_BLOG_URL + '/blog/' + item._id
    })
    baiduSeo(urls).then(({ data }) => {
      if (data && data.errno === 0) {
        openNotificationWithIcon('success', '收录成功！')
      }
    })
  }

  handlerGetList = async (page, first) => {
    if (this.props.lists[page + 1] && !first) return
    const ret = await this.props.getList({ page, first })
    if (ret && ret.error) return
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
      const { data } = await deleteBlogService(this.state.id)
      if (data.errno === 0) {
        openNotificationWithIcon('success', '删除成功！')
        await this.handlerGetList(0, true)
        this.setState({
          page: 1
        })
      }
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
              <b>共有{count}条
                <IconText key="list-vertical-rise-o"
                  className={styles['included-all']}
                  text="本页全部收录"
                  onClick={() => this.toIncluded(showList)}
                  type="rise-o" /></b>
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
                  type="delete-o" />,
                <IconText key="list-vertical-rise-o"
                  text="收录"
                  onClick={() => this.toIncluded([item])}
                  type="rise-o" />
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