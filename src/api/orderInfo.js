import request from '@/utils/request'
import qs from 'qs'
// 后台提现列表
export function facade(data) {
  return request({
    url: '/admin/orders/facade',
    method: 'post',
    data: qs.stringify(data)
  })
}
