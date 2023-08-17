import AddSiteForm from "@/components/AddSiteForm";
import SearchOldSite from "@/components/SearchSiteComp";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

async function AddSitePage() {

    const user = await getCurrentUser();
    if(!user) {
        redirect("/login");
    }


    return (
        <main className="flex-1">
            <div className="mb-20">
                <p className="text-3xl font-extrabold mb-4">Add New Site</p>
                <AddSiteForm user = {user} />
            </div>
            <div className="mb-20">
                <p className="text-3xl font-extrabold mb-4">Add Old Site</p>
                <div className="flex ">
                    <p className="flex text-center w-full justify-center mt-6">
                        Navigate to <Link href="/dashboard/search" className="text-secCl flex mx-2 hover:text-slate-400 underline">Search page</Link>  to add existing sites.
                    </p>
                </div>
            </div>
        </main>
    )
}
            // <p className="text-3xl font-extrabold mb-4">Add Old Site</p>
            // <AddSiteForm user = {user} />

export default AddSitePage;
