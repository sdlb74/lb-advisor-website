'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-navy-900 text-white flex items-center justify-center p-6">
            <div className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-9xl text-gold-500 mb-4"
                >
                    404
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-light mb-8"
                >
                    Page introuvable / Page Not Found
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors group uppercase tracking-widest text-sm"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Retour à l'accueil / Back to Home</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
