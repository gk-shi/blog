// 存储用户登录后保留的信息
import { loginService } from '../services/request'
import { setLoginLocalStorage, clearLoginLocalStorage, setStorage, getStorage } from '../utils/utils'

const userInfo = {
  nickname: '',
  isTest: true,
  avatar: ''
}

export default {
  namespace: 'user', // 命令空间
  state: userInfo,
  effects: {  // 副作用，只能使用 genenator 函数
    *login (action, { call, put }) {
      const userInfo = action.payload
      try {
        const { data } = yield call(loginService, userInfo)
        if (data.errno === 0) {
          // 更换头像后能够强制刷新 cdn 缓存
          data.data.userInfo.avatar = `${data.data.userInfo.avatar}?v=${Date.now()}`
          setLoginLocalStorage(data.data)
          yield put({ type: 'init', payload: data.data.userInfo })
        }
        return {
          errno: data.errno
        }
      } catch (error) {
        return {
          error: -1
        }
      }
    }
  },
  reducers: { // 修改状态，返回值覆盖旧状态
    init (state, action) {
      if (!action.payload.avatar.includes('?v=')) {
        action.payload.avatar += `?v=${Date.now()}`
      }
      return { ...state, ...action.payload }
    },
    clear () {
      clearLoginLocalStorage()
      return { ...userInfo }
    },
    updateAvatar (state) {
      // 更新头像后修改时间戳
      const userInfo = getStorage('userInfo')
      userInfo.avatar = userInfo.avatar + '1'
      setStorage('userInfo', userInfo)
      return { ...state, ...{ avatar: state.avatar + '1' } }
    }
  }
}