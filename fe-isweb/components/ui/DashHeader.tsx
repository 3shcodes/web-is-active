import Link from "next/link";
import LogoutButton from "../LogoutButt";
import { Icons } from "../Icons";


function DashHeader() {


    const AddIcon = Icons["add"];
    return (
        <div className="flex border-b border-gray-700 mx-60 py-3 items-center justify-between">
            <p className="text-2xl font-black">IsWeb?</p>
            <div className="flex items-center">
                {/* <AddIcon className="mr-4 h-7 w-7"/> */}
                <LogoutButton cname="bg-gray-300 dark:bg-gray-800 px-4 py-1 rounded" />
            </div>
        </div>
    )
}

export default DashHeader;
