// 暂时不考虑用户
require('../utils/db.js')
const User = require('../models/User.js')
const setStatus = require('../utils/setStatus.js')

exports.list = async (req, res, next) => {
  try {
    const ret = await User.find({}).sort('-_id').exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`user.js list error : ${err}`)
    next(setStatus(404))
  }
}
exports.create = async (req, res, next) => {
  const body = req.body
  try {
    const ret = await new User(body).save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`user.js create error : ${err}`)
    next(setStatus(400))
  }
}
exports.update = async (req, res, next) => {
  const body = req.body
  try {
    const ret = await User.findOneAndUpdate({email: body.email}, body, {new: true}).exec()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`user.js update error : ${err}`)
    next(setStatus(400))
  }
}
exports.delete = async (req, res, next) => {
  const {id} = req.params
  try {
    await User.findByIdAndDelete(id).exec()
    res.status(204).json({})
  } catch (err) {
    console.log(`admin.js delete error : ${err}`)
    next(setStatus(400))
  }
}
