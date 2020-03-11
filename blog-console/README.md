## 博客控制台

### 说明

博客控制台使用`react + umi + dva + antd`构建，项目的一些前提配置在`.env`中。其中各项解释如下：

- `UMI_APP_IMG`: 图片地址补齐前缀，为七牛云外链。
  - 与图片上传完成后存入数据库有关
- `UMI_APP_IMG_UPLOAD_ACTION`: `url`上传七牛云图片的请求地址
  - 与你七牛云申请的存储地区有关，可查询[这里](https://developer.qiniu.com/kodo/manual/1671/region-endpoint)
  - 要上传图片还需配合服务API`cms-api`返回相应`token`
- `UMI_APP_AMAP_KEY`: 高德地图服务使用的`key`（我删除了自己的）
  - 需要在[高德开放平台申请](https://lbs.amap.com/)
  - 此处是为了控制台搜索城市经纬度API服务，因此申请`key`时服务平台选择**web服务**类

### 使用

```bash

# 需要 node 的版本在 10.x+

# 安装依赖
yarn install

# 启动服务
yarn start

# 构建
yarn build
```

### 查看其它

1.`blog-spa`[README.md](/blog-spa)

2.`cms-api`[README.md](/cms-api)