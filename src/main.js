import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

require('@/assets/css/normalize.css')

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')

// Start with $> npm run serve