// 存储用户登录后保留的信息
import { loginService } from '../services/request'

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
        const res = yield call(loginService, userInfo)
        // 更换头像后能够强制刷新 cdn 缓存
        res.data.avatar = `${res.data.avatar}?v=${Date.now()}`
        yield put({ type: 'init', payload: res.data })
        return {
          login: true
        }
      } catch (error) {
        return error.response.data.error
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
      return { ...userInfo }
    },
    updateAvatar (state) {
      // 更新头像后修改时间戳
      return { ...state, ...{ avatar: state.avatar + '1' } }
    }
  }
}