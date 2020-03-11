const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const comentSchema = Schema({
  art_id: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  username: {
    type: String,
    required: true
  },
  avt: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    required: true
  },
  created_time: {
    type: String,
    required: true
  }
})

// 发布评论模型
module.exports = mongoose.model('Comment', comentSchema)
