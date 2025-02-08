"use client";

import { Icon } from "@/components/atoms/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorPageProps { error: Error; reset: () => void }

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 min-h-screen">
            <div className="w-64 h-64 flex items-center justify-center rounded-lg">
                <span className="text-8xl">💥🐛</span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-700">
                Uh-oh! Looks like an <span className="text-red-600">&quot;exception&quot;</span> was thrown! 🚨
            </h2>

            <p className="text-gray-500 max-w-lg">
                Something went wrong, and your request couldn&apos;t be completed.
                Maybe there’s a missing **try/catch block** in your code? 🤔
                Don’t worry, you can debug and **return to safety**.
            </p>

            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg max-w-lg text-sm text-gray-700">
                <strong>Error Message:</strong> {error.message}
            </div>
            <div className="flex gap-4">
                <Button
                    className="flex gap-2 px-6 py-6 bg-orange-600 text-white text-md rounded-lg shadow-md hover:bg-orange-700 transition"
                    onClick={reset}
                >
                    <Icon name="refresh-cw" strokeWidth={2} />
                    <span>Retry</span>
                </Button>
                <Link href="/">
                    <Button className="flex gap-2 px-6 py-6 bg-blue-600 text-white text-md rounded-lg shadow-md hover:bg-blue-700 transition">
                        <Icon name="home" strokeWidth={2} />
                        <span>Return to Homepage</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
