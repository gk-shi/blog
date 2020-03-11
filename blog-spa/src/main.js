import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// Vue.use(VueLazyload)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if (window.console) {
  console.log('%c                       ', "padding: 120px; font-size:20px; background:url('" + process.env.VUE_APP_IMG_PREFIX + "fix-bug.jpeg') no-repeat")
  console.log('%c我就是饿死，死外边，从这里跳下去，也不会再改这个bug!!!', 'color: #41b883; font-size: 15px;')
}
