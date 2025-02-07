import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { MDXRemote } from '../atoms/mdx-remote';

interface MDXRendererProps {
    mdxContent: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = async ({ mdxContent }) => {
    const serializedMdx = await serialize(mdxContent, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
        },
    });

    return <MDXRemote mdxContent={serializedMdx} />;
};

export default MDXRenderer;
