import request from '@/utils/request'
import requestease from '@/utils/request-ease'
import qs from 'qs'

// 城市合伙人（优惠券合伙人、贝壳合伙人同一个接口）
export function facade(data) {
  return request({
    url: '/admin/userPartner/facade',
    method: 'post',
    params: data
  })
}

// 判断该省、市、区是否存在合伙人
export function chooseCity(data) {
  return requestease({
    url: '/admin/userPartner/chooseCity',
    method: 'post',
    params: data
  })
}

// 根据用户id,手机号查询用户相关的信息
export function findUser(data) {
  return requestease({
    url: '/admin/user/find',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 撤销合伙人
export function update(data) {
  return request({
    url: '/admin/userPartner/update',
    method: 'post',
    params: data
  })
}

// 撤销合伙人
export function addPartner(data) {
  return request({
    url: '/admin/userPartner/add',
    method: 'post',
    params: data
  })
}
