import request from '@/utils/request'
import qs from 'qs'
// 广告新增
export function add(data) {
  return request({
    url: '/admin/ad/add',
    method: 'post',
    data: data
  })
}
// 广告修改
export function update(data) {
  return request({
    url: '/admin/ad/update',
    method: 'post',
    data: data
  })
}
// 广告删除
export function deletedata(data) {
  return request({
    url: '/admin/ad/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 分页查询广告信息
export function facade(data) {
  return request({
    url: '/admin/ad/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
