import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} params params是查询参数，里面需要携带分页信息
 * @returns Promise
 */
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 新增角色
 * @param {*} data
 * @returns Promise
 */
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 编辑角色
 * @param {*} data
 * @returns  Promise
 */
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

