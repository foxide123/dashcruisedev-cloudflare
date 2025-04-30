// src/components/ClientScripts.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientScripts() {
    const path = usePathname();

    useEffect(() => {
        if (typeof window.gtag === 'function') {
            window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
                page_path: path
            });
        }
    }, [path]);

    return null;
}
