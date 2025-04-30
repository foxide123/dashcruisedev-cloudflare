'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';  // :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7}

type Props = { project: { id: number; name: string } };
type Issue = { id: number; text: string };

export default function ProjectDetail({ project }: Props) {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [newIssue, setNewIssue] = useState('');
    const [info, setInfo] = useState<{ invoice_url: string; github_url: string } | null>(null);

    useEffect(() => {
        supabase
            .from('project_info')
            .select('*')
            .eq('project_id', project.id)
            .single()
            .then(({ data }) => data && setInfo(data));

        supabase
            .from<Issue>('issues')
            .select('*')
            .eq('project_id', project.id)
            .then(({ data }) => data && setIssues(data));
    }, [project.id]);

    const addIssue = async () => {
        if (!newIssue.trim()) return;
        const { data } = await supabase
            .from('issues')
            .insert({ project_id: project.id, text: newIssue })
            .select();
        if (data) setIssues((prev) => [...prev, data[0]]);
        setNewIssue('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-xl space-y-6"
        >
            <h3 className="text-2xl font-semibold">{project.name}</h3>

            {info && (
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href={info.invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-4 bg-green-50 rounded-xl shadow hover:scale-105 transition"
                    >
                        View Invoice
                    </a>
                    <a
                        href={info.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-4 bg-gray-50 rounded-xl shadow hover:scale-105 transition"
                    >
                        GitHub Repo
                    </a>
                </div>
            )}

            <div>
                <h4 className="font-medium mb-2">Issues / Todos</h4>
                <ul className="space-y-2">
                    <AnimatePresence>
                        {issues.map((i) => (
                            <motion.li
                                key={i.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-gray-100 p-2 rounded-lg"
                            >
                                {i.text}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
                <div className="mt-4 flex space-x-2">
                    <input
                        value={newIssue}
                        onChange={(e) => setNewIssue(e.target.value)}
                        className="flex-grow border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
                        placeholder="New issue"
                    />
                    <motion.button
                        onClick={addIssue}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 bg-green-600 text-white rounded-lg shadow"
                    >
                        Add
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
