import { Context } from 'koa'
import { Admin, Code } from '../models'
import responseHandle from '../utils/responseHandle'
import { rand6Code } from '../utils/util'
import sendEmail from '../utils/email'
import { Errno } from '../utils/errnoEnum'

export async function send (ctx: Context): Promise<void> {
  const body = ctx.request.body
  try {
    const ret = await Admin.findOne({ 'username': body.email }, '_id').exec()
    if (!ret) {
      responseHandle({ ctx, status: 400, errmsg: '不存在该账号！' })
      return
    }

    const code = rand6Code()
    const message = `
      <b>尊敬的用户您好！</b>
      验证码为：<b style="color:#ff0000">${code}</b>,
      请妥善保管好您的验证码，15分钟内有效。如不是本人操作，请忽略本次验证码，并尽快前往系统修改密码。
      谢谢您的使用！
      来自博客服务。
      `
    await sendEmail(body.email, message)

    const codeModel = {
      account: body.email,
      code,
      expired: Date.now() + (1000 * 60 * 15)
    }

    await Code.findOneAndDelete({ account: body.email }).exec()
    await new Code(codeModel).save()

    responseHandle({ ctx, status: 201, data: '邮件已发送' })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '发送邮件过程出现问题了~', error })
  }
}