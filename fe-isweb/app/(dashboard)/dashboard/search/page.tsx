import ListComp from "@/components/ListComp";
import SearchOldSite from "@/components/SearchSiteComp";
import SiteComp from "@/components/SiteComp";
import { getCurrentUser } from "@/lib/session";
import { Site } from "@/types/globalStates";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";


async function SearchPage(){

    const user = await getCurrentUser();
    if(!user) {
        redirect("/login");
    }
    
    
    


    return (
        <main className="flex flex-col flex-1">
            {/* {sitesJson} */}
            <p className="text-3xl font-bold  border-b border-slate-600 mb-3 pb-1  ">Search</p>
            <div className="flex flex-1 flex-col mt-2">
                <SearchOldSite user={user} />
            </div>
        </main>
    )
}

export default SearchPage;