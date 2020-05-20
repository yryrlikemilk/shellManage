import request from '@/utils/request'
import qs from 'qs'

// 专区管理列表
export function facade(data) {
  return request({
    url: '/admin/zone/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 专区管理的详情信息
export function option_detail(data) {
  return request({
    url: '/admin/zone/option_detail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 专区的新增及修改（合二为一）
export function addOrUpdate(data) {
  return request({
    url: '/admin/zone/addOrUpdate',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}
// 删除专区管理的行记录
export function batchDelete(data) {
  return request({
    url: '/admin/zone/batchDelete    ',
    method: 'post',
    data: qs.stringify(data)
  })
}
