import axios from 'axios'
import { message } from 'antd'
import jwt from './token'


export default(url, options = {}, allRes = false) => {
  let token = jwt.getToken()

  token
    ? axios.defaults.headers.common.authorization = `Bearer ${token}`
    : delete axios.defaults.headers.common.authorization

  return axios({
    url,
    ...options
  })
  .then(r => {
    if (allRes) {
      return r.data
    }

    if (r.data.code === 200) {
      return r.data.data
    }
  })
  .catch(e => {
    if (e.response) {
      message.error(e.response.data.msg)
      return e.response.data
    }
    message.error('网络错误')
  })
}