'use client';
import dynamic from 'next/dynamic';

const ChatTab = dynamic(
    () => import('@/features/admin/ChatTab'),
    { ssr: false }
);

export default function ClientChatTab() {
    return <ChatTab />;
}
