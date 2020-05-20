import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const loginName = 'userName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getName() {
  return Cookies.get(loginName)
}

export function setName(name) {
  return Cookies.set(loginName, name)
}

export function removeName() {
  return Cookies.remove(loginName)
}
