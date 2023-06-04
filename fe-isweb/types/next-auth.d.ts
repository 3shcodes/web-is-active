import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';



declare module "next-auth" {
    interface Session {
        user : User
    }
    
}

declare module "next-auth/jwt" {
    interface JWT {
        user : User
    }
}