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
      try {
        const ret = yield call(getBlessService, page, first)
        if (first) {
          yield put({ type: 'init', payload: ret.data })
        } else {
          yield put({ type: 'add', payload: { index: page + 1, data: ret.data[0] } })
        }

      } catch (error) {
        return error.response.data.error
      }
    },
    *addBless (action, { call }) {
      try {
        yield call(addBlessService, action.payload)
        // yield put({ type: 'add', payload: { new: true, data: ret.data } })
      } catch (error) {
        return {
          error: 1,
          message: error.response.data.error
        }
      }
    },
    *deleteBless (action, { call }) {
      try {
        yield call(deleteBlessService, action.payload)
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
        blesses: {
          '1': action.payload[0]
        },
        count: action.payload[1]
      }
    },
    add (state, action) {
      // if (action.payload.new) {
      //   return {
      //     blesses: [action.payload.data, ...state.blesses],
      //     count: state.count + 1
      //   }
      // }
      const { index, data } = action.payload
      const n = { ...state.blesses }
      n[index] = data
      return {
        blesses: { ...n },
        count: state.count
      }
    }
  }
}