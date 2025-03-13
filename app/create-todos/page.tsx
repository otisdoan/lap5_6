"use client";
import Header from "@/components/Header";
import { Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Footer from "@/components/Footer";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function CreateTodos() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: any) => {
        const { error } = await supabase
            .from('todos')
            .insert({
                title: values.title,
                description: values.description,
                is_completed: values.is_completed
            })
        if (!error) {
            messageApi.open({
                type: 'success',
                content: 'Thêm thành công',
            });
            setTimeout(() => {
                router.push('/');
            }, 1000)
        }
    }
    const handleCancel = () => {
        router.push('/')
    }
    return (
        <>
            <Header />
            {contextHolder}
            <div className="flex justify-center mb-[100px]">
                <div className="mt-[50px] w-1/3">
                    <h1 className="text-[2rem] font-bold text-center">Thêm công việc</h1>
                    <Form
                        onFinish={onFinish}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Form.Item
                            label={'Title'}
                            name={'title'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Title is required'
                                }
                            ]}
                        >
                            <Input placeholder="Title" />
                        </Form.Item>

                        <Form.Item
                            label={'Descriptions'}
                            name={'description'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Descriptions is required'
                                }
                            ]}
                        >
                            <Input.TextArea placeholder="Descriptions..." rows={4} />
                        </Form.Item>

                        <Form.Item
                            label={'Process'}
                            name={'is_completed'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Process is required'
                                }
                            ]}
                        >
                            <Select
                                placeholder='Chọn process'
                                options={[
                                    {
                                        value: 'to do',
                                        label: 'To do'
                                    },
                                    {
                                        value: 'done',
                                        label: 'Done'
                                    }
                                ]}
                            />
                        </Form.Item>
                        <div className="flex items-center gap-x-4 justify-end">
                            <Form.Item>
                                <Button type="default" onClick={handleCancel}>Cancel</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary" danger>Save</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default CreateTodos;