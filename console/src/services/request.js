// import axios from 'axios'
import axios from './axios'
// 允许携带cookie
// axios.defaults.withCredentials = true

/**
 * 查询 session
 */
export async function getSessionService () {
  return axios.get('/session')
}

/**
 * 登录
 * @param {object} userInfo 账号、密码信息
 */
export async function loginService (userInfo) {
  return axios.post('/login', userInfo)
}

/**
 * 获取账号信息
 * @param {boolean} isTest 是否为测试账号
 */
export async function getAdminService (isTest) {
  return axios.get('/admins', {
    params: {
      isTest
    }
  })
}

/**
 * 更新账号信息
 * @param {object} admin 更新的账号信息
 */
export async function updateAdminService (admin) {
  return axios.patch('/admins', admin)
}

/**
 * 获取友链信息
 * @param {boolean} verified 是否为申请友链
 *
 * , {
    params: {
      verified
    }
  }
 */
export async function getLinksService () {
  return axios.get('/links')
}

/**
 * 通过友链申请
 * @param {string} id 需要通过的友链 id
 * @param {object} newLink 要更新的友链信息
 */
export async function passLinkService (id, newLink) {
  return axios.patch(`/links/${id}`, newLink)
}

/**
 * 删除友链
 * @param {string} id 需要删除的友链 id
 */
export async function deleteLinkService (id) {
  return axios.delete(`/links/${id}`)
}

/**
 * 获取留言
 * @param {number} page 页码
 * @param {boolean} first 是否为第一次获取
 */
export async function getBlessService (page, first) {
  return axios.get('/bless', {
    params: {
      page,
      first
    }
  })
}

/**
 * 添加留言
 * @param {object} bless 留言信息
 */
export async function addBlessService (bless) {
  return axios.post('/bless', bless)
}

/**
 * 删除留言
 * @param {string} id 留言 id
 */
export async function deleteBlessService (id) {
  return axios.delete(`/bless/${id}`)
}

/**
 * 获取博文列表
 * @param {number} page 页码
 * @param {boolean} first 是否为第一次获取
 */
export async function getBlogListService (page, first) {
  return axios.get('/articles', {
    params: {
      page,
      first
    }
  })
}

/**
 * 获取博文内容
 * @param {string} id 博文 id
 */
export async function getArticleService (id) {
  return axios.get(`/articles/${id}`)
}

/**
 * 发布博文
 * @param {object} blog 新博文内容
 */
export async function addBlogService (blog) {
  return axios.post('/articles', blog)
}

/**
 * 修改博文
 * @param {string} id 修改博文 id
 * @param {object} blog 修改过的博文内容
 */
export async function updateBlogService (id, blog) {
  return axios.patch(`/articles/${id}`, blog)
}

/**
 * 删除博文
 * @param {string} id 博文 id
 */
export async function deleteBlogService (id) {
  return axios.delete(`/articles/${id}`)
}

/**
 * 获取七牛云上传 token
 */
export async function getQnToken (fullKey) {
  return axios.get('/token', {
    params: {
      key: fullKey
    }
  })
}

/**
 * 刷新头像 cnd 缓存 (有跨域问题)
 */
// export async function cdnFlush (token, options) {
//   return axios.post('https://fusion.qiniuapi.com/v2/tune/refresh', options, {
//     withCredentials: false,
//     headers: {
//       Authorization: token
//     }
//   })
// }

/**
 * 获取现有 Tag
 */
export async function getTagsService () {
  return axios.get('/tags')
}

/**
 * 添加新标签
 * @param {string} tag 新标签
 */
export async function addTagService (tag) {
  return axios.post('/tags', { tag })
}

/**
 * 删除标签
 * @param {string} id 标签 id
 */
export async function deleteTagService (id) {
  return axios.delete(`/tags/${id}`)
}

/**
 * 获取评论
 * @param {string} artId 文章 id
 * @param {number} page 页码
 * @param {boolean} first 是否为第一次
 */
export async function getCommentsService (artId, page, first) {
  return axios.get('/comments', {
    params: {
      artId,
      page,
      first
    }
  })
}

/**
 * 发布评论
 * @param {object} comment
 */
export async function issueCommentService (comment) {
  return axios.post('/comments', comment)
}

/**
 * 删除评论
 * @param {strng} id 评论 id
 */
export async function deleteCommentService (id) {
  return axios.delete(`/comments/${id}`)
}

/**
 * 发送验证码
 * @param {string} email 接收验证码邮箱
 */
export async function sendEmailService (email) {
  return axios.post('/mails', {
    email
  })
}

/**
 * 搜索城市经纬度
 * @param {*} city 城市
 * @param {*} address 详细地址
 */
export async function searchCityService (city, address) {
  return axios.get('https://restapi.amap.com/v3/geocode/geo', {
    params: {
      key: process.env.UMI_APP_AMAP_KEY,
      city,
      address
    },
    withCredentials: false
  })
}

/**
 * 添加到过的旅行城市
 * @param {object} city 旅行城市的信息
 */
export async function addCityService (city) {
  return axios.post('/citys', city)
}

/**
 * 获取旅行城市
 * @param {*} param0
 */
export async function getCitysService ({ page, first }) {
  return axios.get('/citys', {
    params: {
      page,
      first
    }
  })
}

/**
 * 修改旅行城市
 * @param {string} id
 * @param {object} city
 */
export async function updateCityService (city) {
  const { id, ...rest } = city
  return axios.patch(`/citys/${id}`, rest)
}

/**
 * 删除旅行城市
 * @param {string} id
 */
export async function deleteCityService (id) {
  return axios.delete(`/citys/${id}`)
}

/**
 * markdown 上传图片
 * @param {object} options 上传配置
 * options:
 *   token: 上传凭证
 *   key: 上传图片名字
 *   file: 上传文件
 */
export async function uploadImg (options) {
  return axios.post(`${process.env.UMI_APP_IMG_UPLOAD_ACTION}`, options, {
    withCredentials: false,
    contentType: 'multipart/form-data'
  })
}

/**
 * 获取未读消息
 */
export async function getUnreadService () {
  return axios.get('/reads')
}

/**
 * 修改未读消息状态
 * @param {string} id
 *   单个 id
 *   'all'
 */
export async function updateUnreadService (id) {
  return axios.patch(`/reads/${id}`)
}

/**
 * 获取网站介绍
 */
export async function getWebsiteService () {
  return axios.get('/website')
}

/**
 * @param {object} body 本站介绍内容
 *    { markdown, html }
 */
export async function addWebsiteService (body) {
  return axios.post('/website', body)
}

/**
 * @param {object} body 本站介绍内容
 *    { markdown, html }
 */
export async function updateWebsiteService (body) {
  return axios.patch('/website', body)
}

export async function getOneOfDay () {
  return axios.get('/oneword')
}
