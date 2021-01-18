
import React from 'react'
import { Modal } from 'antd'

export default function (props) {
  return (
    <div>
      <Modal
        title={props.title}
        visible={props.visible}
        confirmLoading={props.confirmLoading}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <p>{props.children}</p>
      </Modal>
    </div>
  )
}
