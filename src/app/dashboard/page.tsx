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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-primary">Dashboard</h1>
            {posts.map((post, idx) => (
                <div key={post.id}>
                    <BlogPost key={post.id} {...post} thumbnail="/images/dummy-thumbnail.png" />
                    {idx !== posts.length - 1 && <Separator />}
                </div>
            ))}
        </div>
    );
}

export default DashboardPage;