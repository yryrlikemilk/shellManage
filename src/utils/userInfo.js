import router from '../router'
function jump(params) {
  router.push({
    path: '/userManage/userInfo',
    query: {
      id: params
    }
  })
}
export default jump
