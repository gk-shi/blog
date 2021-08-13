import { Admin, Code } from '../models'
import md5 from 'blueimp-md5'
import responseHandle from '../utils/responseHandle'
import { Context } from 'koa'
import { IAdmin } from '../models/Admin'
import { Errno } from '../utils/errnoEnum'


// 获取管理员列表
export async function list (ctx: Context): Promise<void> {
  try {
    const ret = await Admin.find({}, '_id username').exec()
    responseHandle({ ctx, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取管理员列表失败！', error })
  }
}

// 初始化管理员信息
export function initAdmin (admins: IAdmin[]): void {
  admins.forEach((admin: IAdmin): void => {
    admin.passwd = md5(md5(admin.passwd))
    new Admin(admin).save()
  })
}

export async function update (ctx: Context): Promise<void> {
  const { username, checkCode, passwd } = ctx.request.body
  try {
    const newPasswd = md5(md5(passwd))
    const codeObj: any = await Code.findOne({ account: username }).exec()
    if (codeObj.code !== checkCode || codeObj.expired < Date.now()) throw new Error('验证码错误或已过期~') 
    await Admin.findOneAndUpdate({ username }, { passwd: newPasswd }).exec()
    responseHandle({ ctx, status: 201, data: '重置密码成功！' })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '重置密码发生错误！', error })
  } finally {
    Code.findOneAndDelete({ account: username }).exec()
  }
}