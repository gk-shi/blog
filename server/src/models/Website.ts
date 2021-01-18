import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IWebsite {
  markdown: string
  html: string
}

// 设计文档结构
const websiteSchema = new Schema({
  markdown: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

// 发布站点模型
export default mongoose.model('Website', websiteSchema)
