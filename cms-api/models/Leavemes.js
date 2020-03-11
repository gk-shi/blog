const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const leaSchema = Schema({
  username: {
    type: String,
    required: true
  },
  avt: {
    type: String,
    default: '/img/avts/default.jpg'
  },
  content: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  created_time: {
    type: String,
    default: ''
  }
})

// 发布文章模型
module.exports = mongoose.model('Leavemes', leaSchema)
