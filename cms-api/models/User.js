const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const userSchema = Schema({
  // _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ''
  }}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

// 发布用户模型
module.exports = mongoose.model('User', userSchema)
