import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-primary">Dashboard</h1>
        </div>
    );
}

export default DashboardPage;