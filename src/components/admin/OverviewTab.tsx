// src/components/admin/OverviewTab.tsx
import { motion } from 'framer-motion';

export default function OverviewTab() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold">All Website Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map over your orders */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-white shadow rounded-lg"
                    >
                        <h2 className="font-semibold">Order #{1000 + i}</h2>
                        <p className="text-gray-500">Client: Acme Corp</p>
                        <p className="mt-2 text-sm">Status: 🚀 In Progress</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
