'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { posts } from '@/data/posts';
import Link from 'next/link';

export default function BlogPage() {
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
                        {t('blog.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        {t('blog.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col md:flex-row gap-8 items-start"
                        >
                            <Link href={`/blog/${post.id}`} className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-lg block">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </Link>

                            <div className="flex-1 py-2">
                                <div className="flex items-center gap-4 text-xs text-gold-500 mb-4 uppercase tracking-wider font-medium">
                                    <div className="flex items-center gap-1">
                                        <Tag size={14} />
                                        {post.category}
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <Calendar size={14} />
                                        {post.date}
                                    </div>
                                </div>

                                <Link href={`/blog/${post.id}`} className="block">
                                    <h2 className="font-serif text-2xl mb-3 group-hover:text-gold-400 transition-colors">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gold-500 transition-colors group/btn">
                                    {t('blog.readMore')}
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
