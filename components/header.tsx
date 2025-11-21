'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { LanguageSwitch } from '@/components/language-switch';
import { Menu, X } from 'lucide-react';

export function Header() {
    const { t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (id?: string, href?: string) => {
        setIsMobileMenuOpen(false);

        if (href) {
            router.push(href);
            return;
        }

        if (id) {
            if (pathname === '/') {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                router.push(`/#${id}`);
            }
        }
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/') {
            // Try to find the snap container first
            const snapContainer = document.querySelector('.snap-container');
            if (snapContainer) {
                snapContainer.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Fallback to window scroll
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            router.push('/');
        }
    };

    const menuItems = [
        { label: t('nav.about'), id: 'about' },
        { label: t('nav.services'), id: 'services' },
        { label: t('nav.formation'), id: 'formation' },
        { label: t('nav.academy'), href: '/academy' },
        { label: t('nav.blog'), href: '/blog' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || pathname !== '/'
                ? 'bg-navy-900/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg'
                : 'bg-gradient-to-b from-navy-900/90 via-navy-900/50 to-transparent py-6'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" onClick={handleLogoClick} className="group flex items-center gap-2">
                        <div className="relative w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-gold-500 transition-colors duration-300">
                            <span className="font-serif text-xl font-bold text-white group-hover:text-gold-500 transition-colors duration-300">LB</span>
                        </div>
                        <span className="text-lg font-light text-white tracking-widest uppercase hidden sm:block">
                            Advisor
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item.id, item.href)}
                                className={`text-xs uppercase tracking-[0.2em] hover:text-gold-500 transition-colors duration-300 font-medium ${(item.href && pathname === item.href) ? 'text-gold-500' : 'text-gray-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}

                        <button
                            onClick={() => handleNavigation('contact')}
                            className="px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:bg-gold-500 hover:border-gold-500 hover:text-navy-900 transition-all duration-300"
                        >
                            {t('nav.cta')}
                        </button>
                        <LanguageSwitch />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-4">
                        <LanguageSwitch />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white p-2 hover:text-gold-500 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-navy-900 border-t border-white/10 py-8 px-6 flex flex-col gap-6 shadow-2xl">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item.id, item.href)}
                                className={`text-left text-sm uppercase tracking-[0.2em] hover:text-gold-500 transition-colors font-medium ${(item.href && pathname === item.href) ? 'text-gold-500' : 'text-gray-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNavigation('contact')}
                            className="text-left px-6 py-3 border border-white/20 text-white text-sm uppercase tracking-[0.2em] hover:bg-gold-500 hover:border-gold-500 hover:text-navy-900 transition-all duration-300 w-fit"
                        >
                            {t('nav.cta')}
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}
