import {ReactNode} from "react";
import HomeHeader from "@/components/ui/HomeHeader"
import Footer from "@/components/ui/Footer"

interface LayoutProps {
    children: ReactNode
}

function HomeLayout({children}:LayoutProps) {
    return (
        <div className="pageDiv">
            <HomeHeader />
            {children}
            <Footer />
        </div>
    )
}
            // <Footer />

export default HomeLayout;
