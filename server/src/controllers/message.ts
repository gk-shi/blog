
import Message, { IMessage } from '../models/Message'
import responseHandle from '../utils/responseHandle'
import { Context } from 'koa'
import { Errno } from '../utils/errnoEnum'


// 新增通知信息
export async function addMessage (message: IMessage): Promise<void> {
  try {
    await new Message(message).save()
  } catch (error) {
    console.log('添加通知信息失败！' + error)
  }
}

// 获取通知信息
export async function list (ctx: Context): Promise<void> {
  try {
    const ret = await Message.find({ read: false }).exec()
    responseHandle({ ctx, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取通知信息失败~', error })
  }
}

// 更新通知消息
export async function update (ctx: Context): Promise<void> {
  const { id } = ctx.params
  try {
    let ret
    if (id !== 'all') {
      ret = await Message.findByIdAndUpdate(id, { read: true }, { new: true }).exec()
    } else {
      ret = await Message.updateMany({ read: false }, { read: true }).exec()
    }
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '更新通知消息失败~', error })
  }
}
