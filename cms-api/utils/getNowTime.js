/**
 * 获取当前时间
 *
 * @param  {[boolean]} needHour [是否需要精确的时和分]
 *
 * @return {[String]}          [具体时间的字符串]
 */
exports.getNowTime = (needHour) => {
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
