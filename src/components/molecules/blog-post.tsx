import { Post } from "@/types/post.type";
import dayjs from "dayjs";

interface BlogPostProps extends Post {
    thumbnail: string;
}

export const BlogPost = ({
    id,
    title,
    body,
    createdAt,
    thumbnail,
    user
}: BlogPostProps) => {
    return (
        <a href={`/blog/${id}`} className="flex flex-col gap-y-2 justify-between py-6 px-4 cursor-pointer">
            <img src={thumbnail} alt={title} className="w-32 h-24 object-cover rounded-sm" />
            <div className="flex justify-between items-start gap-x-8 ">
                <div className="flex flex-col gap-y-4">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-gray-700 text-lg">{body.slice(0, 100)}...</p>
                </div>

            </div>
            <p className="text-sm text-gray-600 italic">Posted by {user.name} on {dayjs(createdAt).format("MMM D, YYYY")}</p>
        </a>
    );
}