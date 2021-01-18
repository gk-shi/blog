import { Context } from 'koa'
import { City } from '../models'
import responseHandle from '../utils/responseHandle'
import { ICity } from '../models/City'


// 获取已有城市信息
export async function list (ctx: Context): Promise<any> {
  const { page, first = '' } = ctx.query
  const limitCount = 10
  const result: any = {}

  try {
    const ret = await City.find().sort('-_id').skip(Number(page || 0) * limitCount).limit(limitCount).exec()
    result.data = ret
    if (first.toLowerCase() === 'true') {
      const counts = await City.find().countDocuments().exec()
      result.total = counts
    }
    responseHandle({ ctx, data: result })
  } catch (error) {
    responseHandle({ ctx, errno: -1, errmsg: '获取城市信息失败~', error })
  }
}

// 添加新的城市信息
export async function create (ctx: Context): Promise<any> {
  const body: ICity = ctx.request.body
  if (!body.name || !body.longitude || !body.latitude) {
    responseHandle({ ctx, status: 400, errmsg: '添加城市信息失败，请查看城市名字、经度、纬度是否有缺少' })
    return
  }
  try {
    const ret = await new City(body).save()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: -1, errmsg: '添加城市信息失败，等等再试吧~', error })
  }
}

// 更新已有城市信息
export async function update (ctx: Context): Promise<any> {
  const { id } = ctx.params
  const body = ctx.request.body
  try {
    const ret = await City.findByIdAndUpdate(id, body, { new: true }).exec()
    responseHandle({ ctx, status: 201, data: ret })
  } catch (error) {
    responseHandle({ ctx, errno: -1, errmsg: '更新已有城市失败，等等再试吧~', error })
  }
}

// 删除已有城市信息
export async function del (ctx: Context): Promise<any> {
  const { id } = ctx.params
  try {
    await City.findByIdAndDelete(id).exec()
    responseHandle({ ctx, status: 204 })
  } catch (error) {
    responseHandle({ ctx, errno: -1, errmsg: '删除已有城市信息失败，等等再试吧~', error })
  }
}