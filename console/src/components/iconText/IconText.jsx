import React from 'react'
import { Icon } from 'antd'
const IconText = ({ type, text, ...rest }) => (
  <span {...rest}>
    <Icon style={{ marginRight: 8 }}
      type={type} />
    {text}
  </span>
)

export default IconText