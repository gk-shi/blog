import jwt from 'jsonwebtoken'

export const SECRET = 'blog-console-secrets'


// 签名
export function sign (data: any): string {
  return jwt.sign(data, SECRET, { expiresIn: '10d' })
}

// 验证
export function verify (token: string): unknown {
  return jwt.verify(token, SECRET)
}