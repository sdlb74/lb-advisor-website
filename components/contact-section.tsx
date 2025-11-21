'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, Mail, Building, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    phone?: string;
}

export function ContactSection() {
    const { t, language } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        requestType: '',
        serviceInterest: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'name':
                if (!value.trim()) return t('contact.validation.nameRequired');
                if (value.trim().length < 2) return t('contact.validation.nameMin');
                break;
            case 'email':
                if (!value.trim()) return t('contact.validation.emailRequired');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return t('contact.validation.emailInvalid');
                break;
            case 'message':
                if (!value.trim()) return t('contact.validation.messageRequired');
                if (value.trim().length < 10) return t('contact.validation.messageMin');
                break;
            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) return t('contact.validation.phoneInvalid');
                break;
        }
        return undefined;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched.has(name)) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => new Set(prev).add(name));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {};
        ['name', 'email', 'message'].forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) newErrors[field as keyof FormErrors] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched(new Set(['name', 'email', 'message']));
            return;
        }

        setIsSubmitting(true);

        try {
            // Build subject with categorization
            const requestTypeLabel = formData.requestType ? ` - ${formData.requestType}` : '';
            const serviceLabel = formData.serviceInterest ? ` - ${formData.serviceInterest}` : '';

            const gmailSubject = language === 'fr'
                ? `[${formData.requestType || 'Demande'}]${serviceLabel} ${formData.subject || 'Nouveau contact depuis lb-advisor.com'}`
                : `[${formData.requestType || 'Request'}]${serviceLabel} ${formData.subject || 'New contact from lb-advisor.com'}`;

            const gmailBody = `${language === 'fr' ? 'Type de demande' : 'Request Type'}: ${formData.requestType || 'N/A'}\n${language === 'fr' ? 'Service' : 'Service'}: ${formData.serviceInterest || 'N/A'}\n\n${language === 'fr' ? 'Nom' : 'Name'}: ${formData.name}\n${language === 'fr' ? 'Email' : 'Email'}: ${formData.email}\n${language === 'fr' ? 'Entreprise' : 'Company'}: ${formData.company || 'N/A'}\n${language === 'fr' ? 'Téléphone' : 'Phone'}: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message}`;

            const gmailUrl = `https://mail.google.com/mail/u/0/#compose?to=contact@lb-advisor.com&su=${encodeURIComponent(
                gmailSubject
            )}&body=${encodeURIComponent(gmailBody)}`;

            window.open(gmailUrl, '_blank');

            setIsSubmitted(true);
            toast.success(t('contact.form.success'));

            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    requestType: '',
                    serviceInterest: '',
                    subject: '',
                    message: ''
                });
                setErrors({});
                setTouched(new Set());
                setIsSubmitted(false);
            }, 3000);

        } catch (error) {
            toast.error(t('contact.form.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="snap-section min-h-screen flex items-center bg-navy-900 relative overflow-hidden" ref={ref}>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold mb-6 block">
                            {t('contact.label')}
                        </span>
                        <h2 className="font-serif text-4xl lg:text-6xl text-white mb-8 leading-tight">
                            {t('contact.title.ready')} <span className="italic text-gold-400">{t('contact.title.evolve')}</span> ?
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed mb-12 font-light">
                            {t('contact.subtitle')}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center border border-white/10">
                                    <Mail className="text-gold-500" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{t('contact.form.emailLabel')}</p>
                                    <a href="mailto:contact@lb-advisor.com" className="text-white hover:text-gold-400 transition-colors text-lg">contact@lb-advisor.com</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center border border-white/10">
                                    <Building className="text-gold-500" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{t('contact.office.label')}</p>
                                    <p className="text-white text-lg">{t('contact.office.location')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-navy-800/50 backdrop-blur-sm p-8 lg:p-12 border border-white/10"
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <CheckCircle size={64} className="text-gold-500 mx-auto mb-6" />
                                <h3 className="text-2xl font-serif text-white mb-4">{t('contact.form.thankYou')}</h3>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    {t('contact.form.thankYouMessage')}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Request Type and Service Interest */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.requestType')}</label>
                                        <Select
                                            name="requestType"
                                            value={formData.requestType}
                                            onChange={handleInputChange}
                                            className="bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none"
                                        >
                                            <option value="">{t('contact.form.selectType')}</option>
                                            <option value={t('contact.form.type.consulting')}>{t('contact.form.type.consulting')}</option>
                                            <option value={t('contact.form.type.training')}>{t('contact.form.type.training')}</option>
                                            <option value={t('contact.form.type.implementation')}>{t('contact.form.type.implementation')}</option>
                                            <option value={t('contact.form.type.support')}>{t('contact.form.type.support')}</option>
                                            <option value={t('contact.form.type.partnership')}>{t('contact.form.type.partnership')}</option>
                                            <option value={t('contact.form.type.other')}>{t('contact.form.type.other')}</option>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.serviceInterest')}</label>
                                        <Select
                                            name="serviceInterest"
                                            value={formData.serviceInterest}
                                            onChange={handleInputChange}
                                            className="bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none"
                                        >
                                            <option value="">{t('contact.form.selectService')}</option>
                                            <option value={t('contact.form.service1')}>{t('contact.form.service1')}</option>
                                            <option value={t('contact.form.service2')}>{t('contact.form.service2')}</option>
                                            <option value={t('contact.form.service3')}>{t('contact.form.service3')}</option>
                                            <option value={t('contact.form.service4')}>{t('contact.form.service4')}</option>
                                            <option value={t('contact.form.service.multi')}>{t('contact.form.service.multi')}</option>
                                            <option value={t('contact.form.service.notSure')}>{t('contact.form.service.notSure')}</option>
                                        </Select>
                                    </div>
                                </div>

                                {/* Name and Email */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.nameLabel')}</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none ${errors.name && touched.has('name') ? 'border-red-500 focus:border-red-500' : ''}`}
                                        />
                                        {errors.name && touched.has('name') && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-1 text-red-400 text-xs"
                                            >
                                                <AlertCircle size={12} />
                                                <span>{errors.name}</span>
                                            </motion.div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.emailLabel')}</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none ${errors.email && touched.has('email') ? 'border-red-500 focus:border-red-500' : ''}`}
                                        />
                                        {errors.email && touched.has('email') && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-1 text-red-400 text-xs"
                                            >
                                                <AlertCircle size={12} />
                                                <span>{errors.email}</span>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Company and Phone */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.companyLabel')}</label>
                                        <Input
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.phoneLabel')}</label>
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none ${errors.phone && touched.has('phone') ? 'border-red-500 focus:border-red-500' : ''}`}
                                        />
                                        {errors.phone && touched.has('phone') && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-1 text-red-400 text-xs"
                                            >
                                                <AlertCircle size={12} />
                                                <span>{errors.phone}</span>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.subjectLabel')}</label>
                                    <Input
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="bg-navy-900/50 border-white/10 text-white focus:border-gold-500 h-12 rounded-none"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-gray-400">{t('contact.form.messageLabel')}</label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        rows={4}
                                        className={`bg-navy-900/50 border-white/10 text-white focus:border-gold-500 rounded-none resize-none ${errors.message && touched.has('message') ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {errors.message && touched.has('message') && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-1 text-red-400 text-xs"
                                        >
                                            <AlertCircle size={12} />
                                            <span>{errors.message}</span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold uppercase tracking-widest rounded-none transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-navy-900" />
                                            <span>{t('contact.form.sending')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>{t('contact.form.sendButton')}</span>
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
