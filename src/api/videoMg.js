import request from '@/utils/request'
import qs from 'qs'

// 前端评论列表
export function videoCommentList(data) {
  return request({
    url: '/admin/userVideo/userVideoCommentList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 根据条件查询视频列表
export function qryAllVideo(data) {
  return request({
    url: '/admin/userVideo/qryAllVideo',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 视频审核（审核，删除）
export function toExamineVideo(data) {
  return request({
    url: '/admin/userVideo/toExamineVideo',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 评论管理（审核/删除）
export function toExamineComment(data) {
  return request({
    url: '/admin/userVideo/toExamineComment',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 投诉列表
export function userComplaintList(data) {
  return request({
    url: '/admin/userVideo/userComplaintList',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 打赏列表
export function getRewardList(data) {
  return request({
    url: '/admin/userVideo/getRewardList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取视频地址
export function getVideoUrl(data) {
  return request({
    url: '/admin/userVideo/getVideoUrl',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 投诉审核
export function toExamineComplain(data) {
  return request({
    url: '/admin/userVideo/toExamineComplain',
    method: 'post',
    data: qs.stringify(data)
  })
}
