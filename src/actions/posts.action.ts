"use server";

import { auth } from "@/auth";
import { Post } from "@/types/post.type";

const GET_ALL_POSTS_ENDPOINT = `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts`;
const GET_POST_BY_ID_ENDPOINT = (id: string) => `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts/${id}`;
const CREATE_POST_ENDPOINT = `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts`;

const createQueryParams = <T extends Record<string, string | number>>(queries: T): URLSearchParams => {
    const queryParams = new URLSearchParams();
    for (const key in queries) {
        if (queries[key] !== undefined) {
            queryParams.append(key, queries[key].toString());
        }
    }
    return queryParams;
};

const createUrl = <T extends Record<string, string | number>>(url: string, queries: T): string => {
    const queryParams = createQueryParams({ ...queries });
    return `${url}?${queryParams.toString()}`;
};

interface GetAllPostQuery {
    authorId?: number;
    limit?: number;
    offset?: number;
}

export async function getAllPosts(queries: GetAllPostQuery = {}): Promise<Post[]> {
    const getAllPostsUrl = createUrl(GET_ALL_POSTS_ENDPOINT, { ...queries });

    const response = await fetch(getAllPostsUrl);
    const data = await response.json();
    return data;
}

export async function getPostById(id: string): Promise<Post> {
    const response = await fetch(GET_POST_BY_ID_ENDPOINT(id));
    const data = await response.json();
    return data;
}

export async function createPost(post: Pick<Post, 'title' | 'body'>): Promise<Post> {
    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }

    const accessToken = session.accessToken;

    const response = await fetch(CREATE_POST_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(post),
    });


    const data = await response.json();
    return data;
}
