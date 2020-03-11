const express = require('express')
const router = express.Router()
const admin = require('./controllers/admin.js')
const article = require('./controllers/article.js')
const comment = require('./controllers/comment.js')
const leavemes = require('./controllers/leavemes.js')
const links = require('./controllers/link.js')
const user = require('./controllers/user.js')
const session = require('./controllers/session.js')
const tag = require('./controllers/tag.js')
const upload = require('./utils/upload.js')
const mail = require('./controllers/sendEmail.js')
const city = require('./controllers/city.js')
const message = require('./controllers/message')

// 检验是否登录
function checkLogin (req, res, next) {
  
  if (req.route.path === '/admins' && req.body.checkCode) {
    // 邮箱修改密码
    next()
    return
  }
  // user.isTest  method 非 GET （除） || (req.session.user.isTest && )
  if (!req.session.user || (req.session.user.isTest && (req.route.path !== '/session'))) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  } else {
    next()
  }
}

/**
 * 管理员资源
 */
router
  .get('/admins', checkLogin, admin.list)
  // .post('/admins', admin.create)
  .patch('/admins', checkLogin, admin.update)
  // .delete('/admins/:id', checkLogin, admin.delete)

  /**
 * 文章资源
 */
router
  .get('/articles', article.list)
  .get('/articles/:id', article.blog)
  .post('/articles', checkLogin, article.create)
  .patch('/articles/:id', checkLogin, article.update)
  .delete('/articles/:id', checkLogin, article.delete)

/**
 * 评论资源
 */
router
  .get('/comments', comment.list)
  .post('/comments', comment.create)
  .patch('/comments/:id', checkLogin, comment.update)
  .delete('/comments/:id', checkLogin, comment.delete)

/**
 * 留言资源
 */
router
  .get('/leavemes', leavemes.list)
  .post('/leavemes', leavemes.create)
  .delete('/leavemes/:id', checkLogin, leavemes.delete)

/**
 * 友链资源
 */
router
  .get('/links', links.list)
  .post('/links', links.create)
  .patch('/links/:id', checkLogin, links.update)
  .delete('/links/:id', checkLogin, links.delete)

/**
 * 用户资源
 */
router
  .get('/users', user.list)
  .post('/users', user.create)
  .patch('/users', checkLogin, user.update)
  .delete('/users/:id', checkLogin, user.delete)

/**
 * 会话资源
 */
router
  .get('/session', checkLogin, session.list)
  .post('/session', session.create)
  .delete('/session/', checkLogin, session.delete)

/**
 * 标签资源
 */
router
  .get('/tags', tag.list)
  .post('/tags', checkLogin, tag.create)
  .delete('/tags/:id', checkLogin, tag.delete)


/**
 * 旅行城市资源
 */
router
  .get('/citys', city.list)
  .post('/citys', checkLogin, city.create)
  .patch('/citys/:id', checkLogin, city.update)
  .delete('/citys/:id', checkLogin, city.delete)


/**
 * 未读消息资源
 */
router
  .get('/reads', message.list)
  .patch('/reads/:id', checkLogin, message.update)

/**
 * 返回七牛云token
 */
router
  .get('/token', checkLogin, upload.getUploadToken)

// 发送邮件
router
// .get('/mails', mail.send)
.post('/mails', mail.send)

module.exports = router
