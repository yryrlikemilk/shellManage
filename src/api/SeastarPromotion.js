import request from '@/utils/request'
// 海洋星达人晋升设置条件查询
export function facade(data) {
  return request({
    url: '/admin/shellTalentConfig/facade',
    method: 'post',
    params: data
  })
}

// 海洋星达人晋升设置条件修改
export function update(data) {
  return request({
    url: '/admin/shellTalentConfig/update',
    method: 'post',
    params: data
  })
}
