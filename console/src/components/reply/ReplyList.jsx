import React from 'react'
import { List, Avatar } from 'antd'

class ReplyList extends React.Component {

  preFixAvatar = (imgUrl) => {
    if (/https?:\/\//ig.test(imgUrl)) return imgUrl
    return `${process.env.UMI_APP_IMG}/avt/${imgUrl.split('-')[1]}`
  }

  render() {
    const { toReplyPerson, list } = this.props
    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <a href="void:;"
                key="list-loadmore-reply"
                onClick={() => toReplyPerson(item.username)}>回复</a>,
              <a href="void:;"
                key="list-loadmore-del"
                onClick={() => this.props.toDelete(item._id)}>删除</a>]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={this.preFixAvatar(item.avt)} />
              }
              title={
                <span style={{ color: item.is_admin ? '#ff8c00' : '' }}>{item.username}</span>
              }
              description={
                <>
                  <p
                    className="markdown-body"
                    style={{ margin: '5px 0', color: '#000000' }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></p>
                  <span>{item.created_time}</span>
                </>
              }
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ReplyList