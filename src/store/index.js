import Vue from 'vue'
import Vuex from 'vuex'
import wallpaper from './modules/wallpaper'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    wallpaper
  },
  strict: debug,
})