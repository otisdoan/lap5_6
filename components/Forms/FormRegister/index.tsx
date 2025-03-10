"use client"
import { Button, Form, Input, message } from "antd"
import Link from "next/link";
import { createClient } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";

function FormRegister() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

    const onFinish = async (values: any) => {
        const { data, error } = await supabase.auth.signUp(values);

        if (!error) {
            messageApi.open({
                type: 'success',
                content: 'Register successfully',
                duration: 1000
            });
            setTimeout(() => {
                router.push('/login')
            }, 1000)
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
                                message: 'Password is required!'
                            },
                        ]}

                    >
                        <Input type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" danger>Register</Button>
                    </Form.Item>
                    <Form.Item>
                        <div className="text-center">
                            <span>Already have an account? <Link href='/login' className="text-red-600">Log in</Link></span>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default FormRegister;