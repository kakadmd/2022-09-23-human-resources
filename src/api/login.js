// 引入封装好的axios
import request from '@/utils/request'

/**
 * 登录页面
 * @param {*} data
 * @returns Promise
 */
export const loginAPI = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
