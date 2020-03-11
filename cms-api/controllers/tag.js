const Tag = require('../models/Tag')
const setStatus = require('../utils/setStatus.js')
require('../utils/db.js')

// 获取标签列表
exports.list = async (req, res, next) => {
  try {
    const ret = await Tag.find({}).exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`tag.js list error : ${err}`)
    next(setStatus(404, '没有找到相关 Tag'))
  }
}

// 添加标签
exports.create = async (req, res, next) => {
  const body = req.body
  try {
    const tag = new Tag(body)
    const ret = await tag.save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`tag.js create error : ${err}`)
    next(setStatus(400))
  }
}

// 删除标签信息
exports.delete = async (req, res, next) => {
  const {id} = req.params
  try {
    await Tag.findByIdAndDelete(id).exec()
    res.status(204).json({})
  } catch (err) {
    console.log(`tag.js delete error : ${err}`)
    next(setStatus(400))
  }
}
