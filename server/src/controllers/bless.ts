
import { Context } from 'koa'
import { Bless } from '../models'
import responseHandle from '../utils/responseHandle'
import { IBless } from '../models/Bless'
import { getNowTime } from '../utils/util'
import { addMessage } from './message'
import { Errno } from '../utils/errnoEnum'
import type { ListResult } from '../../types/global'

// 获取留言
export async function list (ctx: Context): Promise<void> {
  const { page, first = '', count, isAdmin } = ctx.query
  const limitCount = Number(count) || 10
  const result = {} as ListResult
  // 通过 isAdmin 来排除掉一些隐私信息
  const config = {
    email: isAdmin ? 1 : 0
  }
  try {
    const ret = await Bless.find({}, config).sort('-_id').skip(Number(page || 0) * limitCount).limit(limitCount).exec()
    result.data = ret
    if (first.toLowerCase() === 'true') {
      const counts = await Bless.find({}).countDocuments().exec()
      result.total = counts
    }
    responseHandle({ ctx, data: result })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取留言失败，等等再试吧~', error })
  }
}

// 新增留言
export async function create (ctx: Context): Promise<void> {
  const body = ctx.request.body as IBless
  body.created_time = getNowTime(true)
  if (!body.username || !body.content) {
    responseHandle({ ctx, status: 400, errmsg: '新增留言失败，请查看一下留言内容及用户名~' })
    return
  }

  // 添加通知信息
  if (!body.is_admin) {
    addMessage({
      nickname: body.username,
      created_time: getNowTime(true)
    })
  }
  try {
    const ret = await new Bless(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '新增留言失败，等等再试吧~', error })
  }
}

// 删除留言
export async function del (ctx: Context): Promise<void> {
  const { id } = ctx.params
  try {
    await Bless.findByIdAndDelete(id).exec()
    responseHandle({ ctx, status: 204 })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '删除留言失败~', error })
  }
}