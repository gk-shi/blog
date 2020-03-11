require('../utils/db.js')
const Article = require('../models/Article.js')
const setStatus = require('../utils/setStatus.js')
const getTime = require('../utils/getNowTime.js')

// 获取文章对应列表
exports.list = async (req, res, next) => {
  const {tag = '', page = 0, first = false} = req.query
  const limitCount = 10
  // 返回内容数组
  // 注：因为第一次获取时需要确定总数
  const result = []
  try {
    let ret = await Article.find(tag.length !== 0 ? {'tags': {'$elemMatch': {'$eq': tag}}} : {},
      '_id tags cover outline title created_time').sort('-_id').skip(page * limitCount).limit(limitCount).exec()
    result.push(ret)
    if (Boolean(first) && first !== 'false') {
      const counts = await Article.find(tag.length !== 0 ? {'tags': {'$elemMatch': {'$eq': tag}}} : {},
        '_id').countDocuments().exec()
        req.session.user && req.session.user.nickname ? result.push(counts) : result.push(Math.ceil(counts / limitCount))
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(`article.js list error : ${err}`)
    next(setStatus(404))
  }
}

// 获取文章内容
exports.blog = async (req, res, next) => {
  const { id } = req.params
  try {
    const ret = await Article.findOne({'_id': id}).exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`article.js blog error : ${err}`)
    next(setStatus(404, '没找到博文内容！'))
  }
}

// 添加文章
exports.create = async (req, res, next) => {
  let body = req.body
  if (!body.created_time) {
    body.created_time = getTime.getNowTime()
  }
  try {
    const ret = await new Article(body).save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`article.js create error : ${err}`)
    next(setStatus(400))
  }
}

// 更新文章
exports.update = async (req, res, next) => {
  const { id } = req.params
  const body = req.body
  try {
    const ret = await Article.findByIdAndUpdate(id, body, {new: true}).exec()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`article.js update error : ${err}`)
    next(setStatus(400))
  }
}

// 刪除文章
exports.delete = async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params
  try {
    await Article.findByIdAndDelete(id).exec()
    res.status(204).json({})
  } catch (err) {
    console.log(`article.js delete error : ${err}`)
    next(setStatus(400))
  }
}
