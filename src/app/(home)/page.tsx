import { getAllPosts } from "@/actions/posts.action";
import { BlogPost } from "@/components/molecules/blog-post";

export default async function Home() {
  const posts = await getAllPosts();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-col min-h-screen px-12 py-20 gap-x-8">
      <div className="w-full grid grid-cols-4 gap-6">
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
