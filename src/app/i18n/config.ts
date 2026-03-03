/**
 * i18n Configuration
 * Configuração de locales disponíveis
 */

import type { Locale, LocaleMetadata } from './types';

// Locales disponíveis
export const AVAILABLE_LOCALES: Record<Locale, LocaleMetadata> = {
  'en-US': {
    code: 'en-US',
    name: 'English',
    nativeName: 'English (US)',
    flag: '🇺🇸',
    status: 'active',
    testLabel: 'Test in English',
  },
  'pt-BR': {
    code: 'pt-BR',
    name: 'Portuguese',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    status: 'active',
    testLabel: 'Testar em Português',
  },
  'es-MX': {
    code: 'es-MX',
    name: 'Spanish',
    nativeName: 'Español (México)',
    flag: '🇲🇽',
    status: 'active',
    testLabel: 'Probar en Español',
  },
};

// Locales planejados (coming soon)
export const UPCOMING_LOCALES = [
  {
    code: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    status: 'soon' as const,
  },
  {
    code: 'zh-CN',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    status: 'soon' as const,
  },
];

// Locale padrão
export const DEFAULT_LOCALE: Locale = 'pt-BR';

// Storage key para persistência
export const LOCALE_STORAGE_KEY = 'debt-resolution-locale';

// Lista completa (ativos + em breve)
export const ALL_LOCALES = [
  ...Object.values(AVAILABLE_LOCALES),
  ...UPCOMING_LOCALES,
];

/**
 * Verifica se locale é válido e ativo
 */
export function isValidLocale(code: string): code is Locale {
  return code in AVAILABLE_LOCALES;
}

/**
 * Obtém metadados de um locale
 */
export function getLocaleMetadata(code: Locale): LocaleMetadata {
  return AVAILABLE_LOCALES[code];
}

/**
 * Detecta locale do navegador
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Tenta match exato
  if (isValidLocale(browserLang)) {
    return browserLang;
  }
  
  // Tenta match por idioma base (en-US -> en)
  const baseLang = browserLang.split('-')[0];
  const match = Object.keys(AVAILABLE_LOCALES).find((locale) =>
    locale.startsWith(baseLang)
  );
  
  if (match && isValidLocale(match)) {
    return match;
  }
  
  return DEFAULT_LOCALE;
}