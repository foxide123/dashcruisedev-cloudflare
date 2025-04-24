'use client';
import dynamic from 'next/dynamic';

const ChatTab = dynamic(
    () => import('@/components/admin/ChatTab'),
    { ssr: false }
);

export default function ClientChatTab() {
    return <ChatTab />;
}
