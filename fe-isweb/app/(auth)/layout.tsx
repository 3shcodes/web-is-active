import AuthHeader from "@/components/ui/AuthHeader";
import Footer from "@/components/ui/Footer";
import { ReactNode } from "react";


interface AuthLayProps {
    children: ReactNode
}
function AuthLayout({children}:AuthLayProps){
    return (
        <div className="pageDiv">
            <AuthHeader />
            {children}
            <Footer />
        </div>
    )
}

export default AuthLayout;