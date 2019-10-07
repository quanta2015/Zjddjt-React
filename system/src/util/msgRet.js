import {message} from "antd";

export let msgRet = (r, duration=0.5) => {
  if (r && r.code === 200) {
    message.success(r.msg, duration)
  } else if (r && r.code !== 200) {
    // TODO: msg failure
    // message.error(r.msg, duration)
  } else {
    // message.error('网络连接错误', duration)
  }
}
