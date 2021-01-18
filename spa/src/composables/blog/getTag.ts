
import { onMounted, ref, Ref } from 'vue'
import { getTagsApi } from '/@/api'

type BlogTag = {
  currentTag: Ref<string>;
  tags: Ref<any[]>;
  getTag: () => Promise<void>;
  changeCurrentTag: (tagName: string) => void;
}

/**
 * @description: 获取 tags
 * @param {*}
 * @return {*} { currentTag: 当前tag, tags: tag列表，getTag，changeCurrentTag }
 */
export default function getTag (): BlogTag {
  const currentTag = ref('all')
  const tags = ref([])

  const getTags  = async (): Promise<void> => {
    try {
      const { data } = await getTagsApi()
      tags.value = data.data
    } catch (error) {}
  }

  const changeCurrentTag = (tagName: string): void => {
    currentTag.value = tagName
    // config = {
    //   page: 0,
    //   tag: tagName === 'all' ? '' : tagName,
    //   count: 10,
    //   first: true
    // }
    // over.value = false
    // getList()
  }


  onMounted(getTags)

  return {
    currentTag,
    tags,
    getTags,
    changeCurrentTag
  }
}
