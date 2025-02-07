"use client";

import { MDXRemote as NextMDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

// Define any custom components (optional)
const components = {
    h1: (props: any) => <h1 className="text-2xl font-bold my-4" {...props} />,
    p: (props: any) => <p className="text-lg my-2" {...props} />,
};

export const MDXRemote = ({
    mdxContent
}: {
    mdxContent: MDXRemoteSerializeResult;
}) => {

    return (
        <div>
            <NextMDXRemote  {...mdxContent} components={components} />
        </div>
    );
}

