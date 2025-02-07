import { getAllPosts } from "@/actions/posts.action";
import { BlogPost } from "@/components/molecules/blog-post";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-24">
      {posts.map((post, idx) => (
        <div key={post.id}>
          <BlogPost key={post.id} {...post} thumbnail="/images/dummy-thumbnail.png" />
          {idx !== posts.length - 1 && <Separator />}
        </div>
      ))}
    </main>
  );
}
