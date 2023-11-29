import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Icons } from "@/components/Icons";
import RenderSites from "@/components/RenderSites";



interface DashBoardProps {}

async function DashBoardPage({}:DashBoardProps) {
    
    const user = await getCurrentUser();
    if(!user) {
        redirect("/login");
    }
    const AddIcon = Icons["add"];


    return (
        <main className="flex flex-1 flex-col h-min">
            <div className="border-b border-slate-600 mb-3 pb-1 flex justify-between">
                <p className="text-3xl font-bold">Sites</p>
                <Link href="/dashboard/add" className="flex items-center text-secCl"><AddIcon className="mr-1 h-5 w-5" />Add Site</Link>
            </div>
            {/* {sitesJson}<br /> */}
            {/* <div className="flex flex-col flex-1 max-h-screen"> */}
            <RenderSites user={user}/>
                {/* <RenderSites user={user}/> */}
            {/* </div> */}
        </main>
    );
}

export default DashBoardPage;
