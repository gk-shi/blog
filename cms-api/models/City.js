const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 设计文档结构
const citySchema = Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

// 发布管理员模型
module.exports = mongoose.model('City', citySchema)
