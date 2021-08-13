
import axios from 'axios'
import { Context } from 'koa'
import { Errno } from '../utils/errnoEnum'
import responseHandle from '../utils/responseHandle'
import thirdConfig from '../utils/thirdConfig'

export async function baiduSeo (ctx: Context): Promise<any> {
  const urls = ctx.request.body
  const { data: ret } = await axios.post(`http://data.zz.baidu.com/urls?site=www.gkshi.com&token=${thirdConfig.baidu.seoToken}`, urls.join('\n'))
  if (ret && ret.success) {
    responseHandle({ ctx, data: ret })
  } else {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: ret })
  }
}