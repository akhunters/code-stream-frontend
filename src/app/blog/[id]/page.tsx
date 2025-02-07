import { getPostById } from "@/actions/posts.action";
import { PostBody } from "@/components/atoms/post-body";

interface BlogPageProps {
    params: {
        id: string;
    };
}

const BlogPage = async ({
    params: { id },
}: BlogPageProps) => {
    const post = await getPostById(id);

    if (!post) {
        throw new Error('Post not found');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-10 py-28">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <img src={'/images/dummy-thumbnail.png'} alt="Thumbnail" className="w-[500px] h-[300px] rounded-lg" />
            <PostBody body={post.body} />
        </div>
    );
}

export default BlogPage;