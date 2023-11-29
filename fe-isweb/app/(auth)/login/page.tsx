import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

function LoginPage(){

    // const [userName,setUserName] = useState<string>("");
    // const [pass,setPass] = useState<string>("");
    //
    // function handleLogin(){
    //     signIn("credentials",{ username : userName, password : pass , callbackUrl : "/dashboard"})
    // }

    return (
    <main className="flex-1">
        <div className='flex flex-col justify-center items-center mt-60 '>
            <div className=' flex flex-col max-w-xl'>
                <LoginForm /> 
                <span className='w-xl border-t border-gray-700 my-4' />
                <div className='flex justify-center'><Link href="/signup" className='text-neutral-500 underline'>{"Create an account if you don't have one"}</Link></div>
            </div>
        </div>
    </main>
    );
}

// <p>Login Page</p>
// <input className=" border-2 border-purple-300 mx-5 focus:outline-none" value={ userName } onChange={(e)=>setUserName(e.target.value)} type="text" name="userName" placeholder="User Name"></input>
// <input className=" border-2 border-purple-300 mx-5 focus:outline-none" value={ pass } onChange={(e)=>setPass(e.target.value)} type="password" name="userPass" placeholder="Password"></input>
// <button onClick={handleLogin}>Login</button>
export default LoginPage;
