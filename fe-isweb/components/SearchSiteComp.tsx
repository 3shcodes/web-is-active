"use client"

import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import { CompProps, Site } from "@/types/globalStates"
import ListComp from "./ListComp";

function SearchOldSite( props : CompProps ) {



    const [ sitesList, setSitesList ] = useState([]);
    
    
    useEffect(()=>{
        const axiosConf = {
                url: process.env.BE_URL+"/apis/user/quesites?find=",
                headers: { "token" : props.user.token}
        }

        async function fetchSites(){
            const resp = await axios.get(axiosConf.url, axiosConf);
            if ( resp.data.sites === null ) {
                setSitesList([]);
                return;
            }
            setSitesList( resp.data.sites );
            return;
        }

        fetchSites();

    }, [props])
    
    async function searchSites (e:ChangeEvent<HTMLInputElement>) {
        const axiosConf = {
                url: process.env.BE_URL+"/apis/user/quesites?find=" + e.target.value,
                headers: { "token" : props.user.token}
        }
        const resp = await axios.get(axiosConf.url, axiosConf);
        if ( resp.data.sites === null ) {
            setSitesList([]);
            return;
        }
        setSitesList( resp.data.sites );
        return;
    }

    return (
        <div>
            <div className="flex mb-6">
                <input className="px-3 py-1  rounded w-full outline-none bg-accCl border border-priCl" placeholder="Search for existing sites" onChange={ (e) => searchSites(e) } />
            </div>
            <div>
                {
                    sitesList.map(( site:Site ) => {
                        return <ListComp key={site.siteId} site={site} user={props.user} />
                    })
                }
                {
                    sitesList.length === 0 ?
                    <>No sites found</>:""
                }
            </div>

        </div>
    )
}

export default SearchOldSite;
