"use client";

import { ErrorPageProps, ErrorPageTemplate } from "@/components/templates/error-template";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    return (
        <ErrorPageTemplate error={error} reset={reset} />
    );
}
