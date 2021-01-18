
import React from 'react'
import styles from './$links.less'
import { Empty } from 'antd'
import LabelInput from '../../components/labelInput/LabelInput'
import { getLinksService, passLinkService, deleteLinkService } from '../../services/request'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import ModalCom from '../../components/modal/Modal'

class Links extends React.Component {

  state = {
    defaultLinks: [],
    links: [],
    canSet: [],
    oprateType: '',
    visible: false,
    confirmLoading: false,
    linkIndex: -1
  }

  getLinks = async () => {
    const { data } = await getLinksService()
    if (data.errno === 0) {
      // 对 对象数组 做深拷贝，转换为字符串再格式化
      const copyLinks = JSON.parse(JSON.stringify(data.data))
      this.setState({
        links: [...data.data],
        defaultLinks: [...copyLinks]
      })
      this.initCanSet(data.data)
    }

  }

  initCanSet = (links) => {
    const canSet = []
    links.forEach(item => {
      if (item.verified) {
        canSet.push(1)
      } else {
        canSet.push(0)
      }
    })
    this.setState({
      canSet: [...canSet]
    })
  }

  linkList = (links, verified) => {
    if (links.length === 0) return []
    // eslint-disable-next-line
    return links.map((item, index) => {
      if (item.verified === verified) {
        return (
          <div key={item._id}
            className={styles.link}>
            <div className={styles.info}>
              <LabelInput label="昵称"
                onChange={(e) => this.getValue(index, 'username', e.target.value)}
                disabled={this.state.canSet[index] === 1}
                value={this.state.links[index]['username']} />
              <LabelInput label="博客"
                onChange={(e) => this.getValue(index, 'blog_url', e.target.value)}
                disabled={this.state.canSet[index] === 1}
                value={this.state.links[index]['blog_url']} />
              <LabelInput label="Git"
                onChange={(e) => this.getValue(index, 'git_name', e.target.value)}
                disabled={this.state.canSet[index] === 1}
                value={this.state.links[index]['git_name']} />
              <LabelInput label="描述"
                onChange={(e) => this.getValue(index, 'description', e.target.value)}
                disabled={this.state.canSet[index] === 1}
                value={this.state.links[index]['description']} />
            </div>
            <div className={styles.opt}>
              <a href="void:;"
                disabled={this.state.canSet[index] === 1}
                onClick={() => this.confirm(index)}>确认</a>
              <i>|</i>
              <a href="void:;"
                disabled={!verified}
                onClick={() => this.toReset(index)}>开启/关闭修改</a>
              <i>|</i>
              <a href="void:;"
                onClick={() => this.toDelete(index)}>删除</a>
            </div>
          </div>
        )
      }
    })
  }

  toReset = (idx) => {
    const { canSet } = this.state
    canSet[idx] = canSet[idx] === 1 ? 0 : 1
    this.setState({
      canSet: [...canSet]
    })
  }

  confirm = (idx) => {
    const oLink = this.state.defaultLinks[idx]
    const nLink = this.state.links[idx]
    let noChange = true
    const newInfo = {}
    for (const key of Object.keys(oLink)) {
      if (oLink[key] !== nLink[key]) {
        noChange = false
        newInfo[key] = nLink[key]
      }
    }
    // 如果是提交修改已有友链，但又没有修改内容，给错误提示
    if (this.state.links[idx].verified && noChange) {
      openNotificationWithIcon('warn', '无法提交', '检测没有内容发生修改，请仔细检查一遍。')
      return
    }
    if (!this.state.links[idx].verified) {
      newInfo['verified'] = true
    }
    this.setState({
      visible: true,
      oprateType: 'update',
      linkIndex: idx,
      updateLink: newInfo
    })
  }

  toDelete = (idx) => {
    this.setState({
      visible: true,
      oprateType: 'delete',
      linkIndex: idx
    })
  }

  getValue = (index, type, value) => {
    const o = this.state.links
    o[index][type] = value
    this.setState({
      links: [...o]
    })
  }

  onOk = async () => {
    this.setState({
      // visible: false
      confirmLoading: true
    })
    const { linkIndex, updateLink, oprateType } = this.state
    const id = this.state.links[linkIndex]._id
    try {
      if (oprateType === 'update') {
        const { data } = await passLinkService(id, updateLink)
        if (data.errno === 0) {
          openNotificationWithIcon('success', '修改成功！')
        }
      } else {
        const { data } = await deleteLinkService(id)
        if (data.errno === 0) {
          openNotificationWithIcon('success', '删除成功！')
        }
      }
      this.getLinks()
    } finally {
      this.setState({
        visible: false,
        confirmLoading: false
      })
    }
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  componentDidMount () {
    this.getLinks()
  }

  render () {
    const { id } = this.props.match.params
    const verified = id === 'apply' ? false : true
    document.title = id === 'apply' ? '友链申请处理' : '已有友链'
    const linkList = this.linkList(this.state.links, verified)
    return (
      <>
        <div className={styles.links}>
          {linkList.length === 0 ? <Empty description="现在还是空的哦~" /> : linkList}
        </div>
        <ModalCom title="操作提示"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          handleOk={() => this.onOk()}
          handleCancel={() => this.onCancel()} >{this.state.oprateType === 'update' ? '确认提交？' : '确认删除？'}</ModalCom>
      </>
    )
  }
}

export default Links

