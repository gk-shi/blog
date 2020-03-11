## 博客前台

### 说明

采用的是`vue2.x`编写，项目的一些先行配置在`.env`、`.env.development`和`.env.production`中，其中一些字段的说明如下：

**`.env`**:

- `VUE_APP_IMG_PREFIX`: 图片前缀补齐，**可以不配置**，此为我兼容以前没有上传七牛云而保留在自己服务器的图片做的兼容
- `VUE_APP_CONSOLE`: 可不配置

**`.env.development`、`.env.production`**:

- `VUE_APP_AMAP_TOKEN`: 高德地图 web 端服务`key`
  - **旅行**菜单用来展示地图及标注点使用
  - 需要在[高德开发平台](https://lbs.amap.com/dev/key/app)申请，服务平台选择**web端（JS API）**
  - 与控制台的`key`**不是同一个！！！**

### 使用

```bash
# 此为老项目，要求 node 版本在 8.10.x 左右，版本高无法构建

# 安装依赖
npm i

# 启动服务
npm run serve

# 构建
npm run build
```

### 查看其它

1.`blog-console`[README.md](https://github.com/gk-shi/blog/blog-console/README.md)

2.`cms-api`[README.md](https://github.com/gk-shi/blog/cms-api/README.md)

