"use client"

import {signOut} from "next-auth/react";

function LogoutButton({cname}:{cname:string}){
    return (
        <button className={cname} onClick={()=>signOut()}>Logout</button>
    )
}


export default LogoutButton;
