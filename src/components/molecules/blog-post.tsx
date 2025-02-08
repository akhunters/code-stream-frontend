import { Post } from "@/types/post.type";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "../atoms/icon-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface BlogPostProps extends Post {
    thumbnail: string;
    editable?: boolean;
}

export const BlogPost = ({
    id,
    title,
    description,
    createdAt,
    thumbnail,
    user,
    editable = false,
}: BlogPostProps) => {

    const handleDelete = async () => {
        "use server";
        // @todo Implement delete post functionality
    };

    return (
        <div className="flex flex-col h-full gap-y-2 justify-between p-4 border border-gray-200 rounded-sm hover:border-gray-300">
            <a href={`/blog/${id}`} className="flex flex-col gap-y-4 cursor-pointer ">
                <img src={thumbnail} alt={title} className="w-full h-[200px] object-cover rounded-sm" />
                <div className="flex justify-between items-start gap-x-8 ">
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-gray-700 text-sm">{description.slice(0, 60)}...</p>
                    </div>
                </div>
            </a>
            <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-2">
                    <Avatar style={{ width: 32, height: 32 }}>
                        <AvatarImage src={user.thumbnail} />
                        <AvatarFallback className="AvatarFallback" delayMs={600}>
                            {user.name[0]}{user.name[1]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 italic">{user.name}</p>
                        <p className="text-sm text-gray-600 italic">{dayjs(createdAt).format("MMM D, YYYY")}</p>
                    </div>
                </div>
                {editable && <div className="flex gap-x-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <IconButton
                                href={`/dashboard/write?id=${id}&edit=true`}
                                icon="file-pen-line"
                            />
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <IconButton
                                onClick={handleDelete}
                                icon="trash-2"
                            />
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                </div>}
            </div>
        </div>
    );
}