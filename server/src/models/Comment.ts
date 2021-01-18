import mongoose, { Schema } from 'mongoose'
const mSchema = mongoose.Schema

export interface IComment {
  art_id: Schema.Types.ObjectId
  username: string
  avt: string
  is_admin?: boolean
  content: string
  created_time: string
  blog?: string
  email?: string
}

// 设计文档结构
const comentSchema = new mSchema({
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

// 发布评论模型
export default mongoose.model('Comment', comentSchema)
