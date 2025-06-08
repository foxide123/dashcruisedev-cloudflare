// src/components/NavBar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin Dashboard' }
];

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        MyApp
                    </motion.span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="relative">
                            <motion.span
                                whileHover={{ scale: 1.1, color: '#2563EB' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="text-gray-700 cursor-pointer"
                            >
                                {l.label}
                            </motion.span>
                            <motion.span
                                layoutId="underline"
                                className="absolute left-0 bottom-0 h-1 bg-blue-500"
                                initial={false}
                                animate={open ? {} : { width: 0 }}
                            />
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white/90 backdrop-blur-md overflow-hidden"
                    >
                        <div className="flex flex-col px-4 py-5 space-y-4">
                            {links.map((l) => (
                                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                                    <motion.span
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.05, color: '#2563EB' }}
                                        className="text-gray-700 text-lg"
                                    >
                                        {l.label}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
