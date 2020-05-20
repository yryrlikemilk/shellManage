import request from '@/utils/request'
// 常见问题列表
export function facade(data) {
  return request({
    url: '/admin/problem/facade',
    method: 'post',
    params: data
  })
}
// 常见问题删除
export function questionDel(data) {
  return request({
    url: '/admin/problem/del',
    method: 'post',
    params: data
  })
}
// 新增或修改问题
export function questionChg(data) {
  return request({
    url: '/admin/problem/opt',
    method: 'post',
    params: data
  })
}

