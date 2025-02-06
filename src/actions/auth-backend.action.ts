"use server";

import { LoginPayload, LoginResponse } from "@/types/auth.type";

const LOGIN_URL = `${process.env.CODE_STREAM_BACKEND_BASE_URL}/auth/login`;

export async function backendLogin({
    token,
    provider,
}: LoginPayload): Promise<LoginResponse> {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, provider }),
    });

    const data = await response.json();
    return data;
}