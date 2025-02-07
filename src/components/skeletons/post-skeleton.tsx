
import { Skeleton } from "../ui/skeleton"

export const PostSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-4 justify-between p-4 border border-gray-200 rounded-sm hover:border-gray-300">
            <Skeleton style={{ width: "100%", height: "200px" }} />
            <div className="flex justify-between items-start gap-x-8 ">
                <div className="flex flex-col gap-y-8 w-full">
                    <Skeleton style={{ width: "100%", height: "70px" }} />
                    <Skeleton style={{ width: "100%", height: "70px" }} />
                </div>
            </div>
            <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-2">
                    <Skeleton style={{ width: "32px", height: "32px" }} className="rounded-full" />
                    <div className="flex flex-col">
                        <Skeleton style={{ width: "100px", height: "32px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}