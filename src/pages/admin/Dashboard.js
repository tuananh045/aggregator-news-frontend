import { Content } from 'antd/lib/layout/layout'
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd'
import React from 'react'

export default function Dashboard() {
  return (
    <Content style={{ margin: '0 16px' }}>
      <BreadCrumd title='Dashboard' />
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        
      </div>
    </Content>
  )
}
