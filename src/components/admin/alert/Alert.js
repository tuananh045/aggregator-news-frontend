import React from 'react'
import { Modal, Button, Space } from 'antd';

export default function Alert({ title, handleDeleteItem }) {
    return (
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
            onOk: () => {
                handleDeleteItem();
            }
        })
    )
}
