import { User } from "./user.type";

export interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    user: Pick<User, "name" | "id">;
}