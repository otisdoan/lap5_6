"use client"
import { Button, Form, Input, Modal } from "antd"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function FormLogin() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const showModal = () => {
        setIsOpenModal(true);
    }
    const handleCancel = () => {
        setIsOpenModal(false);
    }

    const onFinish = async (values: any) => {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: values.email,
        })
        console.log(data);
    }
    const handleOk = () => {
        setIsOpenModal(false);
    }

    return (
        <>
            <Modal open={isOpenModal} onCancel={handleCancel} onOk={handleOk}>
                <span className="">Vui lòng xác nhận tài khoản ở email của bạn!</span>
            </Modal>
            <div className="">
                <Form
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Email'
                        name={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Email is required!'
                            },
                            {
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Email is not valid!'
                            }
                        ]}

                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" danger onClick={showModal}>Login</Button>
                    </Form.Item>
                    <Form.Item>
                        <div className="text-center">
                            <span>Not Registered Yet? <Link href='/register' className="text-red-600">Register</Link></span>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default FormLogin