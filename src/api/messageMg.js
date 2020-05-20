import request from '@/utils/request'
import qs from 'qs'

// 新增（修改）消息设置
export function addOrUpdate(data) {
  return request({
    url: '/admin/systemNews/addOrUpdate',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 分页查询消息列表
export function facade(data) {
  return request({
    url: '/admin/systemNews/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 分页查询消息列表
export function batchDelete(data) {
  return request({
    url: '/admin/systemNews/batchDelete',
    method: 'post',
    data: qs.stringify(data)
  })
}
