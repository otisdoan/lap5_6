import FormRegister from "@/components/Forms/FormRegister";

function Register() {
    return (
        <>
            <div className="h-[100vh] w-full flex items-center justify-center mx-auto container">
                <div className="w-[500px]">
                    <h1 className="text-[1.5rem] font-bold mb-[30px]">Create an Account</h1>
                    <FormRegister />
                </div>
            </div>
        </>
    )
}
export default Register;