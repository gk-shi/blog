import qiniu from 'qiniu'
import { Context } from 'koa'
import config from '../utils/thirdConfig'
import responseHandle from '../utils/responseHandle'
import { Errno } from '../utils/errnoEnum'

// 七牛云密钥
const accessKey = config.qiniu.accessKey
const secretKey = config.qiniu.secretKey
// 鉴权对象 mac
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

export function getUploadToken (ctx: Context): void {
  try {
    const { key } = ctx?.query
    const scope = key ? `${config.qiniu.scope}:${key}` : config.qiniu.scope
    // 配置一些凭证选项
    const options = {
      // scope: bucket
      scope: scope,
      // 'saveKey': key,
      // 指定有效时间为两小时
      expires: 7200
    }
    // 生成上传策略
    const putPolicy = new qiniu.rs.PutPolicy(options)
    // 生成上传凭证
    const uploadToken = putPolicy.uploadToken(mac)
    responseHandle({ ctx, data: uploadToken })
  } catch (error) {
    responseHandle({ ctx, errno: Errno.Fail, errmsg: '获取上传凭证失败~', error })
  }
}
