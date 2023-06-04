import Link from "next/link";


function HomeHeader() {

    return (
        <div className="flex border-b border-gray-700 mx-60 py-3 items-center justify-between">
            <p className="text-2xl font-black">IsWeb?</p>
            <Link href="/login" className="bg-gray-300 dark:bg-gray-800 px-4 py-1 rounded">Log In</Link>
        </div>
    )
}

export default HomeHeader;
