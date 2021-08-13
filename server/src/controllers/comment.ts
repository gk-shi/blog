import { Context } from 'koa'
import { Comment, Article } from '../models'
import responseHandle from '../utils/responseHandle'
import { getNowTime } from '../utils/util'
import { IComment } from '../models/Comment'
import { addMessage } from './message'
import { Errno } from '../utils/errnoEnum'
import type { ListResult } from '../../types/global'


// 获取评论
export async function list (ctx: Context): Promise<void> {
  const { artId, page, first = '', count } = ctx.query
  const limitCount = Number(count) || 10
  const result = {} as ListResult

  try {
    const ret = await Comment.find({ 'art_id': artId }).sort('-_id').skip(Number(page || 0) * limitCount).limit(limitCount).exec()
    result.data = ret
    if (first.toLowerCase() === 'true') {
      const counts = await Comment.find({ 'art_id': artId }).countDocuments().exec()
      result.total = counts
    }
    responseHandle({ ctx, data: result })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取评论失败，等等再试吧~', error })
  }
}

// 新增评论
export async function create (ctx: Context): Promise<void> {
  const body = ctx.request.body as IComment
  const createdTime = getNowTime()
  body.created_time = createdTime

  try {
    const ret = await new Comment(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '新增评论失败，等等再试吧~', error })
  }

  // 增加通知信息
  const { art_id, username, is_admin } = body
  if (!is_admin) {
    try {
      const art = await Article.findOne({ _id: art_id }, 'title').exec()
      addMessage({
        nickname: username,
        title: (art as any).title,
        id: art_id,
        created_time: createdTime
      })
    } catch (error) {
      console.log('添加通知消息时获取文章失败~', error)
    }
  }
}

// 删除评论
export async function del (ctx: Context): Promise<void> {
  const { id } = ctx.params
  try {
    await Comment.findByIdAndDelete(id).exec()
    responseHandle({ ctx, status: 204 })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '删除评论失败~', error })
  }
}
