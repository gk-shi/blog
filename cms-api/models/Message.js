const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const messageSchema = Schema({
  nickname: {
    type: String,
    required: true
  },
  title: { // 文章标题
    type: String
  },
  id: { // 文章 id
    type: String,
  },
  read: {
    type: Boolean,
    default: false
  },
  created_time: {
    type: String,
    required: true
  }
})

// 发布文章模型
module.exports = mongoose.model('Message', messageSchema)
