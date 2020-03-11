// const setStatus = require('../utils/setStatus.js')
const qiniu = require('qiniu')
const config = require('../config.js')

// 七牛云密钥
const accessKey = config.qiniu.accessKey
const secretKey = config.qiniu.secretKey
// 鉴权对象 mac
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

exports.getUploadToken = (req, res, next) => {
  const { key } = req.query
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
  res.status(200).json(uploadToken)
}
