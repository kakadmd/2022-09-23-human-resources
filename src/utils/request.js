// 实现对axios的二次封装
import axios from 'axios'

// 通过axios创建axios实例
const service = axios.create({
  baseURL: '/dec', // 基准地址
  timeout: 5000
})

// 导出service
export default service
