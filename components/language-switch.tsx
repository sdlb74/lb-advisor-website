'use client';

import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';

export function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
            <Button
                variant="ghost"
                size="sm"
                className={`text-xs px-3 py-1 h-7 transition-all ${language === 'fr'
                        ? 'bg-white text-slate-900'
                        : 'text-white hover:bg-white/20'
                    }`}
                onClick={() => setLanguage('fr')}
            >
                FR
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className={`text-xs px-3 py-1 h-7 transition-all ${language === 'en'
                        ? 'bg-white text-slate-900'
                        : 'text-white hover:bg-white/20'
                    }`}
                onClick={() => setLanguage('en')}
            >
                EN
            </Button>
        </div>
    );
}
