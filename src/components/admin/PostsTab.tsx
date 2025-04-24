// src/components/admin/PostsTab.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import sanitizeHtml from 'sanitize-html';
import { supabase } from '@/lib/supabaseClient';
import 'quill/dist/quill.snow.css';

type Post = {
    id: string;
    title: string;
    image_url: string | null;
    content: string;
    created_at: string;
};

export default function PostsTab() {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef  = useRef<any>(null);
    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [content, setContent] = useState('');    // raw HTML from Quill
    const [posts, setPosts] = useState<Post[]>([]);

    // init Quill + load posts
    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            import('quill').then((Q) => {
                const Quill = Q.default;
                quillRef.current = new Quill(editorRef.current!, {
                    theme: 'snow',
                    modules: { toolbar: true }
                });
                quillRef.current.on('text-change', () => {
                    setContent(quillRef.current.root.innerHTML);
                });
            });
        }

        supabase
            .from<Post>('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) {
                    console.error('Load posts error:', error);
                } else {
                    setPosts(data || []);
                }
            })
            .catch((err) => console.error('Unexpected load error:', err));
    }, []);

    const savePost = async () => {
        if (!title.trim()) {
            alert('Title is required');
            return;
        }

        // sanitize only on save
        const cleanHtml = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src','alt'] }
        });

        const { data, error } = await supabase
            .from<Post>('posts')
            .insert([{ title, image_url: imgUrl || null, content: cleanHtml }])
            .select();

        if (error) {
            console.error('Save error:', error);
            alert('Failed to save post');
        } else {
            setPosts((prev) => [data![0], ...prev]);
            setTitle('');
            setImgUrl('');
            quillRef.current.setContents([]);
            setContent('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
        >
            <h2 className="text-3xl font-bold">Manage Posts</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* ─── Form ─── */}
                <div className="space-y-6">
                    <label className="block">
                        <span className="text-gray-700">Title</span>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 w-full border-b-2 border-gray-300 py-2 focus:border-indigo-500 focus:outline-none"
                            placeholder="Enter post title…"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Image URL (optional)</span>
                        <input
                            type="url"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-indigo-400"
                            placeholder="https://..."
                        />
                    </label>

                    <div>
                        <span className="text-gray-700">Content</span>
                        <div ref={editorRef} className="mt-2 h-48 bg-gray-50 rounded-lg" />
                    </div>

                    <motion.button
                        onClick={savePost}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700"
                    >
                        Save Post
                    </motion.button>
                </div>

                {/* ─── Live Preview ─── */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Live Preview</h3>
                    {content ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="prose border p-4 rounded-lg bg-gray-50"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <p className="text-gray-500 italic">Start typing above…</p>
                    )}
                </div>
            </div>

            {/* ─── Existing Posts ─── */}
            <div className="space-y-8">
                {posts.map((p) => (
                    <motion.article
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 bg-indigo-50 rounded-xl shadow"
                    >
                        <h4 className="text-2xl font-bold">{p.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Posted {new Date(p.created_at).toLocaleDateString()}
                        </p>
                        {p.image_url && (
                            <img
                                src={p.image_url}
                                alt=""
                                className="mb-4 rounded-lg shadow-md max-w-full"
                            />
                        )}
                        <div
                            className="prose prose-indigo"
                            dangerouslySetInnerHTML={{ __html: p.content }}
                        />
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
}
