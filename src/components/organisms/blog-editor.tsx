"use client";

import { useState } from "react";
import RichTextEditor from "../molecules/rich-text-editor";
import { Button } from "../ui/button";
import { Post } from "@/types/post.type";

export const BlogEditor = ({
    onSubmit,
}: {
    onSubmit: (data: Pick<Post, 'title' | 'body'>) => void;
}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = () => {
        onSubmit({ title, body });
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen min-w-screen py-8">
            <div className="flex flex-col items-center justify-center min-h-screen min-w-[60%] gap-y-4">
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                    placeholder="Enter your blog title..."
                    className="w-full text-3xl font-bold text-gray-800 p-2 border-b mb-4 focus:outline-none focus:ring-0"
                />
                <RichTextEditor content={body} setContent={setBody} />
                <div className="flex justify-end w-full">
                    <Button disabled={!title || !body} size={'lg'} onClick={handleSubmit}>Create</Button>
                </div>
            </div>
        </section>
    );
}