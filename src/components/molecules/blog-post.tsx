import { Post } from "@/types/post.type";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { deletePost } from "@/actions/posts.action";
import LoadingButton from "../atoms/loading-button";
import { Icon } from "../atoms/icon";
import Link from "next/link";
import Image from "next/image";

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
        await deletePost(id);
    };

    return (
        <div className="flex flex-col h-full gap-y-2 justify-between p-4 border border-gray-200 rounded-sm hover:border-gray-300">
            <Link href={`/blog/${id}`} className="flex flex-col gap-y-4 cursor-pointer ">
                <Image
                    src={thumbnail}
                    alt={title}
                    width={400}
                    height={400}
                    className="w-full h-[200px] object-cover rounded-sm"
                />
                <div className="flex justify-between items-start gap-x-8 ">
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-gray-700 text-sm">{description.slice(0, 60)}...</p>
                    </div>
                </div>
            </Link>
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
                {editable && <div className="flex gap-x-2 items-center">
                    <Tooltip>
                        <LoadingButton
                            className="bg-transparent shadow-none p-0 h-8 w-8 text-primary hover:text-white"
                        >
                            <Link href={`/dashboard/write?id=${id}&edit=true`} className="flex items-center">
                                <TooltipTrigger asChild>
                                    <Icon
                                        name="file-pen-line"
                                        strokeWidth={1.5}
                                    />
                                </TooltipTrigger>
                            </Link>
                        </LoadingButton>
                        <TooltipContent sideOffset={10}>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip >
                        <LoadingButton
                            Components={{
                                Error: null,
                                Toaster: {
                                    show: true,
                                    successMessage: "Post deleted successfully",
                                    errorMessage: "Error deleting post",
                                }
                            }}
                            hideChildrenWhileLoading
                            onClick={handleDelete}
                            className="bg-transparent shadow-none p-0 h-8 w-8 text-primary hover:text-white"
                        >
                            <TooltipTrigger asChild>
                                <Icon
                                    strokeWidth={1.5}
                                    name="trash-2"
                                />
                            </TooltipTrigger>
                        </LoadingButton>
                        <TooltipContent sideOffset={10}>Delete</TooltipContent>
                    </Tooltip>
                </div>}
            </div>
        </div >
    );
}