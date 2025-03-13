"use client"
import { Button, Form, Input, message, Modal } from "antd"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function FormLogin() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: any) => {
        const { data, error } = await supabase.auth.signInWithPassword(values)
        console.log(error);
        console.log(data);
        if (!error) {
            router.push('/')
        } else {
            messageApi.open({
                type: 'error',
                content: 'Email or Password sai!',
                duration: 3
            });
        }
    }
    return (
        <>
            {contextHolder}
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
                    <Form.Item
                        label='Password'
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                message: 'Email is required!'
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" danger>Login</Button>
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