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
        const { data } = yield call(getBlogListService, page, first)
        if (data.errno === 0) {
          if (first) {
            return yield put({ type: 'init', payload: data.data })
          }
          yield put({ type: 'add', payload: { index: page + 1, data: data.data } })
        }
      } catch (error) {
        return {
          error: 1
        }
      }
    }
  },
  reducers: {
    init (state, action) {
      return {
        lists: {
          '1': action.payload.data
        },
        count: action.payload.total
      }
    },
    add (state, action) {
      const { index, data } = action.payload
      const n = { ...state.lists }
      n[index] = data.data
      return {
        lists: { ...n },
        count: state.count
      }
    }
  }
}