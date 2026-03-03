/**
 * Hook para dados localizados
 * Retorna valores de exemplo baseados no locale atual
 */

import { useTranslation } from './context';
import { EXAMPLE_VALUES } from '../constants/currencies';
import type { Locale } from './types';

// Tipos de dados localizados
export interface LocaleExampleData {
  // Valores base USD (convertidos automaticamente)
  totalBalance: number;
  originalBalance: number;
  discount: number;
}

/**
 * Hook para obter dados de exemplo localizados
 */
export function useLocaleData() {
  const { locale } = useTranslation();
  
  // Retorna valores de exemplo para o locale atual
  const exampleValues = EXAMPLE_VALUES[locale];
  
  return {
    exampleValues,
    locale,
  };
}

/**
 * Helper para calcular valores derivados
 */
export function calculateLocalizedValues(
  baseUsdValue: number,
  locale: Locale,
  installments: number = 1
): {
  total: number;
  monthly: number;
  savings: number;
} {
  const { totalBalance, originalBalance, discount } = EXAMPLE_VALUES[locale];
  
  // Proporção do valor base
  const ratio = baseUsdValue / 1126.50; // base USD
  
  const total = totalBalance * ratio;
  const monthly = installments > 0 ? total / installments : total;
  const savings = discount * ratio;
  
  return {
    total,
    monthly,
    savings,
  };
}