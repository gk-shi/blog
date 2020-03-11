import { getBlogListService } from '../../../services/request'

export default {
  namespace: 'list',
  state: {
    lists: {},
    count: 0
  },
  effects: {
    *getList (action, { call, put }) {
      const { page, first } = action.payload
      try {
        const ret = yield call(getBlogListService, page, first)
        if (first) {
          return yield put({ type: 'init', payload: ret.data })
        }
        yield put({ type: 'add', payload: { index: page + 1, data: ret.data[0] } })
      } catch (error) {
        return {
          error: 1,
          message: error.response.data.error
        }
      }
    }
  },
  reducers: {
    init (state, action) {
      return {
        lists: {
          '1': action.payload[0]
        },
        count: action.payload[1]
      }
    },
    add (state, action) {
      const { index, data } = action.payload
      const n = { ...state.lists }
      n[index] = data
      return {
        lists: { ...n },
        count: state.count
      }
    }
  }
}