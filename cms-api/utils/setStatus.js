module.exports = function setStatus (code, tip = '') {
  let message = tip
  switch (code) {
    case 400:
      message += ' invalid request'
      break
    case 401:
      message += ' Unauthorized'
      break
    case 404:
      message += ' not found'
      break
    default:
      message += ' server error'
  }
  return {
    status: code,
    message
  }
}
