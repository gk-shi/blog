import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface ITag {
  tag: string
}

// 设计文档结构
const tagSchema = new Schema({
  tag: {
    type: String,
    required: true
  }
})

// 发布标签模型
export default mongoose.model('Tag', tagSchema)
