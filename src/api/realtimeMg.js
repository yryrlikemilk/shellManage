import request from '@/utils/request'
import qs from 'qs'

// 实时头条列表
export function facade(data) {
  return request({
    url: '/admin/headLines/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 新增或者编辑实时头条
export function addOrUpdate(data) {
  return request({
    url: '/admin/headLines/addOrUpdate',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除实时头条
export function batchDelete(data) {
  return request({
    url: '/admin/headLines/batchDelete',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 实时头条详细信息
export function option_detail(data) {
  return request({
    url: '/admin/headLines/option_detail',
    method: 'post',
    data: qs.stringify(data)
  })
}
