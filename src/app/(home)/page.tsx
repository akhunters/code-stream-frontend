import { getAllPosts } from "@/actions/posts.action";
import { BlogPost } from "@/components/molecules/blog-post";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const posts = await getAllPosts();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-col min-h-screen px-12 py-20 gap-x-8">
      <div className="w-full grid grid-cols-4 gap-6">
        {posts.map((post, idx) => (
          <div key={post.id}>
            <BlogPost
              key={post.id}
              {...post}
              thumbnail="/images/dummy-thumbnail.png"
            />
            {idx !== posts.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}
