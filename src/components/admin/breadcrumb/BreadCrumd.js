import React from 'react'
import { Breadcrumb } from 'antd';
export default function BreadCrumd({title, subtitle}) {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
            <Breadcrumb.Item>{subtitle}</Breadcrumb.Item>
        </Breadcrumb>
    )
}
