import { getAllPosts } from "@/actions/posts.action";
import { BlogPost } from "@/components/molecules/blog-post";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col min-h-screen px-12 py-20 gap-x-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <BlogPost
            key={post.id}
            {...post}
            thumbnail="/images/dummy-thumbnail.png"
          />
        ))}
      </div>
    </div>
  );
}
