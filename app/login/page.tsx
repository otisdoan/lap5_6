"use client"

import FormLogin from "@/components/Forms/FormLogin";

function Login() {
    return (
        <>
            <div className=" h-[100vh] w-full flex items-center justify-center">
                <div className="w-[500px]">
                    <h1 className="text-[1.5rem] font-bold mb-[30px]">Login to your account</h1>
                    <FormLogin />
                </div>
            </div>
        </>
    )
}
export default Login;