"use client"

import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function Todos() {
    const router = useRouter();
    const [dataTodos, setDataTodos] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [idTodos, setIdTodos] = useState<any>();
    const [todosUpdate, setTodosUdate] = useState<any>();
    const [form] = Form.useForm();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Desciptions',
            dataIndex: 'description'
        },
        {
            title: 'Process',
            dataIndex: 'is_completed',
            render: (_: any, record: any) => (
                record.is_completed === 'done'
                    ? <div className="text-green-500">Done</div>
                    : <div className="text-red-600">To do</div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-x-4">
                    <div className="">
                        <Button className="" type="default" onClick={() => handleDelete(record.id)}>Delete</Button>
                    </div>
                    <div className="">
                        <Button className="" type="primary" danger onClick={() => handleUpdate(record.id, record.title, record.description, record.is_completed)}>Update</Button>
                        <Modal open={isModalOpen} onCancel={handleCancel} okText='Save' onOk={handleOk}>
                            <div className="flex justify-center mb-[100px]">
                                <div className="mt-[50px]">
                                    <h1 className="text-[2rem] font-bold text-center mb-[20px]">Update công việc</h1>
                                    <Form
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        form={form}
                                        onValuesChange={handleChange}
                                    >
                                        <Form.Item
                                            label={'Title'}
                                            name={'title'}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label={'Descriptions'}
                                            name={'description'}
                                        >
                                            <Input.TextArea rows={4} />
                                        </Form.Item>

                                        <Form.Item
                                            label={'Process'}
                                            name={'is_completed'}
                                        >
                                            <Select
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
                                    </Form>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        }
    ]
    const handleCreate = async () => {
        router.push('/create-todos');
    }

    const handleDelete = async (id: any) => {
        const response = await supabase
            .from('todos')
            .delete()
            .eq('id', id)
        if (response) {
            messageApi.open({
                type: 'success',
                content: 'Xóa thành công',
            });
        }

    }

    const handleUpdate = async (id: any, title: any, description: any, process: any) => {
        setIdTodos(id);
        setIsModalOpen(true);
        form.setFieldsValue({
            title: title || '',
            description: description || '',
            is_completed: process || ''
        })
    }

    const handleChange = async (_: any, allValues: any) => {
        setTodosUdate(allValues);
    }

    const handleOk = async () => {
        const { error } = await supabase
            .from('todos')
            .update(todosUpdate)
            .eq('id', idTodos)
        if (!error) {
            setIsModalOpen(false);
            messageApi.open({
                type: 'success',
                content: 'Cập nhập thành công',
            });
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const { data: todos, error } = await supabase
                .from('todos')
                .select('*')

            if (todos) {
                setDataTodos(todos)
            }
        }
        fetchTodos();
    }, [dataTodos])
    return (
        <>
            {contextHolder}
            <div className="mt-[50px] px-[100px] mb-[50px]">
                <h1 className="text-[2rem] font-bold mb-[20px] text-center">Các công việc trong ngày</h1>
                <Button type="primary" className="mb-[20px]" onClick={handleCreate}>Create</Button>
                <Table columns={columns} dataSource={dataTodos} pagination={false} />
            </div>
        </>
    )
}
export default Todos;