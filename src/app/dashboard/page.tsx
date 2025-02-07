import { getAllPosts } from "@/actions/posts.action";
import { auth } from "@/auth";
import { BlogPost } from "@/components/molecules/blog-post";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    const posts = await getAllPosts({
        authorId: session.user.userId,
    });

    const updatedPosts = new Array(5).fill(posts[0]);

    return (
        <div className="flex flex-col min-h-screen px-12 py-20">
            <h3 className="text-4xl font-black text-gray-800 text-center">My Blogs</h3>
            <div className="w-full mt-8 grid grid-cols-4 gap-6">
                {updatedPosts.map((post, idx) => (
                    <div key={post.id} >
                        <BlogPost key={post.id} {...post} thumbnail="/images/dummy-thumbnail.png" editable />
                        {idx !== posts.length - 1 && <Separator />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;