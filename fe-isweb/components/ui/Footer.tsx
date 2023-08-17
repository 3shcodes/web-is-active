import ThemeSwitch from "../themeChangeButt";
import Link from "next/link";

function Footer() {
    return (
        <footer className="flex justify-between items-center px-10 py-2 border-t border-gray-700 text-sm">
            <p>Built by <Link href="http://twitter.com/3shcodes" target="_blank" className="dark:text-slate-500 hover:dark:text-slate-400">3shcodes</Link></p>
            <div className="flex items-center"><p className="mr-2">Theme:</p> <ThemeSwitch /></div>
        </footer>
    ) 
}

export default Footer;
