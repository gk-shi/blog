import mongoose from 'mongoose'
const Schema= mongoose.Schema

export interface ICity {
  name: string
  img?: string
  longitude: number
  latitude: number
}

// 设计文档结构
const citySchema = new Schema({
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
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

// 发布城市模型
export default mongoose.model('City', citySchema)
