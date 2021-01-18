## 博客前台

### 说明

采用的是`vue 3.0` + `TS` + `vite 1.x`编写，项目的一些先行配置在`.env`、`.env.development`和`.env.production`中，其中一些字段的说明如下：

**`.env`**:

- `VITE_IMG_PREFIX`: 图片前缀补齐，**可以不配置**，此为我兼容以前没有上传七牛云而保留在自己服务器的图片做的兼容
- `VITE_CONSOLE`: 可不配置

**`.env.development`、`.env.production`**:

- `VITE_AMAP_TOKEN`: 高德地图 web 端服务`key`
  - **旅行**菜单用来展示地图及标注点使用
  - 需要在[高德开发平台](https://lbs.amap.com/dev/key/app)申请，服务平台选择**web端（JS API）**
  - 与控制台的`key`**不是同一个！！！**

### 使用

```bash

# 安装依赖
yarn install

# 启动服务
yarn dev

# 构建
yarn build
```

### 查看其它

1.`console`[README.md](/console)

2.`server`[README.md](/server)

