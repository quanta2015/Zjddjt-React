var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var fs = require('fs');
var path = require('path');
var sha1 = require('node-sha1');
var axios = require('axios');

var users = require('./routes/users');
var news = require('./routes/news');
var messages = require('./routes/messages');
var projects = require('./routes/projects');
var carousels = require('./routes/carousels');
var designers = require('./routes/designers');
var img = require('./routes/img');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/'));

app.use('/img', express.static('img'));

app.use('/api/user', users);
app.use('/api/new', news);
app.use('/api/message', messages);
app.use('/api/project', projects);
app.use('/api/carousel', carousels);
app.use('/api/designer', designers);
app.use('/api/img', img);

dotenv.config();
mongoose.connect('mongodb://zjddd:Zjdddqwert12345@47.111.22.103:2311/zjddd', { useNewUrlParser: true }).then(() => console.log('> Database zjddd connected...'));

app.get('/api/honor/getAllHonor', (req, res) => {
  var honors = [];
  fs.readdirSync(path.resolve(__dirname, '../img/honor')).forEach(file => {
    honors.push({
      "title": file.replace(/(.*\/)*([^.]+).*/ig,"$2"),
      "img": 'img/honor/' + file,
    });
  });
  res.status(200).json({
    honors
  });
});

app.get('/api/qual/getAllQual', (req, res) => {
  var quals = [];
  fs.readdirSync(path.resolve(__dirname, '../img/qual')).forEach(file => {
    quals.push({
      "title": file.replace(/(.*\/)*([^.]+).*/ig,"$2"),
      "img": 'img/qual/' + file,
    });
  });
  res.status(200).json({
    quals
  });
});


app.get('/api/getToken',function(req,res,next) {
  var getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe9896d3baf022cd3&secret=d2d9696ba2c11eede4f55a5460acfb71'
  axios.get(getTokenUrl).then( (r)=> {
    var token = r.data.access_token
    var data = {
      "type":"news",
      "offset":0,
      "count":999
    }
    var getNewsUrl = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${token}`
    axios.post(getNewsUrl,data).then( (r)=> {
      console.log(r.data)
      var list = r.data.item;
      var ret = []

      for(var i=0;i<list.length;i++) {
        var o = {
          "_id":list[i].media_id,
          "date":list[i].content.create_time,
          "title":list[i].content.news_item[0].title,
          "digest":list[i].content.news_item[0].digest,
          "url":list[i].content.news_item[0].url,
          "content": list[i].content.news_item[0].content
        }
        ret.push(o)
      }
      
      var obj = { msg: "获取微信成功！",'news': ret }
      res.send(JSON.stringify(obj));
    })
  })
})


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



app.get('/wechat', function(req, res, next) {
    var token = "zjddd"
    var signature = req.query.signature
    var nonce = req.query.nonce
    var timestamp = req.query.timestamp
    var echostr = req.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)
    console.log(sha)
    console.log(signature)
    if (sha === signature) {
        res.send(echostr + '');
    } else {
        res.send("wrong");
    }
});



app.post('/eleExample', function(req, res) {
  
  console.log('a')

  res.status(200).json({ code: 200, data: 'ret' })
})

app.listen(80, () => console.log("> Running on localhost:80"));