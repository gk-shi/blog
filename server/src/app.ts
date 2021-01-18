import Koa, { Context, Next } from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { connect } from './utils/mongoDB'
import kjwt from 'koa-jwt'
import noNeedToken from './utils/noNeedToken'
import { SECRET } from './utils/jwt'
import router from './routes'

// 首次运行添加管理员相关信息
// const { initAdmin } = require('./controllers/admin')
// const admins = require('./utils/admin.ts')
// const fs = require('fs')

// 初始化管理员账号
// if (admins.length !== 0 && process.env.NODE_ENV !== 'development') {
//   const ads = JSON.parse(JSON.stringify(admins))
//   initAdmin(ads)
//   fs.writeFile('./admin.js', 'module.exports = []', { flag:'w',encoding:'utf-8' }, (err) => {
//     if (err) {
//       console.log('销毁初始账号信息失败！')
//     }
//   })
// }


// 连接数据库
connect()


const app: Koa = new Koa()

app
  .use(cors())
  .use(bodyParser())
  .use(async (ctx: Context, next: Next) => {
    // 处理 jwt 验证失败的问题
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          message: 'Login expired',
          errno: -2,
          errmsg: '登录信息过期，请重新登录'
        }
      }
    })
  })
  // .use(kjwt({ secret: SECRET }).unless({ path: [/^\/login/] }))
  .use(kjwt({ secret: SECRET }).unless({ custom: noNeedToken }))
  .use(router.routes())
  .use(router.allowedMethods())


app.on('error', err => {
  console.log('服务端内部错误 err====>', err)
})

app.listen(3000) // 监听3000端口


console.log('NODE_ENV = ', process.env.NODE_ENV)

console.log('**************Server running on http://127.0.0.1:3000***************')
