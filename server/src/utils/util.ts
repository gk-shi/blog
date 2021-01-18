type GetTime = (needHour?: boolean) => string
type RandCode = () => string

/**
 * 获取当前时间
 *
 * @param  {[boolean]} needHour [是否需要精确的时和分]
 *
 * @return {[String]}          [具体时间的字符串]
 */
export const getNowTime: GetTime = (needHour?: boolean): string => {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
  if (!needHour) {
    return `${month}-${day} ${year}`
  }
  const hour = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
  const minute = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
  return `${month}-${day} ${year} ${hour}:${minute}`
}

/**
 * 获取 6 位验证码
 * 
 * @return {[String]}
 */
export const rand6Code: RandCode = (): string => {
  const codePool = 'qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ1234567890'
  let code = ''
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 62)
    code += codePool[index]
  }
  return code
}