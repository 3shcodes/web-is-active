"use client"
import { Site, User } from "@/types/globalStates";
import Link from "next/link";
import { Icons } from "./Icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SiteComp( props:{site:Site , user:User, remFromArr:Function} ){
    //site user remFromArr
    const user = props.user;
    const remFromArr = props.remFromArr;
    const [site, setSite] = useState(props.site);

    const absUrl = "http://"+site.url;
    const RefreshIcon = Icons["refresh"];
    const DelIcon = Icons["delete"];
    

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const router = useRouter();
    async function refreshSite(){
        setIsLoading(true);

        console.log("ss")
        const reqConf = {
            method : "PUT",
            url : process.env.BE_URL+"/apis/user/updsite?siteName=" + site.siteName,
            headers : { 'token' : user.token }
        }

        const resp = await fetch( reqConf.url, reqConf);
        // console.log(resp);
        setIsLoading(false);
        if ( resp.ok ) {
            const data = await resp.json();
            setSite(data.data);
            router.push("/dashboard");
        } else {
            console.log(resp)
        }
    }

    async function removeSite() {
        const reqConf = {
            method : "PUT",
            // url : "http://localhost:1234/apis/user/updsite?siteName=" + site.siteName ,
            url : `${process.env.BE_URL}/apis/user/delsite?siteName=${ site.siteName }&userName=${user.userName} `,
            headers : { 'token' : user.token }
        }

        const resp = await fetch( reqConf.url, reqConf);
        console.log(resp);
        setIsLoading(false);
        if ( resp.ok ) {
            remFromArr(site.siteId);
            router.push("/dashboard");
        } else {
            console.log(resp)
        }
        
    }


    return (
        <div className="border border-priCl flex justify-between rounded px-6 py-4 mb-4">
            <div className="flex flex-col">
                <p className="text-xl mb-1 font-bold">{site.siteName}</p>
                <Link href={absUrl} target="_blank" className="text-sm text-secCl">{absUrl}</Link>
                <p className="text-md mt-2 text-md"> Last Checked: <span className="text-sm  text-secCl ml-1">{site.lastTime}</span></p>
                <p className="text-md      text-md"> Last Status: <span className="text-sm text-secCl  ml-1">{site.lastStat}</span></p>
                {
                    site.issue===""?
                    <></>:
                    <p className="text-md      text-md"> Issue: <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">{site.issue}</span></p>
                }
                {/* <p>{user.token}</p> */}
            </div>
            <div className="buttons flex items-center">
                <div className={isLoading ? "spinner" : ""}>
                    <button onClick={ refreshSite } disabled={isLoading}><RefreshIcon className="mx-2"/></button>
                </div>
                <button onClick={ removeSite }><DelIcon className="mx-2"/></button>
            </div>

        </div>
        
    )
}

export default SiteComp;
