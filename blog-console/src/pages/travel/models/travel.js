import { getCitysService, updateCityService, deleteCityService, addCityService } from '../../../services/request'


export default {
  namespace: 'travel',
  state: {
    citys: {},
    count: 0
  },
  effects: {
    *getCity (action, { call, put }) {
      const { page, first } = action.payload
      try {
        const ret = yield call(getCitysService, action.payload)
        if (first) {
          yield put({ type: 'init', payload: ret.data })
        } else {
          yield put({ type: 'add', payload: { data: ret.data[0], index: page + 1 } })
        }
      } catch (error) {
        return {
          error: 1,
          message: error.response.data.error
        }
      }
    },
    *addCity (action, { call }) {
      try {
        yield call(addCityService, action.payload)
        // yield put({ type: 'add', payload: { data: ret.data, new: true } })
      } catch (error) {
        return {
          error: 1,
          message: error.response.data.error
        }
      }
    },
    *updateCity (action, { call }) {
      try {
        yield call(updateCityService, action.payload)
        // yield put({ type: 'update', payload: { propsIdx: action.payload.propsIdx, data: ret.data } })
      } catch (error) {
        return {
          error: 1,
          message: error.response.data.error
        }
      }
    },
    *deleteCity (action, { call }) {
      try {
        yield call(deleteCityService, action.payload._id)
        // if (ret.status === 204) {
        //   yield put({ type: 'delete', payload: action.payload.propsIdx })
        //   return { delete: true }
        // }
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
        citys: {
          '1': action.payload[0]
        },
        count: action.payload[1]
      }
    },
    add (state, action) {
      // if (action.payload.new) {
      //   return {
      //     citys: [action.payload.data, ...(state.citys)],
      //     count: state.count + 1
      //   }
      // }
      const { index, data } = action.payload
      const n = { ...state.citys }
      n[index] = data
      return {
        citys: { ...n },
        count: state.count
      }
    }
    // update (state, action) {
    //   const citys = [].concat(state.citys)
    //   citys[action.payload.propsIdx] = action.payload.data
    //   // citys[action.payload]
    //   return {
    //     ...state, ...{ citys: citys }
    //   }
    // }
    // delete (state, action) {
    //   const { citys } = state
    //   citys.splice(action.payload, 1)
    //   return {
    //     citys,
    //     count: state.count - 1
    //   }
    // }
  }
}
