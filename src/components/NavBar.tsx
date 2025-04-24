// app/components/NavBar.tsx
'use client';
import Link from 'next/link';

export default function NavBar() {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/admin', label: 'Admin Dashboard' }
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                <div className="text-xl font-bold">MyApp</div>
                <div className="space-x-4 flex">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="text-gray-700 hover:text-gray-900"
                        >
              <span
                  className="inline-block"
                  style={{ willChange: 'transform' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {l.label}
              </span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
