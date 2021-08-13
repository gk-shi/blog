import { Context } from 'koa'
import { Website } from '../models'
import responseHandle from '../utils/responseHandle'
import { IWebsite } from '../models/Website'
import { Errno } from '../utils/errnoEnum'

// 获取本站信息
export async function list (ctx: Context): Promise<any> {
  try {
    const ret = await Website.find().exec()
    responseHandle({ ctx, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取本站信息失败~', error })
  }
}

// 新建本站信息
export async function create (ctx: Context): Promise<any> {
  const body: IWebsite = ctx.request.body
  try {
    const ret = await new Website(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '新建本站信息失败~', error })
  }
}

// 更新本站信息
export async function update (ctx: Context): Promise<void> {
  const body = ctx.request.body as IWebsite
  try {
    await Website.findOneAndUpdate({}, body, { new: true }).exec()
    responseHandle({ ctx, status: 201, data: '本站介绍修改完成！' })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '更新本站信息失败~', error })
  }
}