import request from '@/utils/request'
// 城市列表
export function cityTree(data) {
  return request({
    url: '/admin/systemAddress/tree',
    method: 'post',
    params: data
  })
}
