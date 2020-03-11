require('../utils/db.js')
const Admin = require('../models/Admin.js')
const md5 = require('blueimp-md5')
const setStatus = require('../utils/setStatus')

// 查看会话信息
exports.list = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  const user = req.session.user
  res.status(200).json({
    // username: user.username,
    nickname: user.nickname,
    avatar: user.avatar,
    isTest: user.isTest
  })
}

// 创建会话信息
exports.create = async (req, res, next) => {
  const body = req.body
  body.passwd = md5(md5(body.passwd))
  try {
    const [user] = await Admin.where(body)
    if (!user) throw new Error('账号或密码错误！')
    req.session.user = user
    res.status(201).json({
      login: true,
      nickname: user.nickname,
      avatar: user.avatar,
      isTest: user.isTest,
      _id: user._id
    })
  } catch (error) {
    next(setStatus(400, error))
  }
}

// 删除会话信息
exports.delete = async (req, res, next) => {
  delete req.session.user
  res.status(204).json({})
}
