import request from '@/utils/request'
import qs from 'qs'
// 优惠券更多设置详情
export function option_detail(data) {
  return request({
    url: '/admin/couponSettingMore/option_detail',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 优惠券更多设置
export function facade(data) {
  return request({
    url: '/admin/couponSettingMore/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 更多设置修改
export function update(data) {
  return request({
    url: '/admin/couponSettingMore/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
