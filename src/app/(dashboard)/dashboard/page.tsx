import { getAllPosts } from "@/actions/posts.action";
import { auth } from "@/auth";
import { BlogPost } from "@/components/molecules/blog-post";
import { redirect } from "next/navigation";
import EmptyBlogs from "./empty";

const DashboardPage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    const posts = await getAllPosts({
        authorId: session.user.userId,
    });

    if (posts.length === 0) {
        return <EmptyBlogs />;
    }

    return (
        <div className="flex flex-col min-h-screen px-12 py-20 gap-y-8">
            <h3 className="text-4xl font-black text-gray-800 text-center">My Blogs</h3>
            <div className="w-full grid grid-cols-4 gap-6">
                {posts.map((post) => (
                    <div key={post.id} >
                        <BlogPost
                            key={post.id}
                            {...post}
                            thumbnail="/images/dummy-thumbnail.png"
                            editable
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;