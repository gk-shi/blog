import React from 'react'
import { Menu } from 'antd'
import styles from './Unread.less'


const Unread = (unreads, fn) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.read}>
        <a href="void:;"
          onClick={() => fn('all')}>全部已读</a>
      </div>
      <div style={{ display: unreads.length !== 0 ? 'none' : '' }}
        className={styles['no-message']}>没有信息</div>
      <Menu style={{ display: unreads.length === 0 ? 'none' : '' }}
        className={styles['message-sub']}>
        {unreads.map((item, idx) => {
          return (
            <Menu.Item key={item._id}>
              {item.id ?
                <p onClick={() => fn(idx)}
                  className={styles.message}>{`${item.created_time} ${item.nickname} `}评论了《<a href="void:;">{item.title}</a>》</p>
                :
                <p onClick={() => fn(idx)}
                  className={styles.message}>{`${item.created_time} ${item.nickname} `}给你留言</p>}
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}

export default Unread
