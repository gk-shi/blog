import Router from '@koa/router'
// import { Context } from 'koa'
import { link, upload, bless, admin, article, comment, tag, city, message, mail, website, oneWord, login } from './controllers'


// 管理员
const admins: Router = new Router()
admins
  .get('/', admin.list)
  .patch('/', admin.update)


// 文章
const articles: Router = new Router()
articles
  .get('/', article.list)
  .get('/:id', article.blog)
  .post('/', article.create)
  .patch('/:id', article.update)
  .delete('/:id', article.del)


// 评论
const comments: Router = new Router()
comments
  .get('/', comment.list)
  .post('/', comment.create)
  .delete('/:id', comment.del)


// 链接
const links: Router = new Router()
links
  .get('/', link.list)
  .post('/', link.create)
  .patch('/:id', link.update)
  .delete('/:id', link.del)


// 留言
const blesses: Router = new Router()
blesses
  .get('/', bless.list)
  .post('/', bless.create)
  .delete('/:id', bless.del)


// 标签
const tags: Router = new Router()
tags
  .get('/', tag.list)
  .post('/', tag.create)
  .delete('/:id', tag.del)


// 旅行城市
const citys: Router = new Router()
citys
  .get('/', city.list)
  .post('/', city.create)
  .patch('/:id', city.update)
  .delete('/:id', city.del)


// 未读消息
const reads: Router = new Router()
reads
  .get('/', message.list)
  .patch('/:id', message.update)


// 获取七牛 token
const token: Router = new Router()
token
  .get('/', upload.getUploadToken)


// 发送邮件
const mails: Router = new Router()
mails
  .post('/', mail.send)


// 本站介绍
const websites: Router = new Router()
websites
  .get('/', website.list)
  .post('/', website.create)
  .patch('/', website.update)


// 金山词霸每日一句
const word: Router = new Router()
word
  .get('/', oneWord.getOneWordEveryDay)

// 登录
const logins: Router = new Router()
logins
  .post('/', login.login)

// 装载所有路由
const router: Router = new Router()

router
  .use('/admins', admins.routes(), admins.allowedMethods())
  .use('/articles', articles.routes(), articles.allowedMethods())
  .use('/comments', comments.routes(), comments.allowedMethods())
  .use('/bless', blesses.routes(), blesses.allowedMethods())
  .use('/links', links.routes(), links.allowedMethods())
  .use('/tags', tags.routes(), tags.allowedMethods())
  .use('/citys', citys.routes(), citys.allowedMethods())
  .use('/reads', reads.routes(), reads.allowedMethods())
  .use('/token', token.routes(), token.allowedMethods())
  .use('/mails', mails.routes(), mails.allowedMethods())
  .use('/website', websites.routes(), websites.allowedMethods())
  .use('/oneword', word.routes(), word.allowedMethods())
  .use('/login', logins.routes(), logins.allowedMethods())
  
export default router