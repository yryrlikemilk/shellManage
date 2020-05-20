import request from '@/utils/request'
// 账号管理
export function facade(data) {
  return request({
    url: '/admin/sysLogin/facade',
    method: 'post',
    params: data
  })
}
