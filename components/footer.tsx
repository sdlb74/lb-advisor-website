'use client';

import { useLanguage } from '@/lib/language-context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();

    const handleNavigation = (id?: string, href?: string) => {
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

    return (
        <footer className="snap-section min-h-screen flex flex-col justify-center bg-navy-900 text-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/90 to-navy-900/80" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                                <span className="font-serif text-2xl font-bold text-white">LB</span>
                            </div>
                            <span className="text-2xl font-light tracking-widest uppercase">
                                Advisor
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-md mb-8 font-light text-lg">
                            {t('footer.description')}
                        </p>
                        <div className="space-y-4">
                            <a href="mailto:contact@lb-advisor.com" className="flex items-center gap-4 text-gray-400 hover:text-gold-500 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <span className="tracking-wide">contact@lb-advisor.com</span>
                            </a>
                            <div className="flex items-center gap-4 text-gray-400 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin size={18} />
                                </div>
                                <span className="tracking-wide">{t('footer.location')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-3 lg:col-start-7">
                        <h4 className="text-gold-500 text-xs uppercase tracking-[0.2em] font-bold mb-8">{t('footer.services')}</h4>
                        <ul className="space-y-4">
                            {[
                                { label: t('nav.services'), id: 'services' },
                                { label: t('nav.formation'), id: 'formation' },
                                { label: t('nav.academy'), href: '/academy' },
                                { label: t('nav.blog'), href: '/blog' }
                            ].map((item) => (
                                <li key={item.label}>
                                    <button
                                        onClick={() => handleNavigation(item.id, item.href)}
                                        className="text-gray-400 hover:text-white transition-colors text-left font-light hover:translate-x-2 transition-transform duration-300"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="text-gold-500 text-xs uppercase tracking-[0.2em] font-bold mb-8">{t('footer.company')}</h4>
                        <ul className="space-y-4">
                            {[
                                { label: t('footer.expertise'), id: 'about' },
                                { label: t('footer.vision'), id: 'philosophy' },
                                { label: t('footer.contact'), id: 'contact' }
                            ].map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavigation(item.id)}
                                        className="text-gray-400 hover:text-white transition-colors text-left font-light hover:translate-x-2 transition-transform duration-300"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm font-light tracking-wide">
                        © 2024 LB Advisor | Life-Inc. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">{t('footer.privacy')}</Link>
                        <Link href="/terms-of-service" className="text-gray-500 hover:text-white text-sm transition-colors">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
