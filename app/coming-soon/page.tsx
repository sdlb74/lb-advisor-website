'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Bell, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ComingSoonPage() {
    const { language } = useLanguage();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setIsSubmitted(true);
            toast.success(
                language === 'fr'
                    ? 'Merci ! Vous serez notifié du lancement.'
                    : 'Thank you! You\'ll be notified at launch.'
            );
            setEmail('');
        } else {
            toast.error(language === 'fr' ? 'Email invalide' : 'Invalid email');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')] bg-cover bg-center opacity-5" />

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse" />
                            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                                <Sparkles className="text-navy-900" size={40} />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
                        {language === 'fr' ? (
                            <>
                                Bientôt <span className="text-gold-500">Disponible</span>
                            </>
                        ) : (
                            <>
                                Coming <span className="text-gold-500">Soon</span>
                            </>
                        )}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed">
                        {language === 'fr'
                            ? 'Nous préparons quelque chose d\'exceptionnel pour vous.'
                            : 'We\'re preparing something exceptional for you.'}
                    </p>

                    <p className="text-gray-500 mb-12 max-w-xl mx-auto">
                        {language === 'fr'
                            ? 'Cette section est en cours de développement. Inscrivez-vous pour être notifié de son lancement.'
                            : 'This section is under development. Sign up to be notified of its launch.'}
                    </p>

                    {/* Notification Form */}
                    {!isSubmitted ? (
                        <motion.form
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex gap-3">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
                                    className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:ring-gold-500 focus:border-gold-500"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-8 whitespace-nowrap"
                                >
                                    <Bell size={18} className="mr-2" />
                                    {language === 'fr' ? 'Me notifier' : 'Notify me'}
                                </Button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto mb-12 p-6 bg-green-500/10 border border-green-500/20 rounded-lg"
                        >
                            <div className="flex items-center justify-center gap-3 text-green-400">
                                <CheckCircle size={24} />
                                <p className="font-medium">
                                    {language === 'fr'
                                        ? 'Vous serez notifié du lancement !'
                                        : 'You\'ll be notified at launch!'}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Back to Home */}
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 hover:text-gold-500 transition-all"
                        >
                            <ArrowLeft size={18} className="mr-2" />
                            {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
                        </Button>
                    </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border border-gold-500/20 rounded-full animate-spin-slow" />
                <div className="absolute bottom-10 right-10 w-32 h-32 border border-gold-500/10 rounded-full animate-spin-slow-reverse" />
            </div>
        </div>
    );
}
