const jwt = require('jsonwebtoken')
var conf  = require('./conf')
var db    = require('./db')
var secret = conf.secret


module.exports =  (req, res, next) => {
  const header = req.headers.authorization
  let token

  if (header) token = header.split(' ')[1]
  if (token) {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        res.status(500).json({ code: -1, msg: '请登录' })
      } else {
        db.vertifyUser(decoded,(err,r)=>{
          if (err) {
            res.status(500).json({ code: -1, msg: '非法用户', data: null})
          }else{
            if (r) {
              next()
            }else{
              res.status(500).json({ code: -1, msg: '用户名密码错误' })
            }
          }
        })
      }
    })
  } else {
    res.status(500).json({ code: -1, msg: '请登录' })
  }
}

