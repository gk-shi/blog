import { Context } from 'koa'
import { Link } from '../models'
import axios from 'axios'
import responseHandle from '../utils/responseHandle'
import { ILink } from '../models/Link'
import { Errno } from '../utils/errnoEnum'


// 获取友链
export async function list (ctx: Context): Promise<void> {
  try {
    const ret = await Link.find().sort('+_id').exec()
    responseHandle({ ctx, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '友链获取失败，等等再试试吧~', error })
  }
}

// 新增友链
export async function create (ctx: Context): Promise<void> {
  const body = ctx.request.body as ILink
  if (!body.hasOwnProperty('username')) {
    responseHandle({ ctx, status: 400, errmsg: '友链获取失败，等等再试试吧~' })
    return
  }
  if (body?.git_name?.trim().length || 0) {
    try {
      const user = await axios.get(`https://api.github.com/users/${body.git_name}`)
      body.avt = user.data.avatar_url
      body.git_name = user.data.html_url
    } catch (error) {
      console.log('获取 git 头像失败', error)
    }
  }
  try {
    const ret = await new Link(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '友链获取失败，等等再试试吧~', error })
  }
}

// 更新友链
export async function update (ctx: Context): Promise<void> {
  const { id } = ctx.params
  const body = ctx.request.body as ILink
  try {
    const ret = await Link.findByIdAndUpdate(id, body, { new: true }).exec()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '友链修改失败，等等再试吧~', error })
  }
}

// 删除友链
export async function del (ctx: Context): Promise<void> {
  const { id } = ctx.params
  try {
    await Link.findByIdAndDelete(id).exec()
    responseHandle({ ctx, status: 204, data: {} })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '友链修改失败，等等再试吧~', error })
  }
}
