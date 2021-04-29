import { Context } from 'koa'

const NO_NEED_TOKEN_TABLE = {
  articles: ['get'],
  comments: ['get', 'post'],
  bless: ['get', 'post'],
  links: ['get', 'post'],
  tags: ['get'],
  citys: ['get'],
  mails: ['post'],
  website: ['get'],
  oneword: ['get'],
  login: ['post'],
  spider: ['get']
}

// 不验证 token 的条件判断
type NoNeedToken = (ctx: Context) => boolean
const noNeedToken: NoNeedToken = (ctx: Context) => {
  const { method, url } = ctx.request
  const matchRe = url.match(/^\/([\w\d]+)[\/\?]{0,1}/) || []
  const page = matchRe[1]
  return (NO_NEED_TOKEN_TABLE[page] || []).includes(method.toLocaleLowerCase())
}

export default noNeedToken
