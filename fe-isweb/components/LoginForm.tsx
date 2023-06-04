"use client"
import {signIn} from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

function LoginForm() {
    const [userName,setUserName] = useState<string>("");
    const [pass,setPass] = useState<string>("");


    function handleLogin() {
            signIn("credentials", { username : userName, password: pass, callbackUrl: "/dashboard" })
        }
    return (
        <div className='flex flex-col max-w-xl '>
        
            <p className='text-3xl mb-6 '>Login</p>
            <input placeholder='Username' onChange={(e)=>setUserName(e.target.value)} type='text' className='px-2 py-1 mb-4 rounded-md bg-neutral-300 dark:bg-neutral-800'></input>
            <input placeholder='Password' onChange={(e)=>setPass(e.target.value)} type='password' className='px-2 py-1 mb-4 rounded-md bg-neutral-300 dark:bg-neutral-800'></input>
            <div className='flex w-full justify-between items-center content-center'>
                <Link href='/signup' className='pl-1 text-neutral-500 text-sm'>Forgot Password?</Link>
                <button onClick={handleLogin} className='bg-black dark:bg-white text-white dark:text-black min-w-[100px] rounded py-2  w-20  place-items-end '>Sign In</button>
            </div>
            {/* <input className=" border-2 border-purple-300 mx-5 focus:outline-none" value={ userName } onChange={(e)=>setUserName(e.target.value)} type="text" name="userName" placeholder="User Name"></input>
            <input className=" border-2 border-purple-300 mx-5 focus:outline-none" value={ pass } onChange={(e)=>setPass(e.target.value)} type="password" name="userPass" placeholder="Password"></input>
            <button onClick={handleLogin}>Sign In</button> */}
        </div>
    )

}


export default LoginForm;
