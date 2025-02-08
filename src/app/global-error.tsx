"use client";

import { Icon } from "@/components/atoms/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorPageProps { error: Error; reset: () => void }

export default function GlobalError({ error, reset }: ErrorPageProps) {

    return (
        <html>
            <body className="flex flex-col items-center justify-center h-screen text-center space-y-6 bg-gray-100">
                <div className="w-64 h-64 flex items-center justify-center rounded-lg">
                    <span className="text-8xl">💻🔥</span>
                </div>
                <h2 className="text-3xl font-semibold text-gray-700">
                    Whoops! Something broke in the <span className="text-red-600">&quot;mainframe()&quot;</span> 🛑
                </h2>

                <p className="text-gray-500 max-w-lg">
                    An unexpected error occurred. It might be a **missing semicolon**, or maybe the **server just rage quit**.
                    Either way, don’t panic – hit the retry button or return home to debug later.
                </p>
                <div className="p-4 bg-gray-200 border border-gray-300 rounded-lg max-w-lg text-sm text-gray-700">
                    <strong>Error Details:</strong> {error.message}
                </div>
                <div className="flex gap-4">
                    <Button
                        className="flex gap-2 px-6 py-6 bg-orange-600 text-white text-md rounded-lg shadow-md hover:bg-orange-700 transition"
                        onClick={reset}
                    >
                        <Icon name="refresh-cw" strokeWidth={2} />
                        <span>Try Again</span>
                    </Button>
                    <Link href="/">
                        <Button className="flex gap-2 px-6 py-6 bg-blue-600 text-white text-md rounded-lg shadow-md hover:bg-blue-700 transition">
                            <Icon name="home" strokeWidth={2} />
                            <span>Return to Homepage</span>
                        </Button>
                    </Link>
                </div>
            </body>
        </html>
    );
}
