import request from '@/utils/request'
import qs from 'qs'
// 后台提现列表
export function facade(data) {
  return request({
    url: '/admin/withdraw/facade',
    method: 'post',
    params: data
  })
}
// 提现审核
export function audit(data) {
  return request({
    url: '/admin/withdraw/audit',
    method: 'post',
    params: data
  })
}
// 提现撤销
export function cancel(data) {
  return request({
    url: '/admin/withdraw/cancel',
    method: 'post',
    params: data
  })
}

// 查看打款信息、提交打款信息
export function detail(data) {
  return request({
    url: '/admin/withdraw/detail',
    method: 'post',
    params: data
  })
}

// 查看打款信息、提交打款信息
export function make(data) {
  return request({
    url: '/admin/withdraw/make',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 上传打款凭证
export function uploadImage(data) {
  return request({
    url: '/admin/withdraw/uploadImage',
    method: 'post',
    data: data
  })
}
