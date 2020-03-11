const sendMail = require('../utils/email.js')
const getCode = require('../utils/randCode.js')
const setStatus = require('../utils/setStatus.js')
const Admin = require('../models/Admin.js')

/**
 * 发送邮件
 *
 */
exports.send = async (req, res, next) => {
  const body = req.body
  try {
    const ret = await Admin.findOne({'username': body.email}, '_id').exec()
  if(!ret) {
    throw new Error('没有该账号！')
  }
    // 获取 6 位随机验证码
    const code = getCode()
    const message = `
      <b>尊敬的用户您好！</b>
      验证码为：<b style="color:#ff0000">${code}</b>,
      请妥善保管好您的验证码，15分钟内有效。如不是本人操作，请忽略本次验证码，并尽快前往系统修改密码。
      谢谢您的使用！
    `
    await sendMail(body.email, message)
    req.session.checkCode = code
    setTimeout(() => {
      // 15 分钟验证码失效
      if (req.session.checkCode) delete req.session['checkCode']
    }, 1000 * 60 * 15)
    res.status(201).json({result: true})
  } catch (err) {
    console.log(err)
    next(setStatus(400))
  }
}
