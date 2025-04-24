// src/components/BackgroundAnimation.tsx
'use client';
import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
    const blobs = [
        { size: 400, x: -200, y: -100, delay: 0 },
        { size: 300, x: 500, y: 200, delay: 3 },
        { size: 500, x: 200, y: 600, delay: 6 }
    ];

    return (
        <div className="absolute inset-0 overflow-hidden -z-10">
            {blobs.map((b, i) => (
                <motion.div
                    key={i}
                    initial={{ x: b.x, y: b.y, scale: 1 }}
                    animate={{ x: b.x + 100, y: b.y - 100, scale: 1.2 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 12,
                        delay: b.delay,
                        ease: 'easeInOut'
                    }}
                    className="absolute rounded-full mix-blend-multiply opacity-30 filter blur-2xl"
                    style={{
                        width: b.size,
                        height: b.size,
                        background: `linear-gradient(45deg, #6EE7B7, #3B82F6)`
                    }}
                />
            ))}
        </div>
    );
}
