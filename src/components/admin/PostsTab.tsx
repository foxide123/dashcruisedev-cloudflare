// src/components/admin/PostsTab.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabaseClient';
import sanitizeHtml from 'sanitize-html';

// We import the CSS for Quill
import 'quill/dist/quill.snow.css';

type Post = {
    id: string;
    title: string;
    image_url: string | null;
    content: string;
};

export default function PostsTab() {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // 1️⃣ Load existing posts
    useEffect(() => {
        supabase
            .from<Post>('posts')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data, error }) => {
                if (error) console.error('Load posts error:', error.message);
                else setPosts(data || []);
            });
    }, []);

    // 2️⃣ Dynamically import Quill and instantiate once
    useEffect(() => {
        if (!editorRef.current) return;
        // Only load Quill in the browser
        import('quill').then((QuillModule) => {
            const Quill = QuillModule.default;
            quillRef.current = new Quill(editorRef.current!, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image']
                    ]
                }
            });
        });
    }, []);

    // 3️⃣ Save handler pulls HTML from the editor
    const savePost = async () => {
        if (!title.trim()) return alert('Title is required');
        const rawHtml = quillRef.current.root.innerHTML;
        const clean = sanitizeHtml(rawHtml, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ['src', 'alt', 'width', 'height']
            }
        });

        const { data, error } = await supabase
            .from<Post>('posts')
            .insert([
                {
                    title,
                    image_url: imageUrl || null,
                    content: clean
                }
            ])
            .select();

        if (error) {
            console.error('Save error:', error.message);
            alert('Error saving post');
        } else {
            setPosts((prev) => [data![0], ...prev]);
            setTitle('');
            setImageUrl('');
            // Clear Quill editor
            quillRef.current.setContents([]);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Posts</h2>

            <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                className="border p-2 w-full mb-4 rounded"
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <div className="mb-4">
                {/* This div becomes the Quill editor */}
                <div ref={editorRef} className="min-h-[200px] bg-white" />
            </div>

            <button
                onClick={savePost}
                className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
            >
                Save Post
            </button>

            <div className="space-y-6">
                {posts.map((p) => (
                    <div key={p.id} className="border p-4 rounded bg-white">
                        <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                        {p.image_url && (
                            <img
                                src={p.image_url}
                                alt=""
                                className="mb-2 max-w-full rounded"
                            />
                        )}
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: p.content }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
