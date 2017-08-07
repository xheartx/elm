// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from 'routes'
import store from './store/store'

/* eslint-disable no-new */
Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
})
