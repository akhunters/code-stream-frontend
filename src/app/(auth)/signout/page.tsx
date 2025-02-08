"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function SignOutPage() {

    useEffect(() => {
        setTimeout(async () => {
            signOut({
                redirect: false,
            });
        }, 2000);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="mb-6">
                <span className="text-6xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">You&apos;ve been signed out</h1>
            <p className="text-gray-600 text-center max-w-md">
                Your session has expired. For security reasons, you&apos;ve been automatically logged out.
                Click below to sign in again and continue where you left off. 🚀
            </p>
            <Link
                href="/api/auth/signin"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                🔑 Sign In Again
            </Link>
        </div>
    );
}
