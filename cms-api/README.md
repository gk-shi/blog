## 博客服务端

### 说明

博客服务端采用`express`框架搭建，配合的数据库为`MongoDB`。配置文件为根目录的`admin.js`和`config.js`两个文件。连个文件的说明如下：

1.`admin.js`:

```js
/**
 * 
 * 该文件会在 app.js 运行时被使用，这是为了初始化登录控制台账号信息的文件，需要注意一下几点：
 * 
 * 1. 这是在不修改数据库、不修改服务端代码增加登录控制台账户的文件
 * 2. app.js 运行首次会读取该文件，初始化账号信息，然后会将该文件重写为空，防止服务重启再次读取
 * 3. 在 app.js 中可查看它如何被使用
 * 
 */

module.exports = [
  {
    username: 'xxxxxx@qq.com', // 博主账号，邮箱，可以接收邮件修改密码
    passwd: 'xxxxxxx', // 密码
    nickname: '小溪', // 昵称
    isTest: false, // 是否为测试账号， 测试账号权限会被限制
    avatar: 'https://image.gkshi.com/avatar.jpg' // 头像
  },
  {
    username: 'test.admin',
    passwd: 'test.admin',
    nickname: '测试猿',
    isTest: true,
    avatar: 'https://image.gkshi.com/test-avatar.jpg'
  }
]
```

2.`config.js`:

```javascript
// 一些项目需要的第三方配置信息
module.exports = {
  email: {
    user: 'xxxxxxx@qq.com',   // 邮箱账号： xxxxxxx@qq.com，用来忘记密码发送验证码时邮箱，需要该邮箱开通 pop3 服务 ，和初始化登录账号邮箱不一致！！！
    pass: ''  // pop3 验证码
  },
  qiniu: {  // 七牛云存储的相关 Key， 用来生成 token 配合前端图片上传使用，需要去七牛云官网申请
    accessKey: '',
    secretKey: '',
    scope: '' // 存储空间名
  }
}
```

### 使用

```bash
# 安装依赖
npm i

# 启动服务 （会读取 admin.js）
node app.js    

# 如果安装了 nodemon ，可以使用以下

# npm run dev (不会读取admin.js)
# nodemon app.js (会读取 admin.js)
```

### 查看其它

1.`blog-spa`[README.md](https://github.com/gk-shi/blog/blog-spa/README.md)

2.`blog-console`[README.md](https://github.com/gk-shi/blog/blog-console/README.md)
