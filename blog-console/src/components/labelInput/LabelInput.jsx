import React from 'react'
import { Input } from 'antd'
import './LabelInput.less'

const LabelInput = ({ label, type = 'text', ...rest }) => (
  <div className="label-input"
    style={{ width: '100%' }}>
    <label>
      <span>{label}</span>
      <Input className="l-input"
        type={type}
        {...rest} />
    </label>
  </div>
)

export default LabelInput
