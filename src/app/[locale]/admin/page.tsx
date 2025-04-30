'use client';

import { useState } from 'react';
import OverviewTab from '@/components/admin/OverviewTab';
import ProjectsTab from '@/components/admin/ProjectsTab';
import ClientChatTab from "@/components/admin/ClientChatTab";
import ProductsTab from '@/components/admin/ProductsTab';
import PostsTab from '@/components/admin/PostsTab';

const TABS = ['Overview', 'Projects', 'Chat', 'Products', 'Posts'] as const;
type Tab = typeof TABS[number];

export default function AdminPage() {
    const [active, setActive] = useState<Tab>('Overview');

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex space-x-4 mb-6 overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`px-4 py-2 rounded-lg ${
                            active === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div>
                {active === 'Overview' && <OverviewTab />}
                {active === 'Projects' && <ProjectsTab />}
                {active === 'Chat' && <ClientChatTab />}
                {active === 'Products' && <ProductsTab />}
                {active === 'Posts' && <PostsTab />}
            </div>
        </div>
    );
}
