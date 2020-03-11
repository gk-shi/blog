import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import Link from 'umi/link'
import router from 'umi/router'
import WithRouter from 'umi/withRouter'
import logo from '../assets/logo.svg'
import styles from './BasicLayout.less'
import Unread from '../components/layout/Unread'
import { connect } from 'dva'
import { getUnreadService, updateUnreadService } from '../services/request'

const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

@connect(state => ({ userInfo: state.user }), {
  clear: () => ({ type: 'user/clear' })
})
class BasicLayout extends Component {

  rootSubmenuKeys = ['links']
  state = {
    collapsed: false,
    openKeys: [],
    unReads: []
  }


  toggle = () => {
    this.setState((state) => ({
      collapsed: !state.collapsed
    }))
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  getPathName (path) {
    if (path.includes('links'))
      return path.slice(1)
    return path.split('/')[1]
  }

  logout = () => {
    this.props.clear()
    router.replace('/login')
  }

  unRead = (idx) => {
    try {
      if (idx === 'all') {
        if (this.state.unReads.length === 0) return
        // 全部已读
        updateUnreadService('all')
        this.setState({
          unReads: []
        })
      } else {
        const { _id, id } = this.state.unReads[idx]
        updateUnreadService(_id)
        this.setState((state) => {
          state.unReads.splice(idx, 1)
          return {
            unReads: [...state.unReads]
          }
        })
        id ? router.push(`/blog/${id}`) : router.push('/bless')
      }
    } catch (error) {
      console.log(error)
    }
  }

  getUnreads = async () => {
    try {
      const ret = await getUnreadService()
      this.setState({
        unReads: [...ret.data]
      })
    } catch (error) {
      console.log('获取未读消息失败...')
    }
  }

  componentDidMount () {
    const activeMenu = this.props.location.pathname.slice(1)
    if (activeMenu.includes('links')) this.onOpenChange(['links'])
    this.getUnreads()
  }

  render() {
    const { unReads } = this.state
    const { avatar, nickname } = this.props.userInfo
    const activeMenu = this.getPathName(this.props.location.pathname)
    const avatarMenu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.logout}>退出登录</span>
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout>
        <Sider
          collapsed={this.state.collapsed}
          collapsible
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          trigger={null}
        >
          <div className={styles.logo}>
            <img alt=""
              src={logo}
            />
            <h1 style={{ display: this.state.collapsed ? 'none' : 'block' }}>Ant Design</h1>
          </div>
          <Menu
            defaultSelectedKeys={[activeMenu]}
            mode="inline"
            onOpenChange={this.onOpenChange}
            openKeys={this.state.openKeys}
            theme="dark"
          >
            <Menu.Item key="list">
              <Link to="/list">
                <Icon type="book" />
                <span>博文管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="create">
              <Link to="/create">
                <Icon type="edit" />
                <span>创建博文</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="comment">
              <Link to="/bless">
                <Icon type="message" />
                <span>留言回复</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="travel">
              <Link to="/travel">
                <Icon type="global" />
                <span>旅行地图</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="links"
              title={
                <span>
                  <Icon type="contacts" />
                  <span>友链</span>
                </span>
              }
            >
              <Menu.Item key="links/apply">
                <Link to="/links/apply">
                  <span>申请友链</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="links/exist">
                <Link to="/links/exist">
                  <span>已有友链</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="setting">
              <Link to="/setting">
                <Icon type="user" />
                <span>个人设置</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className={styles['avt-wrapper']}
            style={{ background: '#fff', padding: 0, zIndex: 100, boxShadow: '0 1px 1px rgba(220, 220, 200, .5)' }}
          >
            <Dropdown
              overlayStyle={{
                position: 'fixed'
              }}
              overlay={Unread(unReads, this.unRead)}
              trigger={['click']}>
              <div className={styles.message}>
                <Icon style={{ fontSize: 25 }}
                  type="message" />
                <span style={{ display: unReads.length === 0 ? 'none' : '' }}
                  className={styles['un-read']}>{unReads.length}</span>
              </div>
            </Dropdown>
            <Dropdown overlay={avatarMenu}>
              <div className={styles.avt}>
                <img alt=""
                  src={avatar}
                />
                <span>{nickname}</span>
              </div>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              marginTop: 80,
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
          <Footer className={styles.footer}>
            Copyright &copy; {`${new Date().getFullYear()} gkshi-小溪`}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default WithRouter(BasicLayout)
