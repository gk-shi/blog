import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './login.less'
import { connect } from 'dva'
import router from 'umi/router'
import { openNotificationWithIcon } from '../../components/notification/Notification'
import { setStorage, getStorage, removeStorage } from '../../utils/utils'
import { sendEmailService, updateAdminService } from '../../services/request'

@connect(() => ({}), {
  login: (action) => (action)
})
class Login extends React.Component {
  state = {
    forgot: false,
    loading: false,
    sendBtnTip: '发送验证码',
    sending: false,
    restSeconds: 0,
    codeHandler: null,
    initValue: {
      username: '',
      passwd: '',
      remember: false
    },
    count: 0
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }
      this.setState({
        loading: true
      })
      if (!this.state.forgot) {
        // 登录
        await this.toLogin(values)
      } else {
        // 重置密码
        await this.resetPassword(values)
      }
    })
  }
  changeMode = () => {
    this.setState((state) => ({
      forgot: !state.forgot
    }))
  }

  toLogin = async (values) => {
    const userInfo = {
      username: values.account,
      passwd: values.password
    }
    try {
      // const res = await this.props.dispatch({type: 'user/login', payload: userInfo})
      const res = await this.props.login({ type: 'user/login', payload: userInfo })

      if (!res || !res.login) {
        openNotificationWithIcon('error', '登录失败！', res.toString())
        return
      }
      if (values.remember) {
        setStorage('USER_ACCOUNT', { ...userInfo, remember: values.remember })
      } else {
        removeStorage('USER_ACCOUNT')
      }
      const from = this.props.location.state?.from
      router.push(from || '/')
    } catch (error) {
      openNotificationWithIcon('error', '登录失败！', error.toString())
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  resetPassword = async (values) => {
    const adminInfo = {
      username: values.account,
      checkCode: values.checkCode,
      passwd: values.password
    }
    try {
      const ret = await updateAdminService(adminInfo)
      openNotificationWithIcon('success', '重置成功！', ret.data)
      this.setState({
        forgot: false
      })
    } catch (error) {
      openNotificationWithIcon('error', '重置失败！', error.response.data.error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  sendCode = async () => {
    const email = this.props.form.getFieldValue('account')
    // eslint-disable-next-line no-useless-escape
    if (!email || !/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(email)) {
      openNotificationWithIcon('error', '发送失败！', '请正确输入需要修改密码的邮箱账号！')
    }
    try {
      this.setState({
        sending: true
      })
      await sendEmailService(email)
      openNotificationWithIcon('success', '发送成功！', '请尽快去查收邮件。')
      this.timeHandler()
    } catch (error) {
      openNotificationWithIcon('error', '发送失败！', error.response.data.error)
    } finally {
      this.setState({
        sending: false
      })
    }
  }

  // 定时器修改文案
  timeHandler = () => {
    this.setState({
      restSeconds: 59,
      codeHandler: setInterval(() => {
        let message
        const seconds = this.state.restSeconds
        if (seconds === 0) {
          message = '发送验证码'
          clearInterval(this.state.codeHandler)
        } else {
          message = `${seconds}秒后可重发`
        }
        this.setState({
          restSeconds: seconds === 0 ? 0 : seconds - 1,
          sendBtnTip: message
        })
      }, 1000)
    })

  }

  componentDidMount() {
    const localValue = getStorage('USER_ACCOUNT')
    if (localValue) {
      this.setState({
        initValue: { ...localValue }
      })
    }
  }

  componentWillUnmount() {
    // 清除定时器
    if (this.state.codeHandler) {
      clearInterval(this.state.codeHandler)
    }
  }

  render() {
    const prefix = process.env.UMI_APP_IMG
    const { getFieldDecorator } = this.props.form
    const { forgot, loading, sendBtnTip, restSeconds, sending, initValue } = this.state
    const msgTip = {
      pwdTip: `请输入${forgot ? '新' : ''}密码`,
      toggleTip: forgot ? '登录' : '忘记密码',
      buttonTip: forgot ? '确认修改' : '登录'
    }
    // 验证码输入框
    const forgetItem = (
      <Form.Item className={styles.forget}>
        {getFieldDecorator('checkCode', {
          rules: [{ message: '请输入验证码' }]
        })(
          <Input
            placeholder="请输入邮箱的验证码"
            prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }}
              type="barcode" />}
          />
        )}
        <Button type="primary"
          loading={sending}
          disabled={restSeconds !== 0}
          onClick={this.sendCode}>{sendBtnTip}</Button>
      </Form.Item>
    )
    return (
      <div className={styles.login}
        style={{ backgroundImage: `url('${prefix}/login-bg.jpg')` }}>
        <Form className="login-form"
          onSubmit={this.handleSubmit}>
          <div className="form-title">博客控制台</div>
          <Form.Item>
            {getFieldDecorator('account', {
              initialValue: initValue.username,
              rules: [{ required: true, message: '请输入账号邮箱' }]
            })(
              <Input
                placeholder="账号邮箱"
                prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }}
                  type="user" />}
              />
            )}
          </Form.Item>
          {forgot ? forgetItem : undefined}
          <Form.Item>
            {getFieldDecorator('password', {
              initialValue: initValue.passwd,
              rules: [{ required: true, message: msgTip.pwdTip }]
            })(
              <Input
                placeholder={msgTip.pwdTip}
                prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }}
                  type="lock" />}
                type="password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: initValue.remember
            })(<Checkbox onChange={() => console.log('remember')}
              style={{ display: forgot ? 'none' : '' }}
            >记住我</Checkbox>)}
            <span className="login-form-forgot"
              style={{ cursor: 'pointer' }}
              onClick={this.changeMode}>
              {msgTip.toggleTip}
            </span>
            <Button className="login-form-button"
              htmlType="submit"
              loading={loading}
              type="primary">
              {msgTip.buttonTip}
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedLogin = Form.create({
  name: 'login'
})(Login)

export default WrappedLogin
