import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
        const signinUrl = new URL("/signin", req.nextUrl.origin);
        return NextResponse.rewrite(signinUrl.toString());
    }

    /**
     * @todo Implement a refresh token strategy in `auth.ts` to get a new access token
     * if the current access token is going to expire in the next 5 minutes 👻.
     * For now, we will redirect the user to the signin page for re-authentication.
     *
     * @see https://authjs.dev/guides/refresh-token-rotation?framework=next-js to learn more about refresh token rotation
     *
     * Post receiving the new access token, we can follow the usual flow:
     * 1. Call /api/auth/login endpoint with the new access token
     * 2. Update the session cookie with the token received from the above endpoint
     */
    const isTokenValidForNext5Mins = token && dayjs.unix(token.accessTokenExpires).diff(dayjs(), "minute") > 5;
    if (!isTokenValidForNext5Mins) {
        const signoutUrl = new URL("/signout", req.nextUrl.origin);
        return NextResponse.rewrite(signoutUrl.toString());
    }

    return NextResponse.next();
}

/**
 * @description This middleware will only get executed for the routes that match the pattern `matcher`
 */
export const config = { matcher: ["/dashboard/:path*"] };
