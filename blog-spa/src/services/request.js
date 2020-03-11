import axios from 'axios'

/**
 * 获取所有标签
 */
export async function getTagsService () {
  return axios.get('/api/tags')
}

/**
 * 获取博文列表
 * @param {number} page 页码
 * @param {string} tag 标签
 */
export async function getBlogListService (page, tag = '') {
  return axios.get('/api/articles', {
    params: {
      page,
      tag,
      timestamp: Date.now()
    }
  })
}

/**
 * 发布留言
 * @param {object} bless 留言内容
 */
export async function publishBlessService (bless) {
  return axios.post('/api/leavemes', bless)
}

/**
 * 获取留言
 * @param {number} page 页码
 * @param {boolean} first 是否为第一次获取，用来判断是否需要获取总数
 */
export async function getBlessService (page, first) {
  return axios.get('/api/leavemes', {
    params: {
      page,
      first
    }
  })
}

/**
 * 获取博文内容
 * @param {string} blogId 博文id
 */
export async function getArticleService (blogId) {
  return axios.get(`/api/articles/${blogId}`)
}

/**
 * 获取文章评论
 * @param {string} blogId 博文id
 * @param {number} page 页码
 * @param {boolean} first 是否第一次获取
 */
export async function getCommentsService (blogId, page, first) {
  return axios.get('/api/comments', {
    params: {
      artId: blogId,
      page,
      first
    }
  })
}

/**
 * 发布博文评论
 * @param {string} blogId 博文Id
 * @param {object} comment 评论相关信息
 */
export async function publishCommentService (blogId, comment) {
  return axios.post('/api/comments', comment)
}

/**
 * 获取有友链
 */
export async function getLinksService () {
  return axios.get('/api/links')
}

/**
 * 提交友链申请
 * @param {object} userInfo 友链信息
 */
export async function addLinkService (userInfo) {
  return axios.post('/api/links', userInfo)
}

/**
 * 获取旅行城市信息
 */
export async function getCitysService () {
  return axios.get('/api/citys')
}
