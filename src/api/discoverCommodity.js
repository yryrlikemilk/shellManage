import request from '@/utils/request'
import qs from 'qs'
// 发现商品
export function facade(data) {
  return request({
    url: '/admin/find/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除发现商品
export function batchDelete(data) {
  return request({
    url: '/admin/find/batchDelete',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 发现类别管理
export function findType(data) {
  return request({
    url: '/admin/findType/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 发现类别管理新增和修改
export function addOrUpdate(data) {
  return request({
    url: '/admin/findType/addOrUpdate',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 发现用户
export function findUser(data) {
  return request({
    url: '/admin/findUser/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 发现用户管理新增及修改
export function findUserAddOrUpdate(data) {
  return request({
    url: '/admin/findUser/addOrUpdate',
    method: 'post',
    data: qs.stringify(data)
  })
}
