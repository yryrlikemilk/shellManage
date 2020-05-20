import request from '@/utils/request'
// 商城管理列表
export function facade(data) {
  return request({
    url: '/admin/mall/facade',
    method: 'post',
    params: data
  })
}
// 商城管理编辑
export function addOrUpdate(data) {
  return request({
    url: '/admin/mall/addOrUpdate',
    method: 'post',
    data: data
  })
}
