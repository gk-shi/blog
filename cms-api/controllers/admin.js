const Admin = require('../models/Admin')
const md5 = require('blueimp-md5')
const setStatus = require('../utils/setStatus.js')
require('../utils/db.js')

// 获取管理员列表
exports.list = async (req, res, next) => {
  try {
    const ret = await Admin.find({}, '_id username').exec()
    res.status(200).json(ret)
  } catch (err) {
    console.log(`admin.js list error : ${err}`)
    next(setStatus(404))
  }
}

exports.initAdmin = (admins) => {
  admins.forEach(admin => {
    admin.passwd = md5(md5(admin.passwd))
    new Admin(admin).save()
  } )
  // const admin = {
  //   username: 'gkshi@foxmail.com',
  //   passwd: md5(md5('shihuang')),
  //   nickname: '小溪',
  //   avatar: 'http://wx4.sinaimg.cn/large/006szvLFgy1fwll8fqpxhj30b40a80vg.jpg',
  //   isTest: false
  // }
  // const testAdmin = {
  //   username: 'test.admin',
  //   passwd: md5(md5('test.admin')),
  //   nickname: '测试猿',
  //   avatar:
  //     'http://5b0988e595225.cdn.sohucs.com/images/20181026/c2a3b3652ac24be7b25dc76354daedf5.jpeg',
  //   isTest: true
  // }

  // let ad = new Admin(admin)
  // await ad.save()
  // ad = new Admin(testAdmin)
  // await ad.save()
}

// 添加管理员 --- 暂时不添加该功能
// exports.create = async (req, res, next) => {
//   const body = req.body
//   body.passwd = md5(md5(body.passwd))
//   try {
//     const admin = new Admin(body)
//     const ret = await admin.save()
//     res.status(201).json(ret)
//   } catch (err) {
//     console.log(`admin.js create error : ${err}`)
//     next(setStatus(400))
//   }
// }

// 更新管理员信息
exports.update = async (req, res, next) => {
  try {
    const { checkCode = '' } = req.body
    let queryOptions, newInfo
    if (checkCode) {
      // 非测试账号
      const { username, passwd } = req.body
      if (req.session.checkCode !== checkCode) {
        throw new Error('验证码错误！')
      }
      delete req.session['checkCode']
      queryOptions = {
        username
      }
      newInfo = {
        passwd: md5(md5(passwd))
      }
    } else {
      const { oldPasswd, newPasswd } = req.body
      queryOptions = {
        passwd: md5(md5(oldPasswd)),
        isTest: req.session.user && !req.session.user.isTest
      }
      newInfo = {
        passwd: md5(md5(newPasswd))
      }
    }
    const ret = await Admin.findOneAndUpdate(queryOptions, newInfo, {
      new: true,
      select: 'username'
    }).exec()
    if (!ret) {
      throw new Error('测试账号原密码错误！')
    }
    res.status(201).json('密码修改完成！')
  } catch (err) {
    console.log(`admin.js update error : ${err}`)
    next(setStatus(400, err))
  }
}

// 删除管理员信息 --- 暂时不添加该功能
// exports.delete = async (req, res, next) => {
//   const {id} = req.params
//   try {
//     await Admin.findByIdAndDelete(id).exec()
//     res.status(204).json({})
//   } catch (err) {
//     console.log(`admin.js delete error : ${err}`)
//     next(setStatus(400))
//   }
// }
