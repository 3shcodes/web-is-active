import { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware (req) {
        // console.log(req)
        const token = await getToken({req,secret:"fumbbitch"});
        const isAuth = !!token;
        const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(
                    new URL("/dashboard", req.url)
                );
            }

            return null;
        }

        if (!isAuth) {
            console.log(isAuth);
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }

            return NextResponse.redirect(
                new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
            );

        }
    },
    {
        secret : "fumbbitch",
        callbacks : {
            async authorized() {
                return true;
            }
        }
    }
)

export const config = {
    matcher : ["/dashboard/:path*", "/login", "/signup"],
}
