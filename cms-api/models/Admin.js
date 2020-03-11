const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const adminSchema = Schema({
  username: {
    type: String,
    required: true
  },
  passwd: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  isTest: {
    type: Boolean,
    required: true
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

// 发布管理员模型
module.exports = mongoose.model('Admin', adminSchema)
