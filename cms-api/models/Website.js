const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const websiteSchema = Schema({
  markdown: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

// 发布管理员模型
module.exports = mongoose.model('Website', websiteSchema)
