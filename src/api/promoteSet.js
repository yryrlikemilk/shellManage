import request from '@/utils/request'
import qs from 'qs'

// 晋升奖励设置列表
export function facade(data) {
  return request({
    url: '/admin/couponSetting/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 晋升奖励设置列表详情
export function option_detail(data) {
  return request({
    url: '/admin/couponSetting/option_detail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 晋升奖励设置修改
export function update(data) {
  return request({
    url: '/admin/couponSetting/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
