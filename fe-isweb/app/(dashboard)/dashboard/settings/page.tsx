import { Icons } from "@/components/Icons";
import UserDetailsComp from "@/components/UserDetailsComp";
import { getCurrentUser } from "@/lib/session";
import { User } from "@/types/globalStates";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";

async function SettingsPage(){
    
    const user:User = await getCurrentUser();
    if ( !user ) {
        redirect("/login")
    }
    console.log(user)
    

    return (
        <main className="flex-1">
            <div className="border-b border-slate-600 mb-3 pb-1 flex justify-between">
                <p className="text-3xl font-bold">Account Information</p>
            </div>
            <div className="flex h-full pb-8">
                <UserDetailsComp  user={user} />
            </div>
        </main>
    )
}

export default SettingsPage;