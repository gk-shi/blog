import { reactive, ReactiveEffect } from 'vue'
import { getArticleContentApi } from '../../api'


type ArticleContent = {
  article: ReactiveEffect<Record<string, any>>;
  getArticleContent: (id: string) => Promise<void>;
}

/**
 * @description: 获取文章内容
 * @param {string} artId 文章 Id
 * @return {Object} { article: 文章内容，getArticleContent：获取文章接口 }
 */
export default function getArticle (artId: string): ArticleContent {
  const article = reactive({})

  const getArticleContent = async (id: string): Promise<void> => {
    try {
      const { data } = await getArticleContentApi(id)
      Object.assign(article, data.data)
    } catch (error) {}
  }

  getArticleContent(artId)

  return {
    article,
    getArticleContent
  }
}
