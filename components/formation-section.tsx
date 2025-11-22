'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Briefcase, Users, Code, CheckCircle, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

export function FormationSection() {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const paths = [
        { id: 'path2', number: '01', icon: Briefcase, width: 'w-full' },           // 100%
        { id: 'path1', number: '02', icon: Cloud, width: 'md:w-11/12' },          // 91.67%
        { id: 'path3', number: '03', icon: Users, width: 'md:w-10/12' },          // 83.33%
        { id: 'path4', number: '04', icon: Code, width: 'md:w-9/12' }             // 75%
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="formation" className="min-h-screen flex flex-col justify-center bg-navy-900 py-20" ref={ref}>
            <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                        {t('formation.label')}
                    </span>
                    <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
                        {t('formation.title')}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {t('formation.intro')}
                    </p>
                </motion.div>

                {/* Pyramid Accordion Stack */}
                <div className="flex flex-col items-center gap-4 mb-16">
                    {paths.map((path, index) => (
                        <motion.div
                            key={path.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`${path.width} w-full`}
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full bg-navy-800/50 border border-white/5 hover:border-gold-500/30 p-6 flex items-center justify-between transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-serif text-white/10 group-hover:text-gold-500/20 transition-colors duration-500">
                                        {path.number}
                                    </span>
                                    <path.icon size={24} className="text-gold-500" />
                                    <div className="text-left">
                                        <h3 className="text-lg font-serif text-white group-hover:text-gold-400 transition-colors duration-300">
                                            {t(`formation.${path.id}.title`)}
                                        </h3>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                                            {t(`formation.${path.id}.audience`)}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-gold-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Accordion Content */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-navy-800/30 border-x border-b border-white/5 p-8">
                                            {/* Proof Story */}
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 italic border-l-2 border-gold-500/30 pl-4">
                                                "{t(`formation.${path.id}.proof`)}"
                                            </p>

                                            {/* Learning Points */}
                                            <div className="mb-6">
                                                <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Points Clés</h4>
                                                <ul className="space-y-2">
                                                    {[1, 2, 3].map((i) => (
                                                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                                            <CheckCircle size={14} className="text-gold-500/70 mt-0.5 shrink-0" />
                                                            <span>{t(`formation.${path.id}.learn${i}`)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Footer Info */}
                                            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div className="text-xs text-gray-500">
                                                    <span className="font-medium text-gray-400">Certifications: </span>
                                                    {t(`formation.${path.id}.certifications`)}
                                                </div>
                                                <a
                                                    href="#contact"
                                                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300"
                                                >
                                                    <span>Programme</span>
                                                    <ArrowRight size={14} />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Transversal Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-navy-800 rounded-2xl p-8 md:p-12 relative overflow-hidden text-center md:text-left border border-white/5"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                <Sparkles className="text-gold-500" size={24} />
                                <h3 className="text-2xl font-serif text-white">
                                    {t('formation.transversal.title')}
                                </h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                {t('formation.transversal.text')}
                            </p>
                        </div>

                        <a
                            href="#contact"
                            className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-8 py-4 rounded font-semibold transition-colors whitespace-nowrap shadow-lg shadow-gold-500/20"
                        >
                            {t('formation.cta')}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
