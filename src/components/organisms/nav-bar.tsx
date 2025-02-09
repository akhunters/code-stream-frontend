import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { AccountAvatar } from "../molecules/account-avatar";
import { IconButton } from "../atoms/icon-link";
import { auth } from "@/auth";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const AuthenticatedLinks = async () => {
    const session = await auth();

    const handleSignInClick = async () => {
        "use server";
        redirect("/signin");
    }

    if (!session?.user) {
        return (
            <Button onClick={handleSignInClick}>
                Sign In
            </Button>
        );
    }

    return (
        <AccountAvatar src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
    );
}

export const NavBar = async () => {
    return <div className="w-screen py-3 px-6 md:px-12 border-b-[1px] border-gray-100 fixed top-0 bg-white z-10">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">Code Stream</Link>
            </div>
            <div className="flex items-center gap-x-5">
                <IconButton href="/dashboard/write" icon="square-pen" label="Write" className="text-primary w-5 h-5" />
                <Suspense fallback={<Skeleton className="w-10 h-10 rounded-full" />}>
                    <AuthenticatedLinks />
                </Suspense>
            </div>
        </div>
    </div>
}