"use server";

import { Post } from "@/types/post.type";

const GET_ALL_POSTS_ENDPOINT = `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts`;
const GET_POST_BY_ID_ENDPOINT = (id: string) => `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts/${id}`;

export async function getAllPosts(): Promise<Post[]> {
    const response = await fetch(GET_ALL_POSTS_ENDPOINT);
    const data = await response.json();
    return data;
}

export async function getPostById(id: string): Promise<Post> {
    const response = await fetch(GET_POST_BY_ID_ENDPOINT(id));
    const data = await response.json();
    return data;
}
