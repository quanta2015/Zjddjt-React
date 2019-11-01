import decode from 'jwt-decode'

const TOKEN_KEY = 'BIZPLUS_TOKEN'
const USER_KEY  = 'BIZPLUS_USER'
const EXP_KEY   = 'BIZPLUS_EXP'

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}

export const saveToken = (data) => {
  window.localStorage.setItem(TOKEN_KEY, data)
}

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

export const decodeToken = () => {
  return decode(window.localStorage.getItem(TOKEN_KEY))
}


export const getUser = () => {
  return window.localStorage.getItem(JSON.parse(USER_KEY))
}

export const saveUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}

export const getExp = () => {
  return window.localStorage.getItem(JSON.parse(EXP_KEY))
}

export const saveExp = (data) => {
  window.localStorage.setItem(EXP_KEY, JSON.stringify(data))
}

export const removeExp = () => {
  window.localStorage.removeItem(EXP_KEY)
}


export default { getToken, saveToken, removeToken, decodeToken, getUser, saveUser, removeUser,getExp,saveExp,removeExp }