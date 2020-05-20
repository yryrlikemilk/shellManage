import request from '@/utils/request'
import qs from 'qs'
// 会员等级列表
export function membershipList(data) {
  return request({
    url: '/admin/shellMemberGradeConfig/facade',
    method: 'post',
    params: data
  })
}
// 会员等级修改
export function membershipupdate(data) {
  return request({
    url: '/admin/shellMemberGradeConfig/update',
    method: 'post',
    params: data
  })
}
// 复投规则列表
export function ComplexRulesList(data) {
  return request({
    url: '/admin/shellReinvestmentConfig/facade',
    method: 'post',
    params: data
  })
}
// 复投规则修改
export function ComplexRulesUpdate(data) {
  return request({
    url: '/admin/shellReinvestmentConfig/update',
    method: 'post',
    data: data
  })
}
// 等贝壳列表
export function levelShellList(data) {
  return request({
    url: '/admin/shellGradeConfig/facade',
    method: 'post',
    params: data
  })
}
// 等贝壳修改
export function levelShellUpdate(data) {
  return request({
    url: '/admin/shellGradeConfig/update',
    method: 'post',
    data: data
  })
}
// 活跃度列表
export function livenessList(data) {
  return request({
    url: '/admin/shellActivityConfig/facade',
    method: 'post',
    params: data
  })
}
// 活跃度修改
export function livenessUpdate(data) {
  return request({
    url: '/admin/shellActivityConfig/update',
    method: 'post',
    params: data
  })
}
// 交易规则列表
export function transactionRulesList(data) {
  return request({
    url: '/admin/shellTransactionConfig/facade',
    method: 'post',
    params: data
  })
}
// 交易规则修改
export function transactionRulesUpdate(data) {
  return request({
    url: '/admin/shellTransactionConfig/update',
    method: 'post',
    data: data
  })
}
// 珍珠任务列表
export function shellTaskList(data) {
  return request({
    url: '/admin/shellTaskConfig/facade',
    method: 'post',
    params: data
  })
}
// 珍珠任务修改
export function shellTaskUpdate(data) {
  return request({
    url: '/admin/shellTaskConfig/update',
    method: 'post',
    data: data
  })
}
// 更多列表
export function shellMoreList(data) {
  return request({
    url: '/admin/shellMoreConfig/facade',
    method: 'post',
    params: data
  })
}
// 更多修改
export function shellMoreUpdate(data) {
  return request({
    url: '/admin/shellMoreConfig/update',
    method: 'post',
    data: data
  })
}
// 文案内容
export function descriptionTextList(data) {
  return request({
    url: '/admin/shellCopywritingConfig/facade',
    method: 'post',
    params: data
  })
}
// 文案修改
export function descriptionTextUpdate(data) {
  return request({
    url: '/admin/shellCopywritingConfig/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
