import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IAdmin {
  username: string
  passwd: string
  nickname: string
  avatar: string
  isTest: boolean
}

// 设计文档结构
const adminSchema = new Schema({
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
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

// 发布管理员模型
export default mongoose.model('Admin', adminSchema)
