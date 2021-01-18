/**
 * title: 博客控制台
 */
import React from 'react'
// import styles from './index.css'
import Redirect from 'umi/redirect'

export default function(props) {
  if (props.location.pathname === '/login')
    return <Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname } }} />
  return <Redirect to="/list" />
}
