import React from 'react'
import { Upload, Icon, message } from 'antd'
import './UploadImg.less'
import { getQnToken } from '../../services/request'
import { getNow } from '../../utils/utils'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

class UploadImg extends React.Component {
  state = {
    loading: false,
    upLoadAction: process.env.UMI_APP_IMG_UPLOAD_ACTION
  }

  handleChange = info => {
    this.props.uploadStatus(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        }),
      )
      return
    }
  }

  beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt6M = file.size / 1024 / 1024 < 6
    if (!isLt6M) {
      message.error('Image must smaller than 6MB!')
    }
    if (isJpgOrPng && isLt6M) {
      if (this.props.adminAvatar) {
        await this.getUpToken(this.props.adminAvatar)
      } else {
        await this.getUpToken()
      }
    }
    return isJpgOrPng && isLt6M
  }

  getUpToken = async (fullKey) => {
    const ret = await getQnToken(fullKey)
    this.setState({
      token: ret.data
    })
  }

  setUploadConfig = (file) => {
    const config = {
      token: this.state.token,
      key: getNow() + file.name
    }
    if (this.props.adminAvatar) {
      config.key = this.props.adminAvatar
    }
    return config
  }

  setDefaultImg = (url) => {
    // 供修改博文时设置封面
    this.setState({
      imageUrl: url
    })
  }

  componentDidMount () {
    if (this.props.avatar) {
      this.setState({
        imageUrl: this.props.avatar
      })
    }
  }

  componentWillUnmount () {
    this.setState = () => {
      return
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { imageUrl, upLoadAction } = this.state
    // eslint-disable-next-line no-unused-vars
    const { avatar, ...rest } = this.props
    return (
      <Upload
        name="file"
        {...rest}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        multiple
        action={upLoadAction}
        data={(file) => this.setUploadConfig(file)}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl}
          alt="avatar"
          style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )
  }
}

export default UploadImg
