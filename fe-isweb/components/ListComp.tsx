"use client"
import { Response, Site, User } from "@/types/globalStates";
import Link from "next/link";
import { Icons } from "./Icons";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";


function ListComp( {site, user}:{site:Site , user:User} ){
    const absUrl = "http://"+site.url;
    const AddIcon = Icons["add"];


    const router = useRouter();
    

    async function addExistingSite() {
        const reqConf = {
            url : "http://localhost:1234/apis/user/addosite?userName=" + user.userName + "&siteName=" + site.siteName,
            headers : { "token" : user.token }
        }

        try {

            const resp = await axios.put(reqConf.url,{},reqConf);
            console.log(resp);
            alert( "Site added successfully");
            router.refresh();
            router.push("/dashboard")
        } catch(err){
            const error = err as AxiosError;
            // console.log(error);
            
            const resp = error.response?.data as Response;
            console.log(resp.err);
            
            alert(resp.err);
        }
        
        
        return;
    }


    return (
        <div className="border border-priCl flex justify-evenly items-center rounded  py-4 mb-4">
            <p className="text-priCl">{site.siteId}</p>
            <p className="text-xl  font-bold w-2/6 pl-8">{site.siteName}</p>
            <Link href={absUrl} target="_blank" className=" w-2/6 text-sm text-secCl">{absUrl}</Link>
            <p className="text-sm text-slate-400 w-1/6">{site.lastStat}</p>
            {

            }
            <AddIcon className="cursor-pointer" onClick={addExistingSite} />
        </div>
        
    )
}

export default ListComp;
