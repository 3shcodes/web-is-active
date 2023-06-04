import ThemeSwitch from "@/components/themeChangeButt";
import Footer from "@/components/ui/Footer";
import HomeHeader from "@/components/ui/HomeHeader";
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
            <HomeHeader />
            { children }
            <Footer />
        </div>
    )
}

export default DashboardLayout;
