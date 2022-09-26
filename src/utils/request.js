// 实现对axios的二次封装
import axios from 'axios'

// 引入message组件
import { Message } from 'element-ui'

import store from '@/store'
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

// 在这里统一的去拼接token
service.interceptors.request.use(config => {
  // config 就是请求所需的数据
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在 注入token
    // config.headers['Authorization'] = `Bearer ${store.getters.token}`
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器（接收两个参数，成功或者失败）
service.interceptors.response.use(response => {
  // console.log(response)

  // 1.要考虑都有什么需求 都需要那些数据
  // 2.接口成功的话，就代表业务逻辑过关，把需要的数据抛出去
  // 3.业务逻辑没有走通的话，用message提示错误，并用Promise.reject在控制台抛出错误信息
  const { success, message, data } = response.data

  // 如果业务逻辑过关 把数据抛出去
  if (success) {
    return data // 在这个地方把数据抛出去
  }

  // 如果业务逻辑不过关，提示错误，并通过Promise.reject把错误抛出去
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error.reject(error)
  return Promise.reject(error)
})

// 导出service
export default service
