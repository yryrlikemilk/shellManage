import request from '@/utils/request'
import qs from 'qs'
// 京东商品分类
export function facade(data) {
  return request({
    url: '/admin/categoryJD/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 类目管理---修改是否显示
export function update(data) {
  return request({
    url: '/admin/categoryJD/update',
    method: 'post',
    data: data
  })
}
