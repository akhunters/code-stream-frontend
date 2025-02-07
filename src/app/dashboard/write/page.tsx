import { createPost } from "@/actions/posts.action";
import { BlogEditor } from "@/components/organisms/blog-editor";
import { Post } from "@/types/post.type";

const WritePage = async () => {
    const handleSubmit = async (payload: Pick<Post, 'body' | 'title' | 'description'>) => {
        "use server";
        await createPost(payload);
    }

    return (
        <BlogEditor onSubmit={handleSubmit} />
    )
}

export default WritePage;