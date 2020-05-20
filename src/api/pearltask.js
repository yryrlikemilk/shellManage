import request from '@/utils/request'
// 城市列表
export function pearlTask(data) {
  return request({
    url: '/admin/userPearlFreeze/pearlTask',
    method: 'post',
    params: data
  })
}
