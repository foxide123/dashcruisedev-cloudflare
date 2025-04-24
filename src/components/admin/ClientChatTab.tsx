'use client';

import dynamic from 'next/dynamic';

const ChatTab = dynamic(
    () =>
        import('@/components/admin/ChatTab').then((mod) => {
            if (!mod.default) {
                throw new Error('ChatTab has no default export');
            }
            return mod.default;
        }),
    { ssr: false }
);

export default function ClientChatTab() {
    return <ChatTab />;
}
