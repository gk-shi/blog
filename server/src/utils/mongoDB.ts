import mongoose from 'mongoose'

const mongoUrl = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/blog-bp' : 'mongodb://blogAdmin:blogPwd@127.0.0.1:27017/blog'

export const connect: () => void = (): void => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  mongoose.connection.on('error', (error: any): void => {
    console.log('连接数据库失败：', error)
  })

  mongoose.connection.once('open', (): void => {
    console.log('连接数据库成功！')
  })
}