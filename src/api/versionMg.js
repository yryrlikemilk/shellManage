import request from '@/utils/request'

// 版本添加
export function addVersion(data) {
  return request({
    url: '/admin/versionInformation/add',
    method: 'post',
    params: data
  })
}

// 版本修改
export function updateVersion(data) {
  return request({
    url: '/admin/versionInformation/update',
    method: 'post',
    params: data
  })
}
// 版本查询
export function versionList(data) {
  return request({
    url: '/admin/versionInformation/facade',
    method: 'post',
    params: data
  })
}
