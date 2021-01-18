import React from 'react'
import { Menu, Icon } from 'antd'
import Link from 'umi/link'

const { SubMenu } = Menu


const menuItem = menu => {
  return (
    <Menu.Item key={menu.key}>
      <Link to={menu.to}>
        {menu.iconType ? <Icon type={menu.iconType} /> : <></>}
        <span>{menu.text}</span>
      </Link>
    </Menu.Item>
  )
}

const subMenu = menu => {
  return (
    <SubMenu key={menu.key}
      title={
        <span>
          {menu.iconType ? <Icon type={menu.iconType} /> : <></>}
          <span>{menu.text}</span>
        </span>
      }>
      {menu.subMenu.map(sub => {
        return (
          <Menu.Item key={sub.key}>
            <Link to={sub.to}>
              <span>{sub.text}</span>
            </Link>
          </Menu.Item>
        )
      })}
    </SubMenu>
  )
}

const SideMenu = (defaultMenu, onOpenChange, openKeys, menuConfig) => {
  return (
    <Menu
      defaultSelectedKeys={[defaultMenu]}
      mode="inline"
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      theme="dark"
    >
      {menuConfig.map(menu => {
        if (!menu.subMenu || menu.subMenu.length === 0) {
          return menuItem(menu)
        }
        return subMenu(menu)
      })}
    </Menu>
  )
}

export default SideMenu
