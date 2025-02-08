"use client";

import { useState } from "react";
import RichTextEditor from "../molecules/rich-text-editor";
import { Button } from "../ui/button";
import { Post } from "@/types/post.type";

export const BlogEditor = ({
    post,
    onSubmit,
}: {
    editMode?: boolean;
    post?: Post | null;
    onSubmit: (data: Pick<Post, 'title' | 'body' | 'description'>) => void;
}) => {
    const [title, setTitle] = useState(post?.title || '');
    const [body, setBody] = useState(post?.body || '');
    const [description, setDescription] = useState(post?.description || '');

    const handleSubmit = () => {
        onSubmit({ title, body, description });
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
                    <Button disabled={!title || !body} size={'lg'} onClick={handleSubmit}>Create</Button>
                </div>
            </div>
        </div>
    );
}