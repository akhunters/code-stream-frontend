"use client";

import { useState } from "react";
import RichTextEditor from "../molecules/rich-text-editor";
import { Post } from "@/types/post.type";
import { toast } from "sonner";
import LoadingButton from "../atoms/loading-button";
import { Spinner } from "../atoms/spinner";
import { useRouter } from "next/navigation";

export const BlogEditor = ({
    editMode,
    post,
    onSubmit,
}: {
    editMode?: boolean;
    post?: Post | null;
    onSubmit: (data: Pick<Post, 'title' | 'body' | 'description'>) => Promise<Post>;
}) => {
    const router = useRouter();

    const [title, setTitle] = useState(post?.title || '');
    const [body, setBody] = useState(post?.body || '');
    const [description, setDescription] = useState(post?.description || '');

    const handleSubmit = async () => {
        try {
            const postData = await onSubmit({ title, body, description });

            toast.success(editMode ? 'Post updated successfully' : 'Post created successfully');
            router.push(`/blog/${postData.id}`);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while creating the post');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center min-h-screen w-full min-w-[60%] gap-y-4">
                <label className="text-xl w-full font-bold text-gray-800">Create a new blog</label>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your blog title..."
                    rows={1}
                    maxLength={60}
                    className="w-full text-3xl font-bold text-gray-800 p-2 border-b focus:outline-none focus:ring-0"
                />
                <label className="text-xl w-full font-bold text-gray-800">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 255))}
                    placeholder="Enter your blog description..."
                    rows={3}
                    maxLength={255}
                    className="w-full text-lg text-gray-800 p-2 border-b mb-4 focus:outline-none focus:ring-0"
                />
                <RichTextEditor content={body} setContent={setBody} />
                <div className="flex justify-end w-full">
                    <LoadingButton
                        Components={{
                            Loader: <Spinner className="text-white" />,
                        }}
                        disabled={!title || !body || !description}
                        size={'lg'}
                        className="flex items-center"
                        onClick={handleSubmit}
                    >
                        Create
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
}