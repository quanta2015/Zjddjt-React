var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var axios = require('axios');
var crawler = require('./src/util/crawler')

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + '/'));


const port = 8080
const AppID = 'wx5d00ec8c1456987c'
const Secret = '590b952b9fddb781c0797870633e9193'
const URL_TOKEN  = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppID}&secret=${Secret}`
const URL_OPENID = (code)=>{ return `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${AppID}&secret=${Secret}&code=${code}&grant_type=authorization_code` } 
const URL_USER = (token,openid)=>{
  return `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`
}

// 用户登录 
// appid + secret -> token
// code           -> openid
// opid + token   -> user
app.get('/userinfo', function(req, res, next) {
  let code = req.query.code
  axios.all([
    axios.get(URL_TOKEN),
    axios.get(URL_OPENID(code))
  ]).then((r)=> {
    let token  = r[0].data.access_token
    let openid = r[1].data.openid
    axios.get(URL_USER(token,openid)).then((e)=> {
      res.send(e.data)
    })
  })
})

app.post('/eleExample', async function(req, res) {
  
  console.log('a')
  let ret = await crawler.getEleInfo()
  res.status(200).json({ code: 200, data: ret.data })
})



app.listen(port, () => console.log(`> Running on localhost:${port}`));