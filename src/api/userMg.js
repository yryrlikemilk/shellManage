import request from '@/utils/request'
import qs from 'qs'

export function userMgList(data) {
  return request({
    url: '/admin/user/facade',
    method: 'post',
    params: data
  })
}

export function userMgInfo(data) {
  return request({
    url: '/admin/user/detail',
    method: 'post',
    params: data
  })
}
// 用户管理详情--贝壳等级
export function teamShellLevel(data) {
  return request({
    url: '/admin/userTeamInfo/teamShellLevel',
    method: 'post',
    params: data
  })
}

// 用户管理详情--城市合伙人
export function cityPartner(data) {
  return request({
    url: '/admin/userPartner/cityPartner',
    method: 'post',
    params: data
  })
}

// 用户管理详情--珍珠明细（中的珍珠明细）
export function userPearlFlow(data) {
  return request({
    url: '/admin/userPearlFlow/facade',
    method: 'post',
    params: data
  })
}

// 用户管理详情--珍珠明细---冻结珍珠
export function userPearlFreeze(data) {
  return request({
    url: '/admin/userPearlFreeze/facade',
    method: 'post',
    params: data
  })
}

// 用户管理详情--冻结珍珠--详情
export function userPearlFreezeInfo(data) {
  return request({
    url: '/admin/userPearlFreeze/detail',
    method: 'post',
    params: data
  })
}

// 用户管理详情--活跃度明细
export function userActivityFlow(data) {
  return request({
    url: '/admin/userActivityFlow/facade',
    method: 'post',
    params: data
  })
}

// 用户详情中的视频列表
export function findVideoList(data) {
  return request({
    url: '/admin/userVideo/findVideoList',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 用户管理---优惠券
export function Coupon(data) {
  return request({
    url: '/admin/userTeamInfo/Coupon',
    method: 'post',
    data: qs.stringify(data)
  })
}
