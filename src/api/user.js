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

/**
 *
 * @returns Promise
 */
export const getMoreUserInfoById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {
}
