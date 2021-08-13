import axios from 'axios'
import { Context } from 'koa'
import responseHandle from '../utils/responseHandle'

// 获取金山词霸每日一句
export interface OneWord {
  note: string // 中文内容
  english: string // 英文内容
}
export async function getOneWordEveryDay (ctx: Context): Promise<void> {

  let oneWord: OneWord
  try {
    const { data } = await axios.get('http://open.iciba.com/dsapi/')
    if (data?.content.length !== 0) {
      oneWord = {
        note: data.note,
        english: data.content
      }
    } else {
      throw new Error('api-error')
    }
  } catch (error) {
    oneWord = {
      note: '我喜欢你，仅此而已',
      english: 'I like you ,but just like you.'
    }
  }
  responseHandle({ ctx, data: oneWord })
}
