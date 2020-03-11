// 一些项目需要的第三方配置信息
module.exports = {
  email: {
    user: 'xxxxxxx@qq.com',   // 邮箱账号： xxxxxxx@qq.com，用来忘记密码发送验证码时邮箱，需要该邮箱开通 pop3 服务 ，和初始化登录账号邮箱不一致！！！
    pass: ''  // pop3 验证码
  },
  qiniu: {  // 七牛云存储的相关 Key， 用来生成 token 配合前端图片上传使用，需要去七牛云官网申请
    accessKey: '',
    secretKey: '',
    scope: '' // 存储空间名
  }
}