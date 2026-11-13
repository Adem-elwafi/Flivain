import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { en } from './en';
import type { TranslationSchema } from './en';
import { ar } from './ar';
import type { Locale, Direction, NestedKeyOf } from './types';

export type TranslationKey = NestedKeyOf<TranslationSchema>;

interface I18nContextType {
  locale: Locale;
  dir: Direction;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const translations: Record<Locale, TranslationSchema> = { en, ar };

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode; defaultLocale?: Locale }> = ({
  children,
  defaultLocale = 'en',
}) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const dir: Direction = locale === 'ar' ? 'rtl' : 'ltr';

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.title = locale === 'ar' ? 'فليفاين – وكالة حجز طيران' : 'Flivain – Flight Booking Agency';
  }, [locale, dir]);

  const t = useCallback(
    (path: TranslationKey, params?: Record<string, string | number>): string => {
      const keys = (path as string).split('.');
      let current: any = translations[locale];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          // Fallback to English
          let fallback: any = translations.en;
          for (const fbKey of keys) {
            if (fallback && typeof fallback === 'object' && fbKey in fallback) {
              fallback = fallback[fbKey];
            } else {
              return path;
            }
          }
          current = fallback;
          break;
        }
      }

      if (typeof current !== 'string') {
        return path;
      }

      let result = current;
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
        });
      }

      return result;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, dir, setLocale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nProvider;
