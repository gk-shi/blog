import { onMounted, Ref, ref } from 'vue'
import { getCommentApi } from '../../api'


type ArticleComment = {
  commentList: Ref<Array<any>>;
  getArticleComments: (id: string) => Promise<void>;
}

/**
 * @description: 获取文章评论
 * @param {string} artId 文章 Id
 * @return {Object} { commentList: 评论列表，getArticleComments获取文章对应评论列表 }
 */
export default function getComment (artId: string): ArticleComment {
  const commentList = ref([])

  const getArticleComments = async (id: string): Promise<void> => {
    const params = {
      page: 0,
      first: false,
      count: 1000,
      artId: id
    }
    try {
      const { data } = await getCommentApi(params)
      commentList.value = data.data.data
    } catch (error) {}
  }

  onMounted(() => getArticleComments(artId))

  return {
    commentList,
    getArticleComments
  }
}
