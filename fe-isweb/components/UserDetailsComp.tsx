"use client"

import { User } from "@/types/globalStates";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Icons } from "./Icons";
import axios from "axios";
import { signOut } from "next-auth/react";

function UserDetailsComp( props: {user:User}){
    

    const [ user, setUser ] = useState<User>(props.user);
    const [tempUser, setTempUser] = useState<User>(props.user);
    const [ cnfPass, setCnfPass ] = useState<string>("");
    const [ isEditOn, setIsEditOn ] = useState<boolean>(false);
    const EditIcon = Icons["edit"];
    // useEffect(()=>{
    //     setUser(props.user);
    //     setTempUser(props.user);
    // },[])

    const detDiv = "details-row flex my-2";
    const detKey =  "mr-10 w-40 text-lg text-secCl font-medium items-center pt-1";
    const detValI = "px-2 py-1 mx-1 rounded w-96 text-white bg-[#121212] border border-priCl outline-none "
    const detValN = "px-2 py-1 mx-1 rounded w-96 bg-inbg border border-priCl outline-none"

    const UserIcon = Icons["user"];

    function handleChange( e: ChangeEvent<HTMLInputElement>){
        
        setTempUser( tUser => ({...tUser, [e.target.name]:e.target.value }))
    }

    function editDetails(){
        //onCancel
        if ( isEditOn ) {
            setTempUser(user);
            setIsEditOn(false);
        //onEdit
        } else {
            setIsEditOn(true);
        }
    }



    async function handleSubmit() {
        if ( JSON.stringify(user) === JSON.stringify(tempUser) ) {
            alert("No changes were made");
            return;
        }
        const axiosConf = {
            url : process.env.BE_URL+"/apis/user/upduser",
            headers: {
                "token" : user.token
            }
        }

        const resp = await axios.put( axiosConf.url, tempUser, axiosConf );
        if ( resp.data.ok ) {
            window.location.reload();
            signOut();
        } else {
            console.log(resp);
            alert(resp.data.msg);
        }
    }

    return (
        <div className="flex flex-col w-1/2 flex-1  items-center mt-16">


            <div className="proPic rounded-full w-24 h-24 flex justify-center items-center border border-secCl mb-6 overflow-hidden">
                {
                    tempUser.image === "" ?
                        <UserIcon className="w-12 h-12" />:
                        <img className="cover" src={tempUser.image} />
                        // tempUser.image
                }
            </div>
            <div className={detDiv}>
                <p className={detKey} >User ID :</p>
                <input onChange={handleChange} name="userId" className={ detValN } value={tempUser?.userId} disabled ></input>
            </div>
            <div className={detDiv}>
                <p className={detKey}>User Name :</p>
                <input onChange={handleChange}  name="userName" className={  detValN } value={tempUser?.userName} disabled ></input>
            </div>
            <div className={detDiv}>
                <p className={detKey}>Email :</p>
                <input onChange={handleChange}  name="email" className={ isEditOn?  detValI: detValN} value={tempUser?.email} disabled={!isEditOn} ></input>
            </div>
            {
                isEditOn &&
                    <div className={detDiv}>
                        <p className={detKey}>New Image Url :</p>
                        <input onChange={handleChange}  name="image" className={ isEditOn?  detValI: detValN} value={ tempUser.image } disabled={!isEditOn} ></input>
                    </div>
            }
            
            <div className="buttonsDiv flex w-1/2 justify-between mt-6">
                <button className="px-4 py-1 bg-accCl rounded outline-none" onClick={editDetails}>{isEditOn?"Cancel":"Edit Info"}</button>
                <button onClick={handleSubmit} className="px-4 py-1 bg-white text-black rounded outline-none" disabled={!isEditOn} >Save Details</button>
            </div>
        </div>
    );
}

export default UserDetailsComp;