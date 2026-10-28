import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Localized, Locale } from '../content/types';
import { en, type Dict } from './en';
import { es } from './es';
import { pt } from './pt';
import { updateState, useProgress } from '../lib/store';

const dictionaries: Record<Locale, Dict> = { en, es, pt };

/** Full dictionary for a locale, for list-valued strings. */
export function dictionaryFor(locale: Locale): Dict {
  return dictionaries[locale];
}

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Dictionary lookup for interface strings. Use `{name}` placeholders. */
  t: (path: string, vars?: Record<string, string | number>) => string;
  /** Picks the translation of content, falling back to English. */
  pick: (text: Localized) => { text: string; fallback: boolean };
}

const I18nContext = createContext<I18nValue | null>(null);

function lookup(dict: Dict, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return (acc as Record<string, unknown>)[key];
    return undefined;
  }, dict);
  return typeof value === 'string' ? value : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const { locale } = useProgress();

  const value = useMemo<I18nValue>(() => {
    const dict = dictionaries[locale];
    return {
      locale,
      setLocale: (next) => updateState((s) => ({ ...s, locale: next })),
      t: (path, vars) => {
        let out = lookup(dict, path);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) out = out.replace(`{${k}}`, String(v));
        }
        return out;
      },
      pick: (text) => {
        const translated = locale === 'en' ? text.en : text[locale];
        if (translated) return { text: translated, fallback: false };
        return { text: text.en, fallback: true };
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
