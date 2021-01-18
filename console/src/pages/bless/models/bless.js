import { getBlessService, addBlessService, deleteBlessService } from '../../../services/request'

export default {
  namespace: 'bless',
  state: {
    blesses: {},
    count: 0
  },
  effects: {
    *getBless (action, { call, put }) {
      const { page, first } = action.payload
      const { data } = yield call(getBlessService, page, first)
      if (data.errno === 0) {
        if (first) {
          yield put({ type: 'init', payload: data.data })
        } else {
          yield put({ type: 'add', payload: { index: page + 1, data: data.data } })
        }
      }
    },
    *addBless (action, { call }) {
      try {
        const { data } = yield call(addBlessService, action.payload)
        return {
          errno: data.errno
        }
      } catch (error) {
        return {
          errno: 1
        }
      }
    },
    *deleteBless (action, { call }) {
      try {
        const { data } = yield call(deleteBlessService, action.payload)
        return {
          errno: data.errno
        }
      } catch (error) {
        return {
          errno: 1
        }
      }
    }
  },
  reducers: {
    init (state, action) {
      return {
        blesses: {
          '1': action.payload.data
        },
        count: action.payload.total
      }
    },
    add (state, action) {
      const { index, data } = action.payload
      const n = { ...state.blesses }
      n[index] = data.data
      return {
        blesses: { ...n },
        count: state.count
      }
    }
  }
}