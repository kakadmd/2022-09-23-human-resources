import { loginAPI } from '@/api/login'
import { getInfo, getMoreUserInfoById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    tokenTime: 0 // token存在的时间
  },
  // 修改state里面数据的方式通过mutations修改的，
  // 但是在外部修改token里面的值也不会报错 但是我们需要规避这种问题，
  // 所以需要开启严格模式
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除用户信息
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    // 清除token
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_TOKENTIME(state, tokenTime) {
      state.tokenTime = tokenTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // const { commit } = context
      // 接口调用

      // 如果没有用响应拦截器需要自己把数据解构出来
      // 就要这么写
      // const res = await loginAPI(loginData)
      // const { data: { data }} = res

      // 但是因为响应拦截器已经把数据return 出来了
      // 所以直接接收数据
      const data = await loginAPI(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_TOKENTIME', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      // 请求用户信息
      const res = await getInfo()
      // console.log(res)
      const res1 = await getMoreUserInfoById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result)) // 后面会用的
    },
    logout({ commit }) {
      // 在这里清除数据
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
