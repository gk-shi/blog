import { Admin } from '../models'
import md5 from 'blueimp-md5'
import responseHandle from '../utils/responseHandle'
import { Context } from 'koa'
import { sign } from '../utils/jwt'

export async function login (ctx: Context): Promise<any> {
  const body = ctx.request.body
  body.passwd = md5(md5(body.passwd))
  try {
    const [user] = await Admin.where(body)
    if (!user) throw new Error('账号或密码错误！')
    const userInfo = {
      nickname: user.nickname,
      avatar: user.avatar,
      isTest: user.isTest,
      _id: user._id
    }
    // const token = sign(userInfo)
    const token = sign({})
    responseHandle({ ctx, data: { userInfo, token } })
  } catch (error) {
    responseHandle({ ctx, errno: -1, errmsg: `登录过程发生错误~${error}`, error })
  }
}