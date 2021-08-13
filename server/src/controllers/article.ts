
import { Context } from 'koa'
import responseHandle from '../utils/responseHandle'
import { Article } from '../models'
import { getNowTime } from '../utils/util'
import { IArticle } from '../models/Article'
import { Errno } from '../utils/errnoEnum'
import type { ListResult } from '../../types/global'

// 获取文章列表
export async function list (ctx: Context): Promise<void> {
  const ttt: ListResult = {
    data: []
  }

  console.log('ttt -- ', ttt)
  
  const result = {} as ListResult

  const { tag = '', page, first = '', count } = ctx.query
  const limitCount = Number(count) || 10
  try {
    const condition = tag.length !== 0 ? { 'tags': { '$elemMatch': { '$eq': tag } } } : {}
    const ret = await Article.find(condition, '_id tags cover outline title created_time').sort('-_id').skip(Number(page || 0) * limitCount).limit(limitCount).exec()
    result.data = ret
    if (first.toLowerCase() === 'true') {
      const counts = await Article.find(condition, '_id').countDocuments().exec()
      result.total = counts
    }
    responseHandle({ ctx, data: result })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取文章列表失败，等等再试吧~', error })
  }
}

// 获取文章内容
export async function blog (ctx: Context): Promise<void> {
  const { id } = ctx.params
  const { flag } = ctx.query
  const config: Record<string, unknown> = {}
  if (flag) {
    config.markdown = 0
  }
  try {
    const ret = await Article.findOne({ '_id': id }, config).exec()
    responseHandle({ ctx, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取文章内容失败，等等再试吧~', error })
  }
}

// 添加文章
export async function create (ctx: Context): Promise<void> {
  const body = ctx.request.body as IArticle
  if (!body.created_time) {
    body.created_time = getNowTime()
  }
  if (!body.title || !body.content || !body.markdown) {
    responseHandle({ ctx, status: 400, errmsg: '参数错误，请查看文章标题、内容是否有缺少' })
    return
  }
  try {
    const ret = await new Article(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '添加文章失败，等等再试吧~', error })
  }
}

// 更新文章
export async function update (ctx: Context): Promise<void> {
  const { id } = ctx.params
  const body = ctx.request.body
  try {
    const ret = await Article.findByIdAndUpdate(id, body, { new: true }).exec()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '更新文章失败，等等再试吧~', error })
  }
}

// 删除文章
export async function del (ctx: Context): Promise<void> {
  const { id } = ctx.params
  try {
    await Article.findByIdAndDelete(id).exec()
    responseHandle({ ctx, status: 204 })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '删除文章失败~', error })
  }
}