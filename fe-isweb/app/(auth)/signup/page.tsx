import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

function SignUpPage() {
    return (
    <main className="flex-1">
        <div className='flex flex-col justify-center items-center mt-40 '>
            <div className=' flex flex-col max-w-xl'>
                <SignupForm /> 
                <span className='w-xl border-t border-gray-700 my-4' />
                <div className='flex justify-center'><Link href="/login" className='text-neutral-500 underline'>If you have an account already...</Link></div>
            </div>
        </div>
    </main>
    );
}

export default SignUpPage;