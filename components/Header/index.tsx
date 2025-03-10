"use client";
import { Avatar, Dropdown, Input, message } from "antd";
import { IoLogOutSharp } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ImProfile } from "react-icons/im";
import { IoHome } from "react-icons/io5";
import { useEffect, useState } from "react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function Header() {
    const router = useRouter();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            router.push("/login");
        }
    };

    const items = [
        {
            key: "home",
            icon:  <IoHome />,
            label: <span onClick={() => router.push('/')}>Home</span>
        },
        {
            key: "profiles",
            icon: <ImProfile />,
            label: <span onClick={() => router.push('/profiles')}>My profiles</span>
        },
        {
            key: "logout",
            icon: <IoLogOutSharp />,
            label: <span onClick={handleLogout}>Log out</span>,
        }
    ];

    return (
        <div className="flex justify-between px-[100px] py-4 items-center border-[1px]">
        <Input placeholder="Search..." className="w-1/3" />
        <Dropdown menu={{ items }} placement="bottomRight">
          <Avatar icon={<UserOutlined />} className="cursor-pointer" />
        </Dropdown>
      </div>
    )
}

export default Header;
