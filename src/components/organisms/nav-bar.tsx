import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { AccountAvatar } from "../molecules/account-avatar";
import { IconLink } from "../atoms/icon-link";
import { auth } from "@/auth";

export const NavBar = async () => {
    const session = await auth();

    const handleSignInClick = async () => {
        "use server";
        redirect("/signin");
    }

    const getAuthenticatedLinks = () => {
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

    return <div className="w-screen py-3 px-12 border-b-[1px] border-gray-100 fixed top-0 bg-white z-10">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-primary">Code Stream</a>
            </div>
            <div className="flex items-center gap-x-5">
                <IconLink href="/dashboard" icon="square-pen" label="Write" className="text-primary w-5 h-5" />
                {getAuthenticatedLinks()}
            </div>
        </div>
    </div>
}