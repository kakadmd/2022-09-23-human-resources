import { loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  // 修改state里面数据的方式通过mutations修改的，
  // 但是在外部修改token里面的值也不会报错 但是我们需要规避这种问题，
  // 所以需要开启严格模式
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // const { commit } = context
      // 接口调用
      const res = await loginAPI(loginData)
      const { data: { data }} = res
      console.log(data)
      commit('SET_TOKEN', data)
    }
  }
}
