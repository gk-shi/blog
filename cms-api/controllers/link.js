require('../utils/db.js')
const Link = require('../models/Link.js')
const setStatus = require('../utils/setStatus.js')
const axios = require('axios')

// 获取友链
exports.list = async (req, res, next) => {
  // const { verified = true } = req.query
  // { 'verified': verified }
  try {
    const ret = await Link.find().sort('+_id').exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`link.js list error : ${err}`)
    next(setStatus(404, '服务器发生错误！'))
  }
}

// 新增友链
exports.create = async (req, res, next) => {
  const body = req.body
  if (body.git_name.trim().length !== 0) {
    await axios({
      url: `https://api.github.com/users/${body.git_name}`,
      method: 'get'
    })
      .then((res) => {
        body.avt = res.data.avatar_url
        body.git_name = res.data.html_url
      })
      .catch((err) => {
        console.log(err)
      })
  }
  try {
    const ret = await new Link(body).save()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`link.js create error : ${err}`)
  }
}

// 更新友链
exports.update = async (req, res, next) => {
  const { id } = req.params
  const body = req.body
  try {
    const ret = await Link.findByIdAndUpdate(id, body, {new: true}).exec()
    res.status(201).json(ret)
  } catch (err) {
    console.log(`Link.js update error : ${err}`)
    next(setStatus(400, '未查找到该友链！'))
  }
}

// 删除友链
exports.delete = async (req, res, next) => {
  const {id} = req.params
  try {
    await Link.findByIdAndDelete(id).exec()
    res.status(204).json({})
  } catch (err) {
    console.log(`link.js delete error : ${err}`)
    next(setStatus(400, '删除失败！'))
  }
}
