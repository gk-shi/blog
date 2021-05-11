import { createApp } from 'vue'
import xss from 'xss'
import V3waterfall from 'v3-waterfall'
import 'v3-waterfall/dist/style.css'

import App from './App.vue'
import router from './router'
import './index.scss'

import { setStorage, getStorage } from '/@/utils'
import createTip from './utils/createTip'


const app = createApp(App)

app
  .provide('setStorage', setStorage)
  .provide('getStorage', getStorage)
  .provide('createTip', createTip)
  .provide('xss', xss)

app
  .use(router)
  .use(V3waterfall)
  .mount('#app')
