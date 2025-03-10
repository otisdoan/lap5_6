"use client"
import Header from "@/components/Header";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function Profiles() {
    const router = useRouter();
    const dateFormat = 'DD/MM/YYYY';
    const [profile, setProfile] = useState(null);
    const [form] = Form.useForm();

    const handleUpdate = () => {
        router.push('/update-profiles');
    };

    const items = [
        { key: '1', label: 'Female', value: 'Female' },
        { key: '2', label: 'Male', value: 'Male' }
    ];

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
                email: profile.email || "",
                name: profile.name || "",
                gender: profile.gender || "Female",
                hobby: profile.hobby || "",
                born: profile.born ? dayjs(profile.born) : null,
                address: profile.address || ""
            });
        }
    }, [profile, form]);

    return (
        <>
            <Header />
            <div className="px-[100px] mt-[30px]">
                <h1 className="font-bold text-[1.5rem] mb-[30px]">Profiles</h1>
                <Form
                    form={form}
                    onClick={() => { }}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Form.Item label="Name" name="name">
                        <Input disabled />
                    </Form.Item>
                    <div className="flex gap-x-4">
                        <Form.Item label="Gender" name="gender" className="w-1/2">
                            <Select options={items} disabled/>
                        </Form.Item>
                        <Form.Item label="Hobby" name="hobby" className="w-1/2">
                            <Input disabled />
                        </Form.Item>
                    </div>
                    <Form.Item label="Born" name="born">
                        <DatePicker format={dateFormat} disabled/>
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input disabled />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Form.Item>
                            <Button type="primary" danger onClick={handleUpdate}>Update</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default Profiles;
