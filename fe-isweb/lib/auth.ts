import  CredentialsProvider  from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import axios from "axios";

export const authOptions:AuthOptions = {
    session: {
        strategy : "jwt"
    },
    secret: "fumbbitch",
    providers : [
        CredentialsProvider({
            id: "credentials",
            name : "Credentials",

            credentials : {
                username : { label: "Username", type: "text", placeholder: "Enter username"},
                password : { label: "Password", type: "password", placeholder: "Enter password"}
            },

            async authorize(credentials , _ ) {
                try {
                    const resp = await axios.post("http://localhost:1234/apis/auth/login", { "user_name": credentials!.username, "password": credentials!.password });
                    if ( resp.data.ok ) {
                        return resp.data.user;
                    }
                    return null;
                } catch (error) {
                    return null;
                }
            }
        })

    ],
    pages: {
        signIn: "/login",
    },
    callbacks : {
        jwt : async function ( {token, user}){
            user && (token.user = user)
            return token;
        },
        session : async function ( {session, token} ) {
            session.user = token.user 
            return session
        }
    }
}
