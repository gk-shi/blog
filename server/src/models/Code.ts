import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ICode {
  account: string
  code: string
  expired: number
}

// 设计文档结构
const codeSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  expired: {
    type: Number,
    required: true
  }
})

// 发布管理员模型
export default mongoose.model('Code', codeSchema)
