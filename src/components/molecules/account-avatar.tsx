"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

export const NAVIGATION_ITEMS = [
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

    const handleNavigation = async (to: NavigationItem) => {
        const path = navigationItemPathMap.get(to);

        if (path) {
            router.push(path);
        }
    }

    const navigateToMyGithubInNewTab = () => {
        window.open("https://github.com/akhunters", "_blank", "noopener noreferrer");
    }

    const navigateToApiDocsInNewTab = () => {
        window.open(`${process.env.NEXT_PUBLIC_CODE_STREAM_BACKEND_BASE_URL}/docs`, "_blank", "noopener noreferrer");
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
                        onClick={() => handleNavigation("my-blogs")}
                    >
                        My Blogs
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleNavigation("write")}
                    >
                        Write
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={navigateToMyGithubInNewTab}
                    >
                        GitHub
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={navigateToApiDocsInNewTab}
                    >
                        API Docs
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout} >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}