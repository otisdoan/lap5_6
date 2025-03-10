"use client"
import Header from "@/components/Header";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);
function UpdateProfiles() {
    const dateFormat = 'DD/MM/YYYY';
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const { error } = await supabase
            .from('profiles')
            .update({
                name: values.name,
                gender: values.gender,
                hobby: values.hobby,
                born: values.born,
                address: values.address
            })
            .eq('email', values.email)
        if (!error) {
            messageApi.open({
                type: 'success',
                content: 'Update successfullly',
            });
        }
        setTimeout(() => {
            router.push('/profiles')
        }, 1500)
    }
    const items = [
        {
            key: '1',
            label: 'Female',
            value: 'Female'
        },
        {
            label: 'Male',
            value: 'Male'
        }
    ]
    const handleCancel = () => {
        router.push('/profiles');
    }
    useEffect(() => {
        const fetchProfiles = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .limit(1);

            if (!error && data.length > 0) {
                setProfile(data[0]);
            }
        };
        fetchProfiles();
    }, []);
    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                email: profile.email || ''
            })
        }
    }, [profile, form])
    return (
        <>
            <Header />
            {contextHolder}
            <div className="px-[100px] mt-[30px]">
                <h1 className="font-bold text-[1.5rem] mb-[30px]">Profiles</h1>
                <Form
                    labelCol={{
                        span: 24
                    }}
                    wrapperCol={{
                        span: 24
                    }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label={'Name'}
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Name is required'
                            }
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <div className="flex gap-x-4">
                        <Form.Item
                            label={'Gender'}
                            name={'gender'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Gender is required'
                                }
                            ]}
                            className="w-1/2"
                        >
                            <Select options={items} defaultValue={'Female'} />
                        </Form.Item>

                        <Form.Item
                            label={'Hobby'}
                            name={'hobby'}
                            className="w-1/2"
                        >
                            <Input placeholder="Hobby   " />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label={'Born'}
                        name={'born'}
                        rules={[
                            {
                                required: true,
                                message: 'Born is required'
                            }
                        ]}
                    >
                        <DatePicker format={dateFormat} />
                    </Form.Item>
                    <Form.Item
                        label={'Address'}
                        name={'address'}
                        rules={[
                            {
                                required: true,
                                message: 'Address is required'
                            }
                        ]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                        label={'Email'}
                        name={'email'}
                    >
                        <Input disabled />
                    </Form.Item>
                    <div className="flex justify-end">
                        <div className="flex gap-4">
                            <Form.Item>
                                <Button type="default" danger onClick={handleCancel}>Cancel</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" danger>Save</Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default UpdateProfiles;