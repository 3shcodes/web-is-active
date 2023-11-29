"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignupForm() {
    const [userName,setUserName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [pass,setPass] = useState<string>("");
    const [rePass,setRePass] = useState<string>("");

    const router = useRouter();

    async function handleSignup(){
        if ( pass !== rePass || pass.length<9 ) {
            alert("pass dont match or way less chars");
            return;
        }
        const cont = {
            "userName" : userName,
            "email" : email,
            "password" : pass,
            "image" : ""
        }
        try {
            const resp = await axios.post(`${process.env.BE_URL}/apis/auth/signup`, cont );
            console.log(resp)
            if ( resp.data.ok ) {
                router.push("/login")
            } else {
                alert("signup unsuccessful");
            }
            
        } catch (error) {
            console.log(error);
        }



    }

    return (
        <div className='flex flex-col max-w-xl '>
        
            <p className='text-3xl mb-6 '>Signup</p>
            <input placeholder='Enter an Username' onChange={(e)=>setUserName(e.target.value)} type='text' className='px-2 py-1 mb-4 rounded-md bg-neutral-300 dark:bg-neutral-800'></input>
            <input placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} type='text' className='px-2 py-1 mb-4 rounded-md bg-neutral-300 dark:bg-neutral-800'></input>
            <input placeholder='New Password' onChange={(e)=>setPass(e.target.value)} type='password' className='px-2 py-1 mb-4 rounded-md bg-neutral-300 dark:bg-neutral-800'></input>
            <input placeholder='Confirm Password' onChange={(e)=>setRePass(e.target.value)} type='password' className='px-2 py-1 mb-4 rounded-md bg-neutral-300 dark:bg-neutral-800'></input>
            <div className='flex w-full justify-end items-end content-center'>
                <button onClick={handleSignup} className='bg-black dark:bg-white text-white dark:text-black min-w-[100px] rounded py-2  w-20  place-items-end '>Sign Up</button>
            </div>
            
        </div>
    )

}


export default SignupForm;
