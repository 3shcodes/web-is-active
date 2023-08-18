"use client"
import { ChangeEvent, useEffect, useState } from "react";
import Router from "next/router";
import axios, { AxiosError } from "axios";
import { Response, User } from "@/types/globalStates";
import { useRouter } from "next/navigation";


interface AuthProps {
    user : User
}


function AddSiteForm( {user} : AuthProps ) {


    const [siteName, setSiteName] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [siteNAvail, setSiteNAvail] = useState("");
    const [siteUAvail, setSiteUAvail] = useState("");

    const router  = useRouter();

    
    async function handleSiteNameChange (e:ChangeEvent<HTMLInputElement>) {

        setSiteName(e.target.value);
        if( e.target.value === "" ) {
            setSiteNAvail("");
            return;
        }
        const axiosConf = {
            url : process.env.BE_URL+"/apis/user/checksn?siteName=" + e.target.value,
            headers : { "token" : user.token },
        }

        const resp = await axios.get(axiosConf.url, axiosConf);
        if ( resp.data.ok ) {
            resp.data.msg === "SiteName available" ? setSiteNAvail("Available") : setSiteNAvail("Unavailable");
            // setSiteAvail( resp.data.msg );
        } else {
            alert("internal server error")
        }
    }



    async function handleSiteUrlChange (e:ChangeEvent<HTMLInputElement>) {
        // setSiteName(e.target.value);
        // setSiteAvail("");

        setSiteUrl(e.target.value);
        if( e.target.value === "" ) {
            setSiteUAvail("");
            return;
        }
        const axiosConf = {
            url : process.env.BE_URL+"/apis/user/checksu?siteUrl=" + e.target.value,
            headers : { "token" : user.token },
        }

        const resp = await axios.get(axiosConf.url, axiosConf);
        if ( resp.data.ok ) {
            resp.data.msg === "SiteName available" ? setSiteUAvail("Available") : setSiteUAvail("Unavailable");
            // setSiteAvail( resp.data.msg );
        } else {
            alert("internal server error")
        }
    }

    async function addSiteButt () {
        if ( siteUAvail==="Available" &&  siteNAvail==="Available") {
            const axiosConf = {
                url : `${process.env.BE_URL}/apis/user/addnsite?userName=${user.userName}`,
                headers: {
                    'token' : user.token,
                }
            }

            try {
                const resp = await axios.post(axiosConf.url, { 'siteName': siteName, 'url':siteUrl }, axiosConf);
                alert( resp.data.msg);
                router.push("/dashboard");
                return;
            } catch ( err ) {

                const error = err as AxiosError;
                const resp = error.response?.data as Response;
                console.log(resp);
                
                alert(resp.err);
                return;
            }


        } else {
            alert("Select available site name and site url")
        }
    }

    return (
        <div className="form flex-1 flex flex-col">
            <div className="flex flex-1">
                <input onChange={handleSiteUrlChange} placeholder="Enter url without http://"       type="text" className="px-2 py-1 mx-1 rounded w-full bg-inbg border border-priCl outline-none"></input>
                <input onChange={handleSiteNameChange}  placeholder="Enter Site Name" type="text" className="px-2 py-1 mx-1 rounded w-full bg-inbg border border-priCl outline-none"></input>
                <button disabled={ siteUAvail === "Available" && siteNAvail === "Available" ? false:true } onClick={addSiteButt} 
                className={ siteNAvail==="Available" && siteUAvail==="Available" ? "px-2 py-1 dark:bg-white dark:text-black rounded  whitespace-nowrap  ":"px-2 py-1 dark:bg-gray-700 dark:text-gray-400 rounded  whitespace-nowrap " }
                >Add Site</button>
            </div>
            <div className="flex mt-1 px-2 justify-between">
                {
                    siteUAvail === "Available" && siteNAvail === "Available" ?
                    <p className="text-xs text-green-300">Available</p> :
                    <p className="text-xs text-red-300">Not Available</p> 
                }
            </div>
        </div>
    )
}

export default AddSiteForm;
