const Message = require('../models/Message')
const setStatus = require('../utils/setStatus.js')
require('../utils/db.js')

// 获取标签列表
exports.list = async (req, res, next) => {
  try {
    const ret = await Message.find({ read: false }).exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`tag.js list error : ${err}`)
    next(setStatus(500, '服务器错误！'))
  }
}

// 更新标签列表
exports.update = async (req, res, next) => {
  const {id} = req.params
  try {
    let ret
    if (id !== 'all') {
      ret = await Message.findByIdAndUpdate(id, { read: true }, {new: true}).exec()
    } else {
      ret = await Message.updateMany({ read: false }, { read: true }).exec()
    }
    res.status(201).json(ret)
  } catch (err) {
    console.log(`tag.js update error : ${err}`)
    next(setStatus(500, '服务器错误！'))
  }
}

