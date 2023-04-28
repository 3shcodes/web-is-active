"use client"
import { useState } from "react";

function LoginPage() {
    
    const [userName,setUserName] = useState<string>("");
    const [pass,setPass] = useState<string>("");
    function handleLogin(){
        
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