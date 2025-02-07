import { createPost, getPostById, updatePost } from "@/actions/posts.action";
import { auth } from "@/auth";
import { BlogEditor } from "@/components/organisms/blog-editor";
import { Post } from "@/types/post.type";
import { redirect } from "next/navigation";

const WritePage = async ({
    searchParams
}: {
    searchParams: Promise<{
        id: string;
        edit: string;
    }>;
}) => {
    const urlSearchParams = await searchParams;
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    let post: Post | null = null;
    let editMode = false;

    if (urlSearchParams && urlSearchParams.edit === 'true') {
        const postData = await getPostById(urlSearchParams.id);

        if (postData.user.id !== session.user.userId) {
            redirect("/dashboard");
        }

        editMode = true;
        post = postData;
    }

    const handleSubmit = async (payload: Pick<Post, 'body' | 'title' | 'description'>) => {
        "use server";
        if (editMode && post) {
            await updatePost(post.id, payload);
        } else {
            await createPost(payload);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-28 ">
            <div className="w-[80%] sm:w-[60%]">
                <BlogEditor editMode={editMode} post={post} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default WritePage;