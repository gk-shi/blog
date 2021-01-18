
import { Ref, ref } from 'vue'
import { getArticleListApi } from '../../api/index'

const formatTime: (timeStr: string) => string = (timeStr: string): string => {
  const time = timeStr.split(/\s+/)
  const timeSpan = Date.now() - new Date(`${time[1]}/${time[0].replace('-', '/')}`).getTime()
  const year = timeSpan / (1000 * 60 * 60 * 24 * 365)
  return year >= 1 ? `${Math.floor(year)}年前` : year * 12 >= 1 ? `${Math.floor(year * 12)}月前` : year * 12 * 30 >= 1 ? `${Math.floor(year * 12 * 30)}天前` : '刚刚'
}


type BlogList = {
  list: Ref<Array<Record<string, any>>>;
  getList: (config: Record<string, any>) => Promise<number>;
}

/**
 * @description: 获取博文列表
 * @param {*}
 * @return {*} { list: 博文列表, getList: 获取博文列表 }
 */
export default function getBlogList (): BlogList {
  const list = ref<Record<string, any>>([])

  const getList = async (config: Record<string, any>): Promise<number> => {
    try {
      const { data } = await getArticleListApi(config)
      if (data && data.errno === 0 && data.data) {
        data.data.data.forEach((el: any) => {
          el.time = formatTime(el.created_time)
        })
        if (data.data?.total) {
          list.value = data.data.data
        } else {
          list.value = list.value.concat(data.data.data)
        }
        return Promise.resolve(data.data.data.length)
      }
      return Promise.resolve(-1)
    } catch (error) {
      return Promise.resolve(-1)
    }
  }

  return {
    list,
    getList
  }
}
