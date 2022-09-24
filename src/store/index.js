import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters' // 派生数据
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [
    createPersistedstate({
      // paths 可以缓存某个模块，或者某个模块指定字段
      paths: ['user.token']
    })
  ]
})

export default store
