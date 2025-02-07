"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const NAVIGATION_ITEMS = [
    "my-blogs",
    "write",
] as const;

type NavigationItem = typeof NAVIGATION_ITEMS[number];

const navigationItemPathMap = new Map<NavigationItem, string>([
    ["my-blogs", '/dashboard'],
    ["write", "/dashboard/write"],
]);

interface AccountAvatarProps {
    src: string;
    alt: string;
}

export const AccountAvatar = ({
    src,
    alt,
}: AccountAvatarProps) => {
    const router = useRouter();

    const handleLogout = () => {
        signOut({
            redirectTo: "/signin",
        });
    }

    const navigateToMyBlogs = async () => {
        const path = navigationItemPathMap.get("my-blogs");

        if (path) {
            router.push(path);
        }
    }

    const navigateToWrite = async () => {
        const path = navigationItemPathMap.get("write");

        if (path) {
            router.push(path);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:shadow-md">
                    <AvatarImage src={src} alt={alt} />
                    <AvatarFallback>
                        <Skeleton className="w-10 h-10 rounded-full" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 mr-4">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={navigateToMyBlogs}
                    >
                        My Blogs
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={navigateToWrite}
                    >
                        Write
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">GitHub</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout} >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}