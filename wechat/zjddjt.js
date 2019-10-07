var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var axios = require('axios');
var crawler = require('./src/util/crawler')
var db = require("./db/db")


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
  axios.get(URL_TOKEN).then((r)=> {
    let token  = r.data.access_token
    let openid = req.query.openid
    axios.get(URL_USER(token,openid)).then((e)=> {
      res.send(e.data)
    })
  })
})



function callProc(sql, params, cb) {
  db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
    if (err) {
      res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null})
    }else{
      cb(ret)
    }
  })
}

// 取已经完成项目列表
app.post('/ProjList', async function(req, res) {
  let ret = await crawler.getEleInfo()
  res.status(200).json({ code: 200, data: ret.data })
})


// 取申请加梯列表
app.post('/ApplyList', async function(req, res) {
  let sql  = `CALL PROC_APPLY_LIST(?)`;
  let params = req.body

  callProc(sql,params,(r)=>{
    res.status(200).json({ code: 200, data: r })
  })
})

// 添加申请加梯请求
app.post('/ApplyAdd', async function(req, res) {
  let sql  = `CALL PROC_APPLY_ADD(?)`;
  let params = req.body

  callProc(sql,params,(r)=>{
    res.status(200).json({ code: 200, data: r })
  })
})

// 同意申请加梯请求
app.post('/ApplyAgree', async function(req, res) {
  let sql  = `CALL PROC_APPLY_AGREE(?)`;
  let params = req.body

  axios.get(URL_TOKEN).then((r)=> {
    let token  = r.data.access_token
    let openid = params.opid
    axios.get(URL_USER(token,openid)).then((e)=> {
      params.nickname   = e.data.nickname
      params.sex        = e.data.sex
      params.city       = e.data.city
      params.province   = e.data.province
      params.country    = e.data.country
      params.headimgurl = e.data.headimgurl
      callProc(sql,params,(r)=>{
        res.status(200).json({ code: 200, data: r })
      })
    })
  })

  // console.log(params)
  // callProc(sql,params,(r)=>{
  //   res.status(200).json({ code: 200, data: r })
  // })
})



/**
 * 获取所有品牌信息
 */
app.get('/BradList', async function (req, res){
  let sql = `SELECT * FROM apply`

  await db.select('brand', '', '', '', (err, ret) => {
    if (err) {
      res.status(500).json({ code: -1, msg: "提交请求失败，请联系管理员！", data: null });
    } else {
      res.status(200).json({ code: 200, data: ret });
    }
  })
})

/**
 * 添加品牌
 */
app.post('/BrandAdd', async function (req, res){
  let sql  = `CALL PROC_BRAND_ADD(?)`;
  let params = req.body

  await db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
    if (err) {
      res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null})
    }else{
      res.status(200).json({ code: 200,msg: '添加品牌成功', data: ret })
    }
  })
})

/**
 * 删除品牌
 */
app.post('/BrandDel', async function (req, res){
  let sql  = `CALL PROC_BRAND_DELETE(?)`;
  let params = req.body

  console.log(JSON.stringify(params))

  await db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
    if (err) {
      res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null})
    }else{
      res.status(200).json({ code: 200,msg: '删除品牌成功', data: ret })
    }
  })
})

/**
 * 添加 商务合作
 */
app.post('/CoopAdd', async function(req, res) {
  let sql  = `CALL PROC_COOP_ADD(?)`;
  let params = req.body

  await db.procedureSQL(sql, JSON.stringify(params), (err, ret) => {
    if (err) {
      res.status(500).json({ code: -1, msg: "提交请求失败，请联系管理员！", data: null });
    } else {
      res.status(200).json({ code: 200, data: ret });
    }
  })
})

app.listen(port, () => console.log(`> Running on localhost:${port}`));
