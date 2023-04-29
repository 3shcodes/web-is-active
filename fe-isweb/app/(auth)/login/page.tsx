"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import userSlice from "@/redux/slices/userSlice";
import { authUtils } from "@/utils/authUtils";

function LoginPage() {

    const router = useRouter();
    let user: User | null = useAppSelector(state => state.user);
    user = ( user === null ? authUtils.checkUserExists() : user );
     
    if ( user!==null ){
        router.push("/dashboard");
    }

    const dispatch = useAppDispatch();
    
    const [userName,setUserName] = useState<string>("");
    const [pass,setPass] = useState<string>("");

    async function handleLogin(){
        try {
            const resp = await axios.post("http://localhost:1234/apis/auth/login", { "user_name" : userName, "password" : pass });
            console.log(resp);
            if ( resp.data.ok ) {
                localStorage.setItem("user",JSON.stringify(resp.data.user));
                dispatch(userSlice.actions.loggedIn(resp.data.user));
                console.log("login successful");
                router.push("/dashboard");
            }
        } catch (error) {
            throw error;
        }
    }
    return (
    <div className="loginPage min-h-screen mx-20">
        <p>Login Page</p>
        <input className=" border-2 border-purple-300 mx-5 focus:outline-none" value={ userName } onChange={(e)=>setUserName(e.target.value)} type="text" name="userName" placeholder="User Name"></input>
        <input className=" border-2 border-purple-300 mx-5 focus:outline-none" value={ pass } onChange={(e)=>setPass(e.target.value)} type="password" name="userPass" placeholder="Password"></input>
        <button onClick={handleLogin}>Login</button>
    </div>
    );
}

export default LoginPage;