"use client"
import Link from "next/link";
import { Icons } from "../Icons";
import { usePathname} from "next/navigation";

interface DashSideItem{
    title : string,
    href : string,
    icon : keyof typeof Icons
}

const MenuItems : DashSideItem[] = [
       { title: "My Sites" , href: "/dashboard", icon: "scrollText" },
       { title: "Search" , href: "/dashboard/search", icon: "search"},
    //    { title: "Most Popular" , href: "/dashboard/trending", icon: "trend"},
       { title: "Settings" , href: "/dashboard/settings", icon: "cog"},
]

function SideBar(){
    
    const pathName = usePathname();
    const nomCname = "pl-2 pr-20 py-2 my-2  rounded hover:bg-slate-700 flex items-center text-md  w-60";
    const splCname = "bg-slate-300 dark:bg-slate-700 w-60 "+nomCname;

    return (
        <div className="flex flex-col mr-10">
            {MenuItems.map((it)=>{
                const Icon = Icons[it.icon]
                return (
                    pathName===it.href?
                    <Link key={it.title} href={it.href} className={splCname}>
                        <Icon className="mx-2 h-5 w-5"/>
                        {it.title}
                    </Link> :
                    <Link  key={it.title} href={it.href} className={nomCname}>
                        <Icon className="mx-2 h-5 w-5"/>
                        {it.title}
                    </Link>
                )
                    
            })}
        </div>
    )
}

export default SideBar;
