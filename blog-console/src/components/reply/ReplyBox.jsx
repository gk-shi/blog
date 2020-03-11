import React, { Component } from 'react'
import { Button, Input, Icon  } from 'antd'
import styles from './ReplyBox.less'
import Emojis from '../emojis/Emojis'

const { TextArea } = Input

class ReplyBox extends Component {
  state = {
    showEmojis: false,
    windowClickHandler: () => {
      this.setShowEmojis(false)
    }
  }

  setShowEmojis = (show) => {
    this.setState({
      showEmojis: show
    })
  }

  changeEmojisBox = (e, show) => {
    e.persist()
    e.nativeEvent.stopPropagation()
    this.setShowEmojis(show)
  }

  componentDidMount () {
    window.addEventListener('click', this.state.windowClickHandler, false)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.state.windowClickHandler)
  }

  render() {
    const { showEmojis } = this.state
    const { textArea, textOnChange, emojiSelect, toSubmit } = this.props
    return (
      <div className={styles.reply}>
        <TextArea
          value={textArea}
          onChange={textOnChange}
          rows={4} />
        <div className={styles.tools}>
          <div className="emojis-r">
            <Icon type="smile"
              onClick={(e) => this.changeEmojisBox(e, !showEmojis)}
              className={styles.smile} />
            <div className="emojis-box"
              style={{
                display: showEmojis ? 'block' : 'none'
              }}>
              <Emojis emojiSelect={emojiSelect} />
            </div>
          </div>
          <Button type="primary"
            onClick={toSubmit}>发布</Button>
        </div>
      </div>
    )
  }
}

export default ReplyBox