import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IBless {
  username: string
  avt?: string
  content: string
  is_admin?: boolean
  created_time?: string 
  blog?: string
  email?: string
}

// 设计文档结构
const blessSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avt: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  created_time: {
    type: String,
    default: ''
  },
  blog: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }
})

// 发布留言模型
export default mongoose.model('Bless', blessSchema)
