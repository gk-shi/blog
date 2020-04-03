require('../utils/db.js')
const Leavemes = require('../models/Leavemes.js')
const Message = require('../models/Message')
const setStatus = require('../utils/setStatus.js')
const getTime = require('../utils/getNowTime.js')

// 获取留言
exports.list = async (req, res, next) => {
  const { page = 0, first = false } = req.query
  // 限制每页的条数
  const limitCount = 10
  // 返回内容数组
  // 注：因为第一次获取时需要确定总数
  const result = []
  try {
    const ret = await Leavemes.find({}).sort('-_id').skip(page * limitCount).limit(limitCount).exec()
    result.push(ret)
    if (Boolean(first) && first !== 'false') {
      const counts = await Leavemes.find({}).countDocuments().exec()
      req.session.user && req.session.user.nickname ? result.push(counts) : result.push(Math.ceil(counts / limitCount))
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(`leavemes.js list error : ${err}`)
    next(setStatus(404, '服务端发生错误'))
  }
}

// 新增留言
exports.create = async (req, res, next) => {
  const body = req.body
  body.created_time = getTime.getNowTime(true)
  if (!body.is_admin) {
    try {
      await new Message({
        nickname: body.username,
        created_time: getTime.getNowTime(true)
      }).save()
    } catch (error) {
      console.log('添加留言信息到通知失败...')
    }
  }
  try {
    const leames = new Leavemes(body)
    const ret = await leames.save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`leavemes.js create error : ${err}`)
    next(setStatus(400, '留言失败！'))
  }
}

// 更新留言
// exports.update = async (req, res, next) => {
//   const {id} = req.params
//   const body = req.body
//   try {
//     const ret = await Leavemes.findByIdAndUpdate(id, body, {new: true}).exec()
//     res.status(201).json(ret)
//   } catch (err) {
//     console.log(`leavemes.js update error : ${err}`)
//     next(setStatus(400))
//   }
// }

// 删除留言
exports.delete = async (req, res, next) => {
  const {id} = req.params
  try {
    await Leavemes.findByIdAndDelete(id).exec()
    res.status(204).json({})
  } catch (err) {
    console.log(`leavemes.js delete error : ${err}`)
    next(setStatus(400))
  }
}
