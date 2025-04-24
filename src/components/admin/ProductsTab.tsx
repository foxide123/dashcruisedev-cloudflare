'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Product = { id: number; name: string };

export default function ProductsTab() {
    const [items, setItems] = useState<Product[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        supabase.from<Product>('products').select('*').then(({ data }) => data && setItems(data));
    }, []);

    const add = async () => {
        if (!name) return;
        const { data } = await supabase.from('products').insert({ name }).select();
        if (data) setItems((prev) => [...prev, data[0]]);
        setName('');
    };

    return (
        <div>
            <ul className="mb-4 list-disc ml-5">
                {items.map((p) => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
            <div className="flex space-x-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-2 rounded flex-grow"
                    placeholder="New product/service"
                />
                <button onClick={add} className="px-4 bg-green-600 text-white rounded">
                    Add
                </button>
            </div>
        </div>
    );
}
