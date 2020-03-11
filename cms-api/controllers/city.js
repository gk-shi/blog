const City = require('../models/City')
const setStatus = require('../utils/setStatus.js')
require('../utils/db.js')

// 获取已有城市信息
exports.list = async (req, res, next) => {
  const { page = 0, first = false } = req.query
  const limitCount = 10
  // 返回内容数组
  // 注：因为第一次获取时需要确定总数
  const result = []
  try {
    const ret = await City.find()
      .sort('-_id')
      .skip(page * limitCount)
      .limit(limitCount)
      .exec()
    result.push(ret)
    if (Boolean(first) && first !== 'false') {
      const counts = await City.find()
        .countDocuments()
        .exec()
      req.session.user && req.session.user.nickname ? result.push(counts) : result.push(Math.ceil(counts / limitCount))
      
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(`City.js list error : ${err}`)
    next(setStatus(404, err))
  }
}

// 添加新的城市信息
exports.create = async (req, res, next) => {
  const body = req.body
  try {
    const city = new City(body)
    const ret = await city.save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`city.js create error : ${err}`)
    next(setStatus(400, error))
  }
}

// 更新已有城市信息
exports.update = async (req, res, next) => {
  const { id } = req.params
  const body = req.body
  try {
    const ret = await City.findByIdAndUpdate(id, body, {new: true}).exec()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`Link.js update error : ${err}`)
    next(setStatus(400, '未查找到该城市！'))
  }
}

// 删除已有城市信息
exports.delete = async (req, res, next) => {
  const { id } = req.params
  try {
    await City.findByIdAndDelete(id).exec()
    res.status(204).json({delete: 'success'})
  } catch (err) {
    console.log(`City.js delete error : ${err}`)
    next(setStatus(400, '没有找到该城市！'))
  }
}
