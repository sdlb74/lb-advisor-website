'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';

const sections = [
    { id: 'hero', labelFr: 'Accueil', labelEn: 'Home' },
    { id: 'about', labelFr: 'À propos', labelEn: 'About' },
    { id: 'services', labelFr: 'Services', labelEn: 'Services' },
    { id: 'stats', labelFr: 'Chiffres', labelEn: 'Stats' },
    { id: 'philosophy', labelFr: 'Philosophie', labelEn: 'Philosophy' },
    { id: 'formation', labelFr: 'Formation', labelEn: 'Training' },
    { id: 'contact', labelFr: 'Contact', labelEn: 'Contact' },
];

export function SectionNavigator() {
    const { language } = useLanguage();
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section) {
                    const offsetTop = section.offsetTop;
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(sections[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <div className="flex flex-col gap-4">
                {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const label = language === 'fr' ? section.labelFr : section.labelEn;

                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group relative flex items-center justify-end"
                            aria-label={`Go to ${label}`}
                        >
                            {/* Label (appears on hover) */}
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                className="absolute right-10 px-3 py-1 bg-navy-900/90 backdrop-blur-sm border border-gold-500/20 rounded text-xs font-medium text-gray-300 whitespace-nowrap pointer-events-none"
                            >
                                {label}
                            </motion.span>

                            {/* Dot indicator */}
                            <div className="relative w-3 h-3">
                                {/* Outer ring (appears when active) */}
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute inset-0 -m-1 rounded-full border-2 border-gold-500"
                                    />
                                )}

                                {/* Inner dot */}
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1 : 0.6,
                                        backgroundColor: isActive ? '#D4AF37' : '#6B7280',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`w-full h-full rounded-full group-hover:bg-gold-500 transition-colors`}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
