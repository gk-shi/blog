/**
 * 全局路由守卫
 */
import React, { useState, useEffect } from 'react'
import Redirect from 'umi/redirect'
import { connect } from 'dva'
import Loading from '../src/components/Loading'
import { getStorage } from '../src/utils/utils'

const RouteGuard = props => {
  const [check, setCheck] = useState(0)

  const { userInfo, init } = props
  useEffect(() => {
    const checkLogin = async (init, setCheck) => {
      try {
        const userInfo = getStorage('userInfo')
        const tokenExp = getStorage('tokenExp')
        if (!userInfo || !tokenExp || Date.now() > (tokenExp * 1000 || 0)) throw new Error('need to login')
        init(userInfo)
        setCheck(1)
      } catch (error) {
        console.log(error)
        setCheck(-1)
      }
    }
    if (userInfo.nickname) {
      setCheck(1)
      return
    } else {
      checkLogin(init, setCheck)
    }

  }, [userInfo, init])

  return (
    <>
      {check === 0 ? <Loading />  : check > 0 ? props.children : <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location.pathname } // 传递重定向地址
        }}
      />}
    </>
  )
}

export default connect(state => ({ userInfo: state.user }), {
  init: (userInfo) => ({ type: 'user/init', payload: userInfo })
})(RouteGuard)