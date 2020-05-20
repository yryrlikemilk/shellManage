import request from '@/utils/request'
// 会员等级列表
export function getCopywriting(data) {
  return request({
    url: '/api/getCopywriting',
    method: 'post',
    params: data
  })
}
