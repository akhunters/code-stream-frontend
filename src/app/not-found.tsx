import { Icon } from "@/components/atoms/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 min-h-screen">
            <div className="w-64 h-64 flex items-center justify-center rounded-lg">
                <span className="text-8xl">🚧🖥️</span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-700">
                Oops! Looks like you&apos;re stuck in an <span className="text-red-600">&quot;infinite loop()&quot;</span> 🔄
            </h2>
            <p className="text-gray-500 max-w-lg">
                The page you&apos;re looking for might have been deleted, or maybe it&apos;s hiding behind a missing **semicolon**.
                Don&apos;t worry, just **return to safety** before your browser stack overflows! 🖥️🚀
            </p>
            <Link href="/">
                <Button className="flex gap-2 px-6 py-6 bg-blue-600 text-white text-md rounded-lg shadow-md hover:bg-blue-700 transition">
                    <Icon name="home" strokeWidth={2} /> <span>Return to Homepage</span>
                </Button>
            </Link>
        </div>
    );
}

export default NotFoundPage;