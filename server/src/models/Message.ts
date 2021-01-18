import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IMessage {
  nickname: string
  title?: string
  id?: string
  read?: boolean
  created_time: string
}

// 设计文档结构
const messageSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  title: { // 文章标题
    type: String
  },
  id: { // 文章 id
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  created_time: {
    type: String,
    required: true
  }
})

// 发布消息模型
export default mongoose.model('Message', messageSchema)
