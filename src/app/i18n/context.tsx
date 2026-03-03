/**
 * i18n Context Provider
 * Sistema de internacionalização com React Context
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Locale, I18nContextValue, Translations, CurrencyFormatOptions, DateFormat } from './types';
import { DEFAULT_LOCALE, isValidLocale, LOCALE_STORAGE_KEY } from './config';
import { formatCurrency as formatCurrencyHelper } from '../constants/currencies';

// Import traduções
import { enUS } from './locales/en-US';
import { ptBR } from './locales/pt-BR';
import { esMX } from './locales/es-MX';

// Mapa de traduções
const TRANSLATIONS_MAP: Record<Locale, Translations> = {
  'en-US': enUS,
  'pt-BR': ptBR,
  'es-MX': esMX,
}; // rebuild trigger

// Context
const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Provider do sistema i18n
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Carregar locale salvo ou detectar do navegador
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;
    
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && isValidLocale(saved)) {
      return saved;
    }
    
    return DEFAULT_LOCALE;
  });

  // Traduções atuais
  const translations = useMemo(() => TRANSLATIONS_MAP[locale], [locale]);

  // Atualizar locale e persistir
  const setLocale = useCallback((newLocale: Locale) => {
    if (!isValidLocale(newLocale)) {
      console.warn(`[i18n] Invalid locale: ${newLocale}. Using default: ${DEFAULT_LOCALE}`);
      return;
    }
    
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  /**
   * Função de tradução com suporte a variáveis
   * @param key - Chave da tradução (ex: "offerHub.tabs.all")
   * @param variables - Variáveis para substituir (ex: { amount: "$463" })
   */
  const t = useCallback(
    (key: string, variables?: Record<string, string | number>): string => {
      // Proteção contra translations undefined
      if (!translations) {
        console.warn(`[i18n] Translations not loaded yet for key: ${key}`);
        return key;
      }
      
      // Navega no objeto aninhado usando a chave
      const keys = key.split('.');
      let value: any = translations;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.debug(`[i18n] Translation key not found: ${key}`);
          return key; // Retorna a chave se não encontrar
        }
      }
      
      // Se não é string, retorna a chave
      if (typeof value !== 'string') {
        console.debug(`[i18n] Translation value is not a string: ${key}`);
        return key;
      }
      
      // Substitui variáveis {variableName}
      if (variables) {
        return value.replace(/\{(\w+)\}/g, (match, varName) => {
          return varName in variables ? String(variables[varName]) : match;
        });
      }
      
      return value;
    },
    [translations]
  );

  /**
   * Formata valor monetário
   */
  const formatCurrency = useCallback(
    (value: number, options?: CurrencyFormatOptions): string => {
      const showSymbol = options?.showSymbol ?? true;
      const showCode = options?.showCode ?? false;
      
      return formatCurrencyHelper(value, locale, showSymbol, showCode);
    },
    [locale]
  );

  /**
   * Formata data
   */
  const formatDate = useCallback(
    (date: Date, format: DateFormat = 'medium'): string => {
      // Proteção contra translations undefined
      if (!translations || !translations.dates) {
        return date.toLocaleDateString(locale);
      }
      
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      
      const monthNames = translations.dates.monthShort;
      const dayNames = translations.dates.dayShort;
      
      switch (format) {
        case 'short':
          // pt-BR: 25/02/2026, en-US: 02/25/2026
          if (locale === 'pt-BR') {
            return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
          }
          return `${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
          
        case 'medium':
          // pt-BR: 25 fev 2026, en-US: Feb 25, 2026
          if (locale === 'pt-BR' || locale === 'es-MX') {
            return `${day} ${monthNames[month]} ${year}`;
          }
          return `${monthNames[month]} ${day}, ${year}`;
          
        case 'long':
          // pt-BR: 25 de fevereiro de 2026
          const longMonths = translations.dates.monthLong;
          if (locale === 'pt-BR') {
            return `${day} de ${longMonths[month]} de ${year}`;
          }
          if (locale === 'es-MX') {
            return `${day} de ${longMonths[month]} de ${year}`;
          }
          return `${longMonths[month]} ${day}, ${year}`;
          
        case 'full':
          // pt-BR: Sexta-feira, 25 de fevereiro de 2026
          const dayName = dayNames[date.getDay()];
          const longMonths2 = translations.dates.monthLong;
          if (locale === 'pt-BR') {
            return `${dayName}, ${day} de ${longMonths2[month]} de ${year}`;
          }
          if (locale === 'es-MX') {
            return `${dayName}, ${day} de ${longMonths2[month]} de ${year}`;
          }
          return `${dayName}, ${longMonths2[month]} ${day}, ${year}`;
          
        default:
          return date.toLocaleDateString(locale);
      }
    },
    [locale, translations]
  );

  const value: I18nContextValue = useMemo(
    () => ({
      locale,
      translations,
      setLocale,
      t,
      formatCurrency,
      formatDate,
    }),
    [locale, translations, setLocale, t, formatCurrency, formatDate]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Hook para consumir i18n
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  
  if (!context) {
    // Durante hot-reload o provider pode estar temporariamente ausente.
    // Retorna um fallback seguro que AINDA resolve as traduções em vez de retornar keys cruas.
    console.debug('[i18n] useTranslation: context not found, using fallback');
    const fallbackTranslations = TRANSLATIONS_MAP[DEFAULT_LOCALE];
    
    const fallbackT = (key: string, variables?: Record<string, string | number>): string => {
      if (!fallbackTranslations) return key;
      const keys = key.split('.');
      let value: any = fallbackTranslations;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }
      if (typeof value !== 'string') return key;
      if (variables) {
        return value.replace(/\{(\w+)\}/g, (match, varName) => {
          return varName in variables ? String(variables[varName]) : match;
        });
      }
      return value;
    };
    
    return {
      locale: DEFAULT_LOCALE,
      translations: fallbackTranslations,
      setLocale: () => {},
      t: fallbackT,
      formatCurrency: (value: number) => formatCurrencyHelper(value, DEFAULT_LOCALE, true, false),
      formatDate: (date: Date) => date.toLocaleDateString(DEFAULT_LOCALE),
    } as I18nContextValue;
  }
  
  return context;
}

/**
 * HOC para componentes que precisam de i18n
 */
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { i18n: I18nContextValue }>
) {
  return function WrappedComponent(props: P) {
    const i18n = useTranslation();
    return <Component {...props} i18n={i18n} />;
  };
}