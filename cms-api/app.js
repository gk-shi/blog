const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const path = require('path')
const { initAdmin } = require('./controllers/admin.js')
const admins = require('./admin.js')
const fs = require('fs')

const app = express()

// 配置 body-parser 获取 post/put/patch 提交数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use('/uploads', express.static(path.join(__dirname, './uploads')))

// 配置 cors
// const whitelist = ['http://localhost:8080', 'http://localhost:8081']
// app.use(cors({
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
app.use(cors({
  credentials: true,
  origin: ['http://localhost:8080', 'http://localhost:8081']
  // origin: 'http://localhost:8080' // web前端服务器地址
  // 配置 orign: '*' 会出错
}))

// 配置 session 持久化
app.use(session({
  secret: 'my blog', // 加密字符串也可以写数组
  resave: false, // 强制保存session 建议设置成false
  saveUninitialized: true, // 强制保存未初始化的内容
  rolling: true, // 动态刷新页面cookie存放时间
  cookie: {maxAge: 60000 * 120}, // 保存时效60000 * 60
  store: new MongoStore({ // 将session存进数据库  用来解决负载均衡的问题
    url: 'mongodb://localhost/blog',
    touchAfter: 3600 * 24, // 通过这样做，设置touchAfter:24 * 3600，您在24小时内
    // 只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
    ttl: 3600 * 24
  })
}))

// 配置路由
app.use(router)

// 配置静态文件
app.use('/assets/', express.static(path.join(__dirname, './assets/')))

app.get('/', function (req, res, next) {
  res.send('hello express')
})

app.use(function (err, req, res, next) {
  writeTolog(err)
  if (err.status >= 500) {
    return res.status(500).json({
      error: 'server comes error!'
    })
  }
  res.status(err.status).json({
    error: err.message
  })
})

// 写入错误日志，函数后面再来处理
function writeTolog (err) {
  console.log(err)
}

// 初始化管理员账号
if (admins.length !== 0 && !process.argv.includes('dev')) {
  const ads = JSON.parse(JSON.stringify(admins))
  initAdmin(ads)
  fs.writeFile('./admin.js', 'module.exports = []', { flag:'w',encoding:'utf-8' }, (err) => {
    if (err) {
      console.log('销毁初始账号信息失败！')
    }
  })
}

app.listen('3000', function () {
  console.log('*****************server is running at port: 3000...***********************')
})
