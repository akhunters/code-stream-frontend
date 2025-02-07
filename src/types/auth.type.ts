import { User } from "./user.type";

const AUTH_PROVIDERS = [
    'google',
    'facebook'
] as const;

export type AuthProvider = typeof AUTH_PROVIDERS[number];

export interface LoginPayload {
    token: string;
    provider: AuthProvider;
}

export interface LoginResponse {
    accessToken: string;
    expiresAt: number;
    user: User;
}