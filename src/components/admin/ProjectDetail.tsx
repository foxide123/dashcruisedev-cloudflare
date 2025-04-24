'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
        if (!newIssue) return;
        const { data } = await supabase
            .from('issues')
            .insert({ project_id: project.id, text: newIssue })
            .select();
        if (data) setIssues((prev) => [...prev, data[0]]);
        setNewIssue('');
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            {info && (
                <div className="mb-4 space-y-1">
                    <a href={info.invoice_url} className="text-blue-600 hover:underline">
                        View Invoice
                    </a>
                    <a href={info.github_url} className="text-blue-600 hover:underline">
                        GitHub Repo
                    </a>
                </div>
            )}

            <div className="mb-4">
                <h4 className="font-medium">Issues / Todos</h4>
                <ul className="list-disc ml-6 space-y-1">
                    {issues.map((i) => (
                        <li key={i.id}>{i.text}</li>
                    ))}
                </ul>
                <div className="mt-2 flex space-x-2">
                    <input
                        value={newIssue}
                        onChange={(e) => setNewIssue(e.target.value)}
                        className="border px-2 rounded flex-grow"
                        placeholder="New issue"
                    />
                    <button onClick={addIssue} className="px-3 bg-green-600 text-white rounded">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
