"use client"

import { Site, User } from "@/types/globalStates";
import SiteComp from "./SiteComp";
import axios from "axios";
import { useEffect, useState } from "react";

function RenderSites( props: {user:User}){
    const user = props.user;
    console.log(process.env.BE_URL)
    const sitesReqConf = {
        url : process.env.BE_URL+"/apis/user/getsites?userName="+user.userName,
        headers : { 'token' : user.token }
    }
    const [sites, setSites] = useState<Site[]>([]);
    
    function remFromArr(deletedSiteId:string){
        setSites(
            sites.filter((site) => {
                return deletedSiteId!=site.siteId
            })
        )
    }

    useEffect(()=>{

        async function getSites(){

            try {

                const resp = await axios.get( sitesReqConf.url , sitesReqConf );
                console.log(resp);
                
                
                if(resp.data.sites===null) {
                    setSites([]);
                } else {
                    setSites(resp.data.sites);
                }

            } catch( error ) {
                console.log(error);
                alert("Network error");
            }
        }
        
        
        getSites();
    },[ sitesReqConf ])


    return (
        <div className="flex  flex-col max-h-full  overflow-hidden overflow-y-auto ">
            { 
            sites.length===0 ? 
            <p className="text-center"> No Sites added yet</p> :
            sites.map( (it:any) => {
                return <SiteComp key={it.siteName} site = {it} user = {user} remFromArr={remFromArr}   />
            })}
        </div>

    )

}

export default RenderSites;
