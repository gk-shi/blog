const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const tagSchema = Schema({
  tag: {
    type: String,
    required: true
  }
})

// 发布管理员模型
module.exports = mongoose.model('Tag', tagSchema)
