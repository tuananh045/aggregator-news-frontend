import { Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export default function CommonForm(props) {
    const { fields, openModal, handleSubmit, onCloseModal, item } = props;
    const [data, setData] = useState({});

    useEffect(() => {
        if (item.id) {
          setData(item);
        } else {
          setData({});
        }
      }, [item]);

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value,
        });
      };
    return (
        <Modal
            title={item?.id ? 'Cập nhật' : 'Thêm mới'}
            centered
            visible={openModal}
            onOk={() => handleSubmit(data)}
            onCancel={onCloseModal}
        >
            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                {
                    fields.filter(field => field.hide === false).map((field) => {
                        return (
                            <Form.Item
                                key={field.dataIndex}
                                label={field.title}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input placeholder={field.title} name={field.dataIndex} value={data[field.dataIndex]} onChange={handleChange} />
                            </Form.Item>
                        )
                    })
                }

            </Form>
        </Modal>
    )
}
