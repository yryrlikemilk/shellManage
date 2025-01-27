import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/user/login',
    url: '/admin/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
