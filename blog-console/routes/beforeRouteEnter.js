/**
 * 全局路由守卫
 */
import React, { useState, useEffect } from 'react'
import Redirect from 'umi/redirect'
import { connect } from 'dva'
import { getSessionService } from '../src/services/request'
import Loading from '../src/components/Loading'

const RouteGuard = props => {
  const [check, setCheck] = useState(0)

  const { userInfo, init } = props
  useEffect(() => {
    const checkLogin = async (init, setCheck) => {
      try {
        const session = await getSessionService()
        init(session.data)
        setCheck(1)
      } catch (error) {
        console.log(error)
        console.log('没有session或失效')
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