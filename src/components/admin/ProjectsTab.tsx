// src/components/admin/ProjectsTab.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';  //:contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}

const DUMMY = Array.from({ length: 8 }).map((_, i) => ({
    id: 2000+i,
    client: `Client ${i+1}`,
    invoice: 500 + i*75,
    repo: '#',
    due: `2025-06-${10+i}`,
    progress: Math.floor(Math.random()*100)
}));

export default function ProjectsTab() {
    const [filter, setFilter] = useState('');
    const data = DUMMY.filter((p) => p.client.toLowerCase().includes(filter.toLowerCase()));

    return (
        <motion.section
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-xl mb-6"
        >
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search clients…"
                className="mb-4 w-full border rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-indigo-50">
                    <tr>
                        {['ID','Client','Invoice','GitHub','Due','Progress'].map((h) => (
                            <th key={h} className="px-4 py-2 text-left font-medium text-gray-700">
                                {h}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((p) => (
                        <motion.tr
                            key={p.id}
                            whileHover={{ backgroundColor: '#EEF2FF' }}
                            className="border-b"
                        >
                            <td className="px-4 py-2">#{p.id}</td>
                            <td className="px-4 py-2">{p.client}</td>
                            <td className="px-4 py-2">$ {p.invoice}</td>
                            <td className="px-4 py-2 text-indigo-600 hover:underline">
                                <a href={p.repo}>repo</a>
                            </td>
                            <td className="px-4 py-2">{p.due}</td>
                            <td className="px-4 py-2 w-48">
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${p.progress}%` }}
                                        transition={{ duration: 0.8 }}
                                        className="h-full bg-indigo-500"
                                    />
                                </div>
                                <span className="text-sm text-gray-600 ml-2">{p.progress}%</span>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
}
