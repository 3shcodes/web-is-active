import DashHeader from "@/components/ui/DashHeader";
import SideBar from "@/components/ui/DashSideBar";
import Footer from "@/components/ui/Footer";
import {getCurrentUser} from "@/lib/session";
import {notFound} from "next/navigation";


interface DbLayoutProps {
    children?:React.ReactNode;
}

async function DashboardLayout ({children}:DbLayoutProps) {
    const user = await getCurrentUser();
    if(!user) {
        return notFound();
    }
    return (
        <div className="pageDiv">
            <DashHeader />
            <div className="flex flex-1 mx-60 my-8 h-screen">
                <SideBar />
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DashboardLayout;
