import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'

import VueTippy from 'vue-tippy'
Vue.config.productionTip = false


import store from './store'
import Vuex from 'vuex'
Vue.use(Vuex)

import router from './router'

require('@/assets/css/normalize.css')

Vue.use(VueTippy)
export const EventBus = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Start with $> npm run serve