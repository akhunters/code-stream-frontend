import { Icon } from "@/components/atoms/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyBlogs() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
            <div className="w-64 h-64 flex items-center justify-center rounded-lg">
                <span className="text-8xl">👨‍💻📄</span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700">
                Looks like your blog is still in <span className="text-blue-600">"init()" </span> mode! 🚀
            </h2>
            <p className="text-gray-500 max-w-lg">
                Your coding wisdom is waiting to be shared! ✍️
                Every great developer starts with a **Hello, World!** – maybe this is your moment.
                Go ahead, **write your first article** and let your knowledge shine! 🌟
            </p>
            <Link href="/dashboard/write">
                <Button className="flex gap-y-4 px-6 py-6 bg-green-600 text-white text-md rounded-lg shadow-md hover:bg-green-700 transition">
                    <Icon name="plus" strokeWidth={4} /> <span> Write Your First Blog</span>
                </Button>
            </Link>
        </div>
    );
}
