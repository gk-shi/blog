// 获取 6 位随机验证码
module.exports = () => {
  const codePool = 'qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ1234567890'
  let code = ''
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * 62)
    code += codePool[index]
  }
  return code
}
