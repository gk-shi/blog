import React from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd'
import { getTagsService, addTagService, deleteTagService } from '../../services/request'
import ModalCom from '../modal/Modal'
import { openNotificationWithIcon } from '../notification/Notification'
import styles from './Tag.less'


class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    selected: [],
    visible: false,
    id: ''
  }

  getExistTags = async () => {
    try {
      const ret = await getTagsService()
      this.setState({
        tags: [...ret.data]
      })
    } catch (error) {
      openNotificationWithIcon('error', '获取标签失败！', error.response.data.error)
    }
  }

  handleClose = id => {
    console.log(id)
    this.setState({
      visible: true,
      id
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = async () => {
    const { inputValue } = this.state
    let { tags } = this.state
    try {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        const ret = await addTagService(inputValue)
        tags = [...tags, ret.data]
      }
    } catch (error) {
      openNotificationWithIcon('error', '添加标签失败！', error.response.data.error)
    } finally {
      this.setState({
        tags,
        inputVisible: false,
        inputValue: ''
      })
    }


  }

  saveInputRef = input => (this.input = input)

  selectTag = (tag) => {
    const newSelected = this.state.selected
    const idx = this.state.selected.indexOf(tag)
    if (idx !== -1) {
      newSelected.splice(idx, 1)
    } else {
      newSelected.push(tag)
    }
    this.setState({
      selected: [...newSelected]
    })
    this.props.getTag(newSelected)
  }

  setModal = (visible) => {
    this.setState({
      visible
    })
  }

  onOk = async () => {
    this.setModal(false)
    const { id, tags } = this.state
    try {
      await deleteTagService(id)
      const nTags = tags.filter(tag => tag._id !== id)
      this.setState({
        tags: nTags
      })
    } catch (error) {
      openNotificationWithIcon('error', '删除标签失败！', error.response.data.error)
    }
  }

  onCancel = () => {
    this.setModal(false)
  }

  componentDidMount () {
    this.getExistTags()
  }

  render() {
    const { tags, inputVisible, inputValue, selected, visible } = this.state
    return (
      <div className={styles['tag-wrapper']}>
        {tags.map((item) => {
          const isLongTag = item.tag && item.tag.length > 20
          const tagElem = (
            <Tag key={item._id}
              className={selected.includes(item.tag) ? styles.selected : ''}
              closable="true"
              onClick={() => this.selectTag(item.tag)}
              onClose={() => this.handleClose(item._id)}>
              {isLongTag ? `${item.tag.slice(0, 20)}...` : item.tag}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={item.tag}
              key={item._id}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> 新加标签
          </Tag>
        )}
        <ModalCom title="操作提示"
          visible={visible}
          handleOk={() =>this.onOk()}
          handleCancel={() => this.onCancel()} >确认删除？</ModalCom>
      </div>
    )
  }
}

export default EditableTagGroup
