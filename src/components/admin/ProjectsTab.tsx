// src/components/admin/ProjectsTab.tsx
import { motion } from 'framer-motion';

export default function ProjectsTab() {
    return (
        <motion.section
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold">Projects</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead>
                    <tr className="text-left border-b">
                        {['ID','Client','Invoice','GitHub','Due'].map((h) => (
                            <th key={h} className="px-4 py-2">{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-2">#{2000+i}</td>
                            <td className="px-4 py-2">Client {i+1}</td>
                            <td className="px-4 py-2">$ {500+i*50}</td>
                            <td className="px-4 py-2">
                                <a href="#" className="text-blue-600 hover:underline">repo.link</a>
                            </td>
                            <td className="px-4 py-2">2025-05-{10+i}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
}
