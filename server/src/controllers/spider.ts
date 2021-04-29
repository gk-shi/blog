import { Context } from 'koa'
import responseHandle from '../utils/responseHandle'
import { Article } from '../models'


// 获取文章内容
export async function postArticle (ctx: Context): Promise<any> {
  const { host, 'user-agent': userAgent } = ctx.request.header
  if (host !== '127.0.0.1:3000' || !/(Baiduspider)|(Googlebot)/ig.test(userAgent)) throw new Error('发生错误')
  const { id } = ctx.params
  const { flag } = ctx.query
  const config: any = {}
  if (flag) {
    config.markdown = 0
  }
  try {
    const ret = await Article.findOne({ '_id': id }, config).exec()
    const { title, outline, tags, content } = ret as any
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const html = formArticleHtml(title, outline, tags, content)
    ctx.body = html
  } catch (error) {
    responseHandle({ ctx, errno: -1, errmsg: '获取文章内容失败，等等再试吧~', error })
  }
}

function formArticleHtml (title: string, outline: string, tags: (string | undefined) [], content: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <Link rel="icon"
          href="/favicon.ico" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="keywords"
          content="${tags.join(',') + ','}gkshi,小溪,博客,个人博客,前端开发者,前端工程师,nodejs">
    <meta name="description"
          content="${outline}">
  </head>
  
  <body>
    <h1>${title}</h1>
    ${content}
  </body>
  
  </html>
  `
}