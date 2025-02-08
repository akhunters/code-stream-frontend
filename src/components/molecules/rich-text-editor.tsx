"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, List, Quote, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface RichTextEditorProps {
    content: string;
    setContent: (content: string) => void;
}

const RichTextEditor = ({
    content,
    setContent,
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Image,
            Table,
            TableRow,
            TableCell,
            TableHeader,
            TaskList,
            TaskItem,
            Placeholder.configure({ placeholder: 'Write your blog here...' }),
            CharacterCount,
            Highlight,
            CodeBlockLowlight.configure({ lowlight: createLowlight() }),
            Paragraph.configure({
                HTMLAttributes: {
                    class: 'text-md text-primary font-normal',
                },
            }),
            Heading.configure({
                levels: [1, 2],
                HTMLAttributes: {
                    class: 'text-2xl text-primary font-semibold',
                }
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'w-full focus:outline-none p-4 rounded-lg',
            },
        },
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        immediatelyRender: false,
    });

    if (!editor?.isInitialized) {
        return <Skeleton className='h-[340px] w-full' />;
    }

    return (
        <div className="editor-container border rounded-lg p-4 w-full flex flex-col gap-4">
            <div className="toolbar flex gap-2 mb-2">
                {[
                    { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run(), isActive: editor?.isActive('bold') },
                    { icon: <Italic size={18} />, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor?.isActive('italic') },
                    { icon: <UnderlineIcon size={18} />, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor?.isActive('underline') },
                    { icon: <Strikethrough size={18} />, action: () => editor.chain().focus().toggleStrike().run(), isActive: editor?.isActive('strike') },
                    { icon: <Heading1 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor?.isActive('heading', { level: 1 }) },
                    { icon: <Heading2 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor?.isActive('heading', { level: 2 }) },
                    { icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor?.isActive('bulletList') },
                    { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor?.isActive('blockquote') },
                    { icon: <Code size={18} />, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor?.isActive('codeBlock') },
                ].map(({ icon, action, isActive }, index) => (
                    <button
                        key={index}
                        onClick={action}
                        className={cn(
                            "p-2 rounded-md transition-colors",
                            isActive ? "bg-neutral-700 text-white" : "bg-gray-200 hover:bg-gray-300"
                        )}
                    >
                        {icon}
                    </button>
                ))}
            </div>
            <EditorContent
                editor={editor}
                style={{ minHeight: '200px' }}
                className="prose flex max-w-full border p-2 min-h-[200px] prose-h1:text-4xl prose-h1:font-extrabold prose-h1:text-gray-800 prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-700 prose-p:text-lg prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-blockquote:my-4 prose-p:text-gray-600 prose-pre:bg-gray-100 prose-pre:text-primary prose-pre:text-sm prose-pre:my-2 prose-pre:p-4 prose-pre:m-0 prose-pre:rounded-md"
            />
            <p className="text-right mt-2">Word Count: {editor?.storage.characterCount.words()}</p>
        </div>
    );
}


export default RichTextEditor;
