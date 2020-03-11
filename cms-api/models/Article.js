const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const articleSchema = Schema({
  // user_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: []
  },
  cover: {
    type: String,
    default: ''
  },
  outline: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  markdown: { // 新增保留原 markdown 原文
    type: String,
    required: true
  },
  created_time: {
    type: String,
    required: true
  }
})

// 发布文章模型
module.exports = mongoose.model('Article', articleSchema)
