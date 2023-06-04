
import Link from "next/link";


function AuthHeader() {

    return (
        <div className="flex border-b border-gray-700 mx-60 py-3 justify-center items-center mb-20">
            <Link href="/" className="text-2xl font-black">IsWeb?</Link>
        </div>
    )
}

export default AuthHeader;
