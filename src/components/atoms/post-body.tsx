"use client";
import DOMPurify from "dompurify";

export const PostBody = ({
    body
}: {
    body: string;
}) => {
    const sanitizedBody = DOMPurify.sanitize(body);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: sanitizedBody }}
            className="px-6 sm:px-52  text-lg  text-gray-800"
        />
    );
}