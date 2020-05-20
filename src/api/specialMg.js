import request from '@/utils/request'
import qs from 'qs'

// 分类管理列表
export function facade(data) {
  return request({
    url: '/admin/thematicType/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 分类管理列表
export function addOrUpdate(data) {
  return request({
    url: '/admin/thematicType/addOrUpdate',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 分类管理详情
export function option_detail(data) {
  return request({
    url: '/admin/thematicType/option_detail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 分类管理的删除
export function batchDelete(data) {
  return request({
    url: '/admin/thematicType/batchDelete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 频道列表（专题和专区中用到）
export function channelJD(data) {
  return request({
    url: '/admin/channelJD/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 专题内容的列表
export function thematicFacade(data) {
  return request({
    url: '/admin/thematic/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 专题内容的删除
export function thematicBatchDelete(data) {
  return request({
    url: '/admin/thematic/batchDelete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 专题内容的编辑
export function thematicUpdate(data) {
  return request({
    url: '/admin/thematic/update',
    method: 'post',
    data: data
  })
}
// 专题内容的详情
export function thematicOption_detail(data) {
  return request({
    url: '/admin/thematic/option_detail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 专题内容的新增
export function thematicAdd(data) {
  return request({
    url: '/admin/thematic/add',
    method: 'post',
    data: data
  })
}
// 专题内容分类下拉菜单
export function getTypeName(data) {
  return request({
    url: '/admin/thematicType/getTypeName',
    method: 'post',
    data: qs.stringify(data)
  })
}
