import NextAuth, { User } from "next-auth";
import 'next-auth/jwt';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { backendLogin } from "./actions/auth-backend.action";
import { AuthProvider } from "./types/auth.type";
import { AdapterUser } from "next-auth/adapters";

const MAX_AGE = 60 * 60;

const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    trustHost: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    jwt: {
        maxAge: MAX_AGE,
    },
    session: {
        maxAge: MAX_AGE,
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account?.access_token && account?.provider) {
                const backendAuthenticateResponse = await backendLogin({
                    token: account.access_token,
                    provider: account.provider as AuthProvider,
                });

                token.accessToken = backendAuthenticateResponse.accessToken;
                token.accessTokenExpires = backendAuthenticateResponse.expiresAt;
                token.userId = backendAuthenticateResponse.user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.userId = token.userId;
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
});

export { auth, handlers, signIn, signOut };

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: AdapterUser & User & { userId: number };
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string;
        accessTokenExpires: number;
        idToken: string;
        userId: number;
    }
}
