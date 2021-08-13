import { Context } from 'koa'
import { Tag } from '../models'
import responseHandle from '../utils/responseHandle'
import { ITag } from '../models/Tag'
import { Errno } from '../utils/errnoEnum'

// 获取标签列表
export async function list (ctx: Context): Promise<void> {
  try {
    const ret = await Tag.find({}).exec()
    responseHandle({ ctx, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取标签失败~', error })
  }
}

// 添加标签
export async function create (ctx: Context): Promise<void> {
  try {
    const body = ctx.request.body as ITag
    const ret = await new Tag(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '添加标签失败~', error })
  }
}

// 删除标签
export async function del (ctx: Context): Promise<void> {
  const { id } = ctx.params
  try {
    await Tag.findByIdAndDelete(id).exec()
    responseHandle({ ctx, status: 204 })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '删除标签失败~', error })
  }
}