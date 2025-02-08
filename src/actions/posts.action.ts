"use server";

import { auth } from "@/auth";
import { Post } from "@/types/post.type";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { getAxiosErrorMessage } from "@/lib/utils";
import { CustomAxiosError } from "@/types/axios.type";

const GET_ALL_POSTS_ENDPOINT = `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts`;
const GET_POST_BY_ID_ENDPOINT = (id: string) => `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts/${id}`;
const CREATE_POST_ENDPOINT = `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts`;
const UPDATE_POST_ENDPOINT = (id: number) => `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts/${id}`;
const DELETE_POST_ENDPOINT = (id: number) => `${process.env.CODE_STREAM_BACKEND_BASE_URL}/posts/${id}`;

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

    try {
        const response = await axios<Post[]>(getAllPostsUrl);
        return response.data;
    } catch (e) {
        const errorMessage = getAxiosErrorMessage(e as CustomAxiosError);
        throw new Error(errorMessage);
    }
}

export async function getPostById(id: string): Promise<Post> {
    try {
        const response = await axios.get(GET_POST_BY_ID_ENDPOINT(id));

        const data = response.data;
        return data;
    } catch (e) {
        const errorMessage = getAxiosErrorMessage(e as CustomAxiosError);
        throw new Error(errorMessage);
    }
}

export async function createPost(post: Pick<Post, 'title' | 'body' | 'description'>): Promise<Post> {
    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }

    const accessToken = session.accessToken;

    try {
        const response = await axios.post<Post>(CREATE_POST_ENDPOINT, post, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = response.data;
        return data;
    } catch (e) {
        const errorMessage = getAxiosErrorMessage(e as CustomAxiosError);
        throw new Error(errorMessage);
    }

}

export async function updatePost(id: number, post: Pick<Post, 'title' | 'body' | 'description'>): Promise<Post> {
    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }

    const accessToken = session.accessToken;

    try {
        const response = await axios.patch<Post>(UPDATE_POST_ENDPOINT(id), post, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = response.data;
        return data;
    } catch (e) {
        const errorMessage = getAxiosErrorMessage(e as CustomAxiosError);
        throw new Error(errorMessage);
    }
}

export async function deletePost(id: number): Promise<void> {
    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }

    const accessToken = session.accessToken;

    try {
        await axios.delete(DELETE_POST_ENDPOINT(id), {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Reset the cache and render the updated list of posts
        revalidatePath("/dashboard");
    } catch (e) {
        const errorMessage = getAxiosErrorMessage(e as CustomAxiosError);
        throw new Error(errorMessage);
    }
}
