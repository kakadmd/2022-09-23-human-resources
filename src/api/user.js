import request from '@/utils/request'

export function login(data) {
}

/**
 * 获取用户信息
 * @returns Promise
 */
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// resetful接口 传统接口
// 同一个模块 接口地址 基本都是一样/请求方式不一样
// 传统的接口
// /delete/sys/user/123
// /get/sys/user/12

/**
 * 获取员工详细信息
 * @returns Promise
 */
export const getMoreUserInfoById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * 保存用户信息
 * @param {Object} data
 * @returns Promise
 */
export const saveUserInfoById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

export function logout() {
}
