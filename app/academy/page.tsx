'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { Play, Clock, BarChart } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { videos } from '@/data/videos';
import Link from 'next/link';

export default function AcademyPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-navy-900 text-white">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-serif text-4xl md:text-6xl text-gold-500 mb-6">
                        {t('academy.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        {t('academy.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-navy-800 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10"
                        >
                            <Link href={`/academy/${video.id}`} className="block h-full">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                            <Play fill="currentColor" className="ml-1" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-gold-400 mb-3 uppercase tracking-wider font-medium">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {video.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BarChart size={14} />
                                            {t(`academy.level.${video.level}`)}
                                        </div>
                                    </div>

                                    <h3 className="font-serif text-xl mb-2 group-hover:text-gold-400 transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {video.description}
                                    </p>

                                    <span
                                        className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gold-500 transition-colors"
                                    >
                                        {t('academy.watch')}
                                        <Play size={14} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
