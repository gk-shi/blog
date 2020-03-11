import React from 'react'
import styles from './setting.less'
import UploadImg from '../../components/uploadImg/UploadImg'
import Link from 'umi/link'
import { connect } from 'dva'
import { Button, Progress } from 'antd'
import LabelInput from '../../components/labelInput/LabelInput'
import { updateAdminService } from '../../services/request'
import { openNotificationWithIcon } from '../../components/notification/Notification'

@connect(state => ({ userInfo: state.user }), {
  updateAvt: () => ({ type: 'user/updateAvatar' })
})
class Setting extends React.Component {
  state = {
    oldPasswd: '',
    newPasswd: '',
    loading: false,
    percent: 0
  }

  passwdChange = (type, value) => {
    const model = {}
    model[type] = value
    this.setState(model)
  }

  resetTestPasswd = async () => {
    try {
      this.setState({
        loading: true
      })
      await updateAdminService({
        oldPasswd: this.state.oldPasswd,
        newPasswd: this.state.newPasswd
      })
      openNotificationWithIcon('success', '修改成功！')
    } catch (error) {
      openNotificationWithIcon('error', '修改失败！', error.response.data.error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  recordUpload = info => {
    switch (info.file.status) {
    case 'uploading':
      this.setState({
        percent: Math.floor(info.file.percent)
      })
      break
    case 'done':
      openNotificationWithIcon('success', '上传成功！')
      this.props.updateAvt()
      break
    case 'error':
      openNotificationWithIcon('error', '上传失败')
      break
    default:
      break
    }
  }

  render() {
    const { isTest, avatar } = this.props.userInfo
    return (
      <div className={styles.setting}>
        <div className={styles.avt}>
          <UploadImg
            avatar={avatar}
            uploadStatus={(info) => this.recordUpload(info)}
            adminAvatar={isTest ? 'test-avatar.jpg' : 'avatar.jpg'}
          />
          <Progress percent={this.state.percent}
            status="active" />
          <div className={styles.change}>更换头像(上传即更换)</div>
          <div className={styles.test}>
            <LabelInput
              className={styles['test-item']}
              label="原密码"
              placeholder="针对测试账号"
              onChange={e => this.passwdChange('oldPasswd', e.target.value)}
              type="password"
            />
            <LabelInput
              className={styles['test-item']}
              label="新密码"
              placeholder="针对测试账号"
              onChange={e => this.passwdChange('newPasswd', e.target.value)}
              type="password"
            />
          </div>
          <Button
            disabled={isTest}
            className={styles['btn-submit']}
            type="primary"
            loading={this.state.loading}
            onClick={this.resetTestPasswd}
          >
            修改测试账号
          </Button>
          <div className={styles.tip}>
            <span>Tips:</span>
            <p>
              1.正式账号修改密码暂时只支持邮箱验证码方式，如需修改请到
              <Link to="/login">登录页</Link>选择->忘记密码。
            </p>
            <p>2.测试账号的信息目前只支持博主自己修改鸭~</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Setting
