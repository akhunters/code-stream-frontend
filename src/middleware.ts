import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const isTokenValidForNext5Mins = token && dayjs(token.accessTokenExpires).diff(dayjs(), "minute") > 5;

    if (!token || !isTokenValidForNext5Mins) {
        const signinUrl = new URL("/signin", req.nextUrl.origin);
        return NextResponse.rewrite(signinUrl.toString());
    }

    return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
