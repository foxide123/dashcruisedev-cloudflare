'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';

type Message = {
    id: string;
    text: string;
    sender: 'admin' | 'client';
    created_at: string;
};

const supabase = createClient();

export default function ChatTab() {
    const [msgs, setMsgs] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let channel: ReturnType<typeof supabase.channel>;
        (async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true });
            if (error) console.error(error);
            else setMsgs(data || []);

            channel = supabase
                .channel('messages')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'messages' },
                    ({ new: m }) => setMsgs((prev) => [...prev, m as Message])
                )
                .subscribe();
        })();
        return () => void (channel && supabase.removeChannel(channel));
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs]);

    const send = async () => {
        if (!text.trim()) return;
        await supabase.from('messages').insert({ text, sender: 'admin' });
        setText('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-[70vh] bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl overflow-hidden"
        >
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence initial={false}>
                    {msgs.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className={`max-w-xs px-4 py-2 rounded-2xl break-words ${
                                m.sender === 'admin'
                                    ? 'bg-blue-200 self-end text-right'
                                    : 'bg-gray-200 self-start text-left'
                            }`}
                        >
                            {m.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={endRef} />
            </div>

            <div className="p-3 bg-white border-t flex items-center space-x-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <motion.button
                    onClick={send}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
                >
                    Send
                </motion.button>
            </div>
        </motion.div>
    );
}
