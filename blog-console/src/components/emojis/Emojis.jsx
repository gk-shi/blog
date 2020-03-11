import React from 'react'
import Picker from 'emoji-picker-react'

const Emojis = (props) => {

  const onEmojiClick = (event, emojiObject) => {
    props.emojiSelect(emojiObject.emoji)
    event.stopPropagation()
  }

  return (
    <div>
      <Picker include={['people']}
        onEmojiClick={onEmojiClick}/>
    </div>
  )
}

export default Emojis