/**
 * Currency System
 * Formatação customizada de valores monetários por país
 */

import type { Locale } from '../i18n/types';

// Configuração de moedas por locale
export interface CurrencyConfig {
  code: string;
  symbol: string;
  symbolPosition: 'before' | 'after';
  decimalSeparator: string;
  thousandsSeparator: string;
  decimalPlaces: number;
  spaceAfterSymbol: boolean;
}

export const CURRENCY_CONFIGS: Record<Locale, CurrencyConfig> = {
  'en-US': {
    code: 'USD',
    symbol: '$',
    symbolPosition: 'before',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    spaceAfterSymbol: false, // $1,126.50
  },
  'pt-BR': {
    code: 'BRL',
    symbol: 'R$',
    symbolPosition: 'before',
    decimalSeparator: ',',
    thousandsSeparator: '.',
    decimalPlaces: 2,
    spaceAfterSymbol: true, // R$ 1.126,50
  },
  'es-MX': {
    code: 'MXN',
    symbol: '$',
    symbolPosition: 'before',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    spaceAfterSymbol: false, // $1,126.50
  },
};

// Taxas de conversão base (USD como referência)
// NOTE: All financial calculations already use local-currency values (R$, MX$, $).
// Conversion rates are set to 1.0 because useFinancialCalculator outputs local currency.
export const CONVERSION_RATES: Record<Locale, number> = {
  'en-US': 1,
  'pt-BR': 1,
  'es-MX': 1,
};

/**
 * Formata um número como moeda
 * @param value - Valor numérico (sempre em USD base)
 * @param locale - Idioma/país
 * @param showSymbol - Mostrar símbolo da moeda
 * @param showCode - Mostrar código da moeda (USD, BRL, MXN)
 * @returns String formatada
 */
export function formatCurrency(
  value: number,
  locale: Locale,
  showSymbol: boolean = true,
  showCode: boolean = false
): string {
  const config = CURRENCY_CONFIGS[locale];
  const rate = CONVERSION_RATES[locale];
  
  // Converte para moeda local
  const convertedValue = value * rate;
  
  // Separa inteiro e decimal
  const absValue = Math.abs(convertedValue);
  const integerPart = Math.floor(absValue);
  const decimalPart = Math.round((absValue - integerPart) * Math.pow(10, config.decimalPlaces));
  
  // Formata parte inteira com separadores de milhar
  const integerStr = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
  
  // Formata parte decimal
  const decimalStr = decimalPart.toString().padStart(config.decimalPlaces, '0');
  
  // Monta o número completo
  const numberStr = `${integerStr}${config.decimalSeparator}${decimalStr}`;
  
  // Adiciona sinal de negativo se necessário
  const signedNumberStr = convertedValue < 0 ? `-${numberStr}` : numberStr;
  
  // Monta resultado final
  let result = signedNumberStr;
  
  if (showSymbol) {
    const space = config.spaceAfterSymbol ? ' ' : '';
    if (config.symbolPosition === 'before') {
      result = `${config.symbol}${space}${signedNumberStr}`;
    } else {
      result = `${signedNumberStr}${space}${config.symbol}`;
    }
  }
  
  if (showCode) {
    result = `${result} ${config.code}`;
  }
  
  return result;
}

/**
 * Converte valor de USD para moeda local
 * @param usdValue - Valor em USD
 * @param locale - Locale de destino
 * @returns Valor convertido
 */
export function convertCurrency(usdValue: number, locale: Locale): number {
  return usdValue * CONVERSION_RATES[locale];
}

/**
 * Obtém símbolo da moeda
 * @param locale - Locale
 * @returns Símbolo (ex: $, R$)
 */
export function getCurrencySymbol(locale: Locale): string {
  return CURRENCY_CONFIGS[locale].symbol;
}

/**
 * Obtém código da moeda
 * @param locale - Locale
 * @returns Código (ex: USD, BRL, MXN)
 */
export function getCurrencyCode(locale: Locale): string {
  return CURRENCY_CONFIGS[locale].code;
}

// ── Dados-base de dívida por locale ───────────────────────────────────────────
// Defina APENAS ccBalance e loanBalance. Todos os outros campos são calculados.

interface DebtBaseInput {
  /** Saldo do cartão de crédito (moeda local). */
  ccBalance: number;
  /** Saldo do empréstimo pessoal (moeda local). */
  loanBalance: number;
}

/**
 * Entrada mínima por locale — troque aqui e tudo recalcula automaticamente.
 */
const DEBT_BASE: Record<Locale, DebtBaseInput> = {
  'en-US': { ccBalance: 600.00, loanBalance: 900.00 },
  'pt-BR': { ccBalance: 600.00, loanBalance: 900.00 },
  'es-MX': { ccBalance: 600.00, loanBalance: 900.00 },
};

// ── Percentuais de desconto à vista (importados de financialRules seria circular,
//    então replicamos o offer1DiscountPercent aqui — 20% para todos os locales).
const CASH_DISCOUNT: Record<Locale, number> = {
  'en-US': 0.20,
  'pt-BR': 0.20,
  'es-MX': 0.20,
};

// ── Tipo público ──────────────────────────────────────────────────────────────
export interface ExampleValues {
  originalBalance: number;
  ccBalance: number;
  loanBalance: number;
  totalBalance: number;
  discount: number;
}

// ── Geração automática ────────────────────────────────────────────────────────
function buildExampleValues(locale: Locale): ExampleValues {
  const { ccBalance, loanBalance } = DEBT_BASE[locale];
  const originalBalance = ccBalance + loanBalance;
  const discountPercent = CASH_DISCOUNT[locale];
  const discount = originalBalance * discountPercent;
  const totalBalance = originalBalance - discount;

  return { originalBalance, ccBalance, loanBalance, totalBalance, discount };
}

export const EXAMPLE_VALUES: Record<Locale, ExampleValues> = {
  'en-US': buildExampleValues('en-US'),
  'pt-BR': buildExampleValues('pt-BR'),
  'es-MX': buildExampleValues('es-MX'),
};