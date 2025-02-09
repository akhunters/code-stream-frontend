import NextAuth, { Account, Session, User } from "next-auth";
import 'next-auth/jwt';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { backendLogin } from "./actions/auth-backend.action";
import { AuthProvider } from "./types/auth.type";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

const MAX_AGE = 60 * 60;

/**
  * This function will be called to authenticate each request
  * being made to the Next.js server
  * @param token The JWT token
  * @param account The user's account information
  * @returns The JWT token with the user's information
*/
const jwtCallback = async ({ token, account }: {
    token: JWT,
    account: Account | null
}): Promise<JWT> => {
    if (account?.access_token && account?.provider) {
        /**
            * Call the backend to authenticate the user with the provider's access token
            * This code block will only be executed when the user signs in
        */
        const backendAuthenticateResponse = await backendLogin({
            token: account.access_token,
            provider: account.provider as AuthProvider,
        });

        // Store the authenticated user's information in the token
        token.accessToken = backendAuthenticateResponse.accessToken;
        token.accessTokenExpires = backendAuthenticateResponse.expiresAt;
        token.userId = backendAuthenticateResponse.user.id;
    }

    return token;
}

/**
 * This function will be called to create the user's session
 * @param session The user's session
 * @param token The JWT token
 * @returns The user's session
*/
const sessionCallback = async ({ session, token }: {
    session: Session,
    token: JWT
}) => {
    // Store the user's information in the session
    // to easily access it throughout the application
    session.accessToken = token.accessToken;
    session.accessTokenExpires = token.accessTokenExpires;
    session.user.userId = token.userId;
    return session;
}

const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    trustHost: true,
    providers: [
        GoogleProvider,
        FacebookProvider,
    ],
    jwt: {
        maxAge: MAX_AGE,
    },
    session: {
        maxAge: MAX_AGE,
    },
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback,
    },
    pages: {
        signIn: "/signin",
    },
});

export { auth, handlers, signIn, signOut };

/**
 * Extend the NextAuth session to include the user's information
 */
declare module "next-auth" {
    interface Session {
        accessToken: string;
        accessTokenExpires: number;
        user: AdapterUser & User & { userId: number };
    }
}

/**
 * Extend the NextAuth JWT to include the user's information
 */
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string;
        accessTokenExpires: number;
        idToken: string;
        userId: number;
    }
}
