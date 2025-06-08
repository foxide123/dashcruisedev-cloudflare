// src/components/admin/ProductsTab.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';  //:contentReference[oaicite:4]{index=4}&#8203;:contentReference[oaicite:5]{index=5}

type Product = { id: number; name: string };

export default function ProductsTab() {
    const [items, setItems] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        supabase.from('products').select('*').then(({ data }) => data && setItems(data));
    }, []);

    const add = async () => {
        if (!name.trim()) return;
        const { data } = await supabase.from('products').insert({ name }).select();
        if (data) setItems((prev) => [...prev, data[0]]);
        setName('');
    };

    const visible = items.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-xl"
        >
            <h1 className="text-2xl font-semibold mb-4">Products & Services</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter products…"
                    className="flex-grow border rounded-full px-4 py-2 focus:ring-2 focus:ring-purple-400"
                />
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New item"
                    className="border rounded-full px-4 py-2 focus:ring-2 focus:ring-green-400"
                />
                <motion.button
                    onClick={add}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg"
                >
                    Add
                </motion.button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((p) => (
                    <motion.div
                        key={p.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-tr from-purple-50 to-purple-100 rounded-2xl shadow"
                    >
                        {p.name}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
