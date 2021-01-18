import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ILink {
  username: string
  avt?: string
  blog_url?: string
  git_name?: string
  description?: string
}

// 设计文档结构
const linkSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avt: {
    type: String,
    default: ''
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

// 发布链接模型
export default mongoose.model('link', linkSchema)
