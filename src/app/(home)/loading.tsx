"use client";

import { PostSkeleton } from "@/components/skeletons/post-skeleton";

const HomeLoading = () => {
    return (
        <div className="flex flex-col min-h-screen px-12 py-20 gap-x-8">
            <div className="w-full grid grid-cols-4 gap-6">
                {new Array(8).fill(0).map((_, idx) => (
                    <PostSkeleton key={idx} />
                ))}
            </div>
        </div>
    );
};

export default HomeLoading;