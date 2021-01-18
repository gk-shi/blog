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
      const { data } = yield call(getCitysService, action.payload)
      if (data.errno === 0) {
        if (first) {
          yield put({ type: 'init', payload: data.data })
        } else {
          yield put({ type: 'add', payload: { data: data.data, index: page + 1 } })
        }
      }
    },
    *addCity (action, { call }) {
      try {
        const { data } = yield call(addCityService, action.payload)
        return {
          errno: data.errno
        }
      } catch (error) {
        return {
          errno: 1
        }
      }
    },
    *updateCity (action, { call }) {
      try {
        const { data } = yield call(updateCityService, action.payload)
        return {
          errno: data.errno
        }
      } catch (error) {
        return {
          errno: 1
        }
      }
    },
    *deleteCity (action, { call }) {
      try {
        const { data } = yield call(deleteCityService, action.payload._id)
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
        citys: {
          '1': action.payload.data
        },
        count: action.payload.total
      }
    },
    add (state, action) {
      const { index, data } = action.payload
      const n = { ...state.citys }
      n[index] = data.data
      return {
        citys: { ...n },
        count: state.count
      }
    }
  }
}
