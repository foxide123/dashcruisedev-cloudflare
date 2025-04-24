// src/components/admin/ChatTab.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Message = {
    id: string;
    text: string;
    sender: 'admin' | 'client';
    created_at: string;
};

export default function ChatTab() {
    const [msgs, setMsgs] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let channel: ReturnType<typeof supabase.channel>;

        (async () => {
            // fetch existing
            const { data, error } = await supabase
                .from<Message>('messages')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) console.error('Fetch error:', error.message);
            else setMsgs(data || []);

            // realtime
            channel = supabase
                .channel('messages')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'messages' },
                    ({ new: m }) => setMsgs((prev) => [...prev, m as Message])
                )
                .subscribe();
        })();

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs]);

    const send = async () => {
        if (!text.trim()) return;
        const { error } = await supabase
            .from('messages')
            .insert({ text, sender: 'admin' });

        if (error) console.error('Insert error:', error.message);
        else setText('');
    };

    return (
        <div className="flex flex-col h-[60vh]">
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white rounded">
                {msgs.map((m) => (
                    <div
                        key={m.id}
                        className={`p-2 rounded ${
                            m.sender === 'admin'
                                ? 'bg-blue-100 self-end'
                                : 'bg-gray-100 self-start'
                        }`}
                    >
                        {m.text}
                    </div>
                ))}
                <div ref={endRef} />
            </div>
            <div className="mt-2 flex">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-grow border rounded-l px-2"
                    placeholder="Type a message…"
                />
                <button onClick={send} className="px-4 bg-blue-600 text-white rounded-r">
                    Send
                </button>
            </div>
        </div>
    );
}
