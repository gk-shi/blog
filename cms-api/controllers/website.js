const Website = require('../models/Website')
const md5 = require('blueimp-md5')
const setStatus = require('../utils/setStatus.js')
require('../utils/db.js')

// 获取管理员列表
exports.list = async (req, res, next) => {
  try {
    const ret = await Website.find().exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`website.js list error : ${err}`)
    next(setStatus(404))
  }
}

exports.create = async (req, res, next) => {
  const body = req.body
  try {
    const website = new Website(body)
    const ret = await website.save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`website.js create error : ${err}`)
    next(setStatus(400, err))
  }
}

// 更新本站介绍信息
exports.update = async (req, res, next) => {
  const body = req.body
  try {
    await Website.findOneAndUpdate({}, body, {
      new: true
    }).exec()
    res.status(201).json('本站介绍修改完成！')
  } catch (err) {
    console.log(`website.js update error : ${err}`)
    next(setStatus(400, err))
  }
}
