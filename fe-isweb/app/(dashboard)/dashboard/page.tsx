"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { authUtils } from "@/utils/authUtils";
import userSlice from "@/redux/slices/userSlice";


interface DashBoardProps {}

function DashBoardPage({}:DashBoardProps) {
    const router = useRouter();
    let user: User | null = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    if (user === null) {
        user = authUtils.checkUserExists();
        if ( user === null ){
            router.push("/login");
        }
    }

    function handleLogout(){
        dispatch(userSlice.actions.logout());
        router.push("/");
    }


    console.log("dashuser",user)
    return (
        <>
            {user?.userName}<br />
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
}

export default DashBoardPage;