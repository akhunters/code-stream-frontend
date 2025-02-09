import { getPostById } from "@/actions/posts.action";
import { PostBody } from "@/components/atoms/post-body";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import Image from "next/image";

interface BlogPageProps {
    params: Promise<{
        id: string;
    }>
}

const BlogPage = async ({
    params
}: BlogPageProps) => {
    const { id } = await params;

    const post = await getPostById(id);

    if (!post) {
        throw new Error('Post not found');
    }

    return (
        <div className="flex items-start justify-center min-h-screen  py-28 w-full">
            <div className="flex flex-col items-center justify-center w-[80%] sm:w-[60%] gap-y-10">
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <Image
                    src={'/images/dummy-thumbnail.png'}
                    alt="Thumbnail"
                    width={400}
                    height={400}
                    className="w-full h-[300px] rounded-lg"
                />
                <PostBody body={post.body} />
                <Separator />
                <div className="flex gap-x-4 w-full items-center">
                    <Avatar style={{ width: 60, height: 60 }}>
                        <AvatarImage src={post.user.thumbnail} />
                        <AvatarFallback>
                            {post.user.name[0]}{post.user.name[1]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-y-1">
                        <p className="text-xl font-semibold">Written by {post.user.name}</p>
                        <p className="text-lg font-normal opacity-80">{dayjs(post.createdAt).format("MMM D, YYYY")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPage;