import { http } from '@/utils/http/axios'

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/admin/system/index/info',
    method: 'get'
  })
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request(
    {
      url: '/admin/system/index/login',
      method: 'POST',
      params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/admin/system/index/logout',
    method: 'POST',
    params
  })
}
