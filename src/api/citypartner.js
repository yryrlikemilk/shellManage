import request from '@/utils/request'
// 系统设置--城市合伙人（包含优惠券合伙人+贝壳合伙人）
export function facade(data) {
  return request({
    url: '/admin/partnerConfig/facade',
    method: 'post',
    params: data
  })
}

// 系统设置--城市合伙人的修改
export function update(data) {
  return request({
    url: '/admin/partnerConfig/update',
    method: 'post',
    params: data
  })
}
