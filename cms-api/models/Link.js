const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const linkSchema = Schema({
  username: {
    type: String,
    required: true
  },
  avt: {
    type: String,
    default: '/img/avts/default.jpg'
  },
  blog_url: {
    type: String,
    default: ''
  },
  git_name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  }
})

// 发布评论模型
module.exports = mongoose.model('link', linkSchema)
