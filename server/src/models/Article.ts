import mongoose from 'mongoose'
const Schema= mongoose.Schema

export interface IArticle {
  title: string
  tags?: string []
  cover?: string
  outline?: string
  content: string
  markdown: string
  created_time?: string
}

// 设计文档结构
const articleSchema = new Schema({
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
export default mongoose.model('Article', articleSchema)
