require('../utils/db.js')
const Comment = require('../models/Comment.js')
const Message = require('../models/Message')
const Article = require('../models/Article.js')
const setStatus = require('../utils/setStatus.js')
const getTime = require('../utils/getNowTime.js')

// 获取评论
exports.list = async (req, res, next) => {
  const { artId, page = 0, first = false } = req.query
  const art = await Article.findOne({_id: artId}, 'title').exec()
  const limitCount = 10
  // 返回内容数组
  // 注：因为第一次获取时需要确定总数
  const result = []
  try {
    const ret = await Comment.find({ 'art_id': artId }).sort('-_id').skip(page * limitCount).limit(limitCount).exec()
    result.push(ret)
    if (Boolean(first) && first !== 'false') {
      const counts = await Comment.find({ 'art_id': artId }).countDocuments().exec()
      req.session.user && req.session.user.nickname ? result.push(counts) : result.push(Math.ceil(counts / limitCount))
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(`comment.js list error : ${err}`)
    next(setStatus(404))
  }
}

// 新增评论
exports.create = async (req, res, next) => {
  const body = req.body
  // 添加时间
  const createdTime = getTime.getNowTime()
  body.created_time = createdTime
  if (!body.is_admin) {
    try {
      const { art_id, username } = body
      const art = await Article.findOne({_id: art_id}, 'title').exec()
      await new Message({
        nickname: username,
        title: art.title,
        id: art_id,
        created_time: createdTime
      }).save()
    } catch (error) {
      console.log('添加评论信息到通知失败...')
    }
  }
  try {
    const ret = await new Comment(body).save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`comment.js create error : ${err}`)
    next(setStatus(400))
  }
}

// 更新评论
exports.update = async (req, res, next) => {
  const {id} = req.params
  const body = req.body
  try {
    const ret = await Comment.findByIdAndUpdate(id, body, {new: true}).exec()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`comment.js update error : ${err}`)
    next(setStatus(400))
  }
}

// 删除评论
exports.delete = async (req, res, next) => {
  const {id} = req.params
  try {
    await Comment.findByIdAndDelete(id).exec()
    res.status(204).json({})
  } catch (err) {
    console.log(`comment.js delete error : ${err}`)
    next(setStatus(400))
  }
}
