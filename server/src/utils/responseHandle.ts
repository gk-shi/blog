import { Context } from 'koa'
import { Errno } from './errnoEnum'

export interface IRes {
  ctx: Context
  status?: number
  errno?: number
  errmsg?: string
  data?: any
  error?: any
}

type ResponseHandle = (args: IRes) => void


const responseHandle: ResponseHandle = (args: IRes): void => {
  const { ctx, status = 200, errno = Errno.Success, data, errmsg, error } = args

  ctx.status = status
  if (/^2.*/.test(String(status))) {
    ctx.body = {
      errno,
      errmsg,
      data,
      error
    }
  } else {
    ctx.body = {
      errmsg
    }
  }
  if (error) {
    // 等待记录
    console.log(errmsg, error)
  }
}

export default responseHandle