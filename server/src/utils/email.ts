
import nodemailer from 'nodemailer'
import config from './thirdConfig'

// async..await is not allowed in global scope, must use a wrapper
export default async (toUser: string, message: string): Promise<any> => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.email.user, // generated ethereal user
      pass: config.email.pass // generated ethereal password
    }
  })

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"小溪" ${config.email.user}`, // sender address
    to: toUser, // list of receivers
    subject: '来自博客服务器的信息', // Subject line
    // text: '测试验证码', // plain text body
    html: message // html body
  }

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions)
  console.log(info)
}
