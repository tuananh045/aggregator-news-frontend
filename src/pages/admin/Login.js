import React from 'react'
import { Form, Input, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
// import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from 'redux/actions/AuthActions';
export default function Login() {

    const history = useNavigate();
    const dispatch = useDispatch();

    // try {
    //     const res = await axios.post(`/api/auth/login`, values);
    //     // message.success(res.data.message)
    //     console.log(res.data);
    //     const token = res.data.token;
    //     const username = res.data.username;
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('username', username);
    //     history('/admin/dashboard')
    // } catch (err) {
    //     // message.error(err.response.data.message)
    //     console.log(err);
    // }

    const onFinish = (values) => {
        dispatch(login(values, history));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container">
            <div className="row align-items-center justify-content-center" style={{ padding: '50px 0 0 0' }}>
                <div className="col-lg-6 col-sm-12">
                    <div style={{ textAlign: 'center' }}>
                        <Title>Đăng nhập</Title>
                    </div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'email không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu không được để trống!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
