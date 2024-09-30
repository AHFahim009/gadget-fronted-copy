// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string; // Add the accessToken field to Session
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string; // Add the accessToken field to JWT token
    }
}
