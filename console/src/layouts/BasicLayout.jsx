import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown, BackTop } from 'antd'
import router from 'umi/router'
import WithRouter from 'umi/withRouter'
import logo from '../assets/logo.svg'
import styles from './BasicLayout.less'
import Unread from '../components/layout/Unread'
import SideMenu from '../components/layout/SideMenu'
import { connect } from 'dva'
import { getUnreadService, updateUnreadService } from '../services/request'

const { Header, Sider, Content, Footer } = Layout

const menuConfig = [
  // {
  //   key: 'workspace',
  //   to: '/workspace',
  //   iconType: 'dashboard',
  //   text: '工作台'
  // },
  {
    key: 'list',
    to: '/list',
    iconType: 'book',
    text: '博文管理'
  },
  {
    key: 'create',
    to: '/create',
    iconType: 'edit',
    text: '创建博文'
  },
  {
    key: 'bless',
    to: '/bless',
    iconType: 'message',
    text: '留言回复'
  },
  {
    key: 'travel',
    to: '/travel',
    iconType: 'global',
    text: '旅行地图'
  },
  {
    key: 'links',
    iconType: 'contacts',
    text: '友链',
    subMenu: [
      {
        key: 'links/apply',
        to: '/links/apply',
        text: '申请友链'
      },
      {
        key: 'links/exist',
        to: '/links/exist',
        text: '已有友链'
      }
    ]
  },
  {
    key: 'website',
    to: '/website',
    iconType: 'build',
    text: '本站介绍'
  },
  {
    key: 'setting',
    to: '/setting',
    iconType: 'user',
    text: '个人设置'
  }
]

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
      const { data } = await getUnreadService()
      if (data.errno === 0) {
        this.setState({
          unReads: [...data.data]
        })
      }
    } catch (error) {
      console.log('获取未读消息失败...')
    }
  }

  componentDidMount () {
    const activeMenu = this.props.location.pathname.slice(1)
    if (activeMenu.includes('links')) this.onOpenChange(['links'])
    this.getUnreads()
  }

  render () {
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
          {SideMenu(activeMenu, this.onOpenChange, this.state.openKeys, menuConfig)}
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
                  type="bell" />
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
        <BackTop />
      </Layout>
    )
  }
}

export default WithRouter(BasicLayout)
