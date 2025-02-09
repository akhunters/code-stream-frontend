"use client";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export const PostBody = ({
    body
}: {
    body: string;
}) => {
    const [sanitizedBody, setSanitizedBody] = useState<string>('');

    useEffect(() => {
        if (DOMPurify?.sanitize) {
            // Sanitize the html body before rendering it
            // This is to prevent XSS attacks
            setSanitizedBody(DOMPurify.sanitize(body));
        }
    }, [body]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: sanitizedBody }}
            className="w-full text-lg text-gray-800"
        />
    );
}