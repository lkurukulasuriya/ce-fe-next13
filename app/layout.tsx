'use client'

import React, { useState } from 'react'
import {
  HomeOutlined,
  TeamOutlined,
  ShopOutlined,
  SkinOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link href='/'>Home</Link>, '1', <HomeOutlined />),
  getItem(<Link href='/orders'>Orders</Link>, '2', <ShopOutlined />),
  getItem('Products', '3', <SkinOutlined />),
  getItem('Teams', '4', <TeamOutlined />, [
    getItem('Team 1', '5'),
    getItem('Team 2', '6'),
  ]),
  getItem('Settings', '7', <SettingOutlined />),
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                height: 32,
                margin: 16,
              }}
            >
              {!collapsed && (
                <Image
                  src='/logo.svg'
                  alt='ChannelEngine Logo'
                  width={150}
                  height={30}
                  priority
                />
              )}
            </div>
            <Menu
              theme='dark'
              defaultSelectedKeys={['1']}
              mode='inline'
              items={items}
            />
          </Sider>
          <Layout className='site-layout' style={{ color: 'red' }}>
            <Header style={{ paddingLeft: 20, background: colorBgContainer }}>
              <h2>Merchant Dashboard</h2>
            </Header>
            <Content style={{ margin: '0 16px', padding: '32px 0' }}>
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Created for the ChannelEngine Assignement
            </Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  )
}
