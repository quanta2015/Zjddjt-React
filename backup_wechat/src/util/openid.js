export var initCode = (data)=>{
  let params = new URLSearchParams(data)
  let code = params.get("code")
  if ((code===null)||(code==="")) {
    code = window.localStorage.getItem('ZJDDDJT_OPENID')
    // console.log(`get code: ${code} ${params}`)
  }else{
    // console.log(`clear: ${code}`)
    window.localStorage.setItem('ZJDDDJT_OPENID', code)
  }
  params = { code: code }
  return params
}
