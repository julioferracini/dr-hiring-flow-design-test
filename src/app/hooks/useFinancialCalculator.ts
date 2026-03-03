/**
 * useFinancialCalculator
 *
 * Hook central de cálculo financeiro.
 * Lê as regras do locale ativo e expõe uma função `calculate()` que
 * suporta os três modelos de amortização definidos em financialRules.ts.
 *
 * ── Uso ─────────────────────────────────────────────────────────────────────
 *
 *   const { rules, calculate } = useFinancialCalculator();
 *
 *   const result = calculate({
 *     installments: 24,
 *     downpayment: 0,          // 0 → será calculado automaticamente se obrigatório
 *     totalDebt: rules.debt,   // valor total da dívida (já em moeda local)
 *     downpaymentFixed: false, // se true, mantém entrada mesmo abaixo do threshold
 *   });
 *
 * ── Resultado ────────────────────────────────────────────────────────────────
 *
 *   result.monthlyPayment   — parcela mensal
 *   result.downpayment      — entrada real aplicada
 *   result.total            — total a pagar (entrada + parcelas)
 *   result.savings          — economia em relação à dívida original
 *   result.needsDownpayment — true se entrada é obrigatória nesta configuração
 *   result.totalInterest    — juros totais (0 em flat_discount)
 *   result.effectiveRate    — taxa efetiva mensal usada no cálculo
 */

import { useTranslation } from '../i18n/context';
import { FINANCIAL_RULES } from '../constants/financialRules';
import { EXAMPLE_VALUES } from '../constants/currencies';

// ── Tipos públicos ────────────────────────────────────────────────────────────

export interface CalculateInput {
  installments: number;
  downpayment: number;
  totalDebt: number;
  downpaymentFixed?: boolean;
}

export interface CalculateResult {
  monthlyPayment: number;
  downpayment: number;
  total: number;
  savings: number;
  needsDownpayment: boolean;
  totalInterest: number;
  effectiveRate: number;
}

// ── Algoritmos de amortização ─────────────────────────────────────────────────

/**
 * Flat Discount — modelo atual do protótipo.
 * Desconto linear por parcela abaixo do máximo, sem juros compostos.
 */
function calcFlatDiscount(
  installments: number,
  amountToFinance: number,
  discountPerInstallmentLess: number,
  maxInstallments: number,
): { monthly: number; totalInterest: number } {
  const discountAmount = (maxInstallments - installments) * discountPerInstallmentLess;
  const discountedAmount = Math.max(0, amountToFinance - discountAmount);
  const monthly = discountedAmount / installments;
  return { monthly, totalInterest: 0 };
}

/**
 * Tabela Price — parcelas fixas com juros compostos.
 * monthly = PV × [i(1+i)^n] / [(1+i)^n − 1]
 */
function calcPrice(
  installments: number,
  amountToFinance: number,
  monthlyRate: number,
): { monthly: number; totalInterest: number } {
  if (monthlyRate <= 0) {
    // Sem juros: amortização simples
    const monthly = amountToFinance / installments;
    return { monthly, totalInterest: 0 };
  }
  const r = monthlyRate;
  const n = installments;
  const factor = Math.pow(1 + r, n);
  const monthly = amountToFinance * (r * factor) / (factor - 1);
  const totalInterest = monthly * n - amountToFinance;
  return { monthly, totalInterest };
}

/**
 * SAC — amortização constante, juros decrescentes.
 * Retorna a parcela do primeiro mês (maior) como referência de display.
 */
function calcSAC(
  installments: number,
  amountToFinance: number,
  monthlyRate: number,
): { monthly: number; totalInterest: number } {
  if (monthlyRate <= 0) {
    const monthly = amountToFinance / installments;
    return { monthly, totalInterest: 0 };
  }
  const amortization = amountToFinance / installments;
  // Primeira parcela (a maior) — usada como referência de display
  const firstMonthly = amortization + amountToFinance * monthlyRate;
  // Juros totais = soma de cada mês
  let totalInterest = 0;
  for (let k = 0; k < installments; k++) {
    const outstanding = amountToFinance - k * amortization;
    totalInterest += outstanding * monthlyRate;
  }
  return { monthly: firstMonthly, totalInterest };
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useFinancialCalculator() {
  const { locale } = useTranslation();

  const rules = FINANCIAL_RULES[locale];
  const exampleValues = EXAMPLE_VALUES[locale];

  /**
   * Calcula todos os valores financeiros para uma configuração de parcelamento.
   */
  function calculate(input: CalculateInput): CalculateResult {
    const { installments, downpayment, totalDebt, downpaymentFixed = false } = input;

    // ── Entrada obrigatória? ──────────────────────────────────────────────────
    const needsDownpayment =
      installments > rules.downPaymentThreshold || downpaymentFixed;

    // ── Calcula entrada real ──────────────────────────────────────────────────
    let actualDownpayment = 0;
    if (needsDownpayment) {
      const minDp = totalDebt * rules.downPaymentMinPercent;
      const maxDp = totalDebt * rules.downPaymentMaxPercent;
      actualDownpayment =
        downpayment === 0
          ? minDp
          : Math.max(minDp, Math.min(maxDp, downpayment));
    }

    // ── Desconto interpolado por número de parcelas ──────────────────────────
    // Menos parcelas = mais desconto (alinhado com label "← Mais desconto").
    // Interpola linearmente entre maxDiscount (em minInstallments) e
    // minDiscount (em maxInstallments).
    const maxDiscount = rules.offer1DiscountPercent; // ex: 20% à vista
    const minDiscount = rules.offer3DiscountPercent; // ex: 3% no prazo longo
    const range = rules.maxInstallments - rules.minInstallments;
    const discountPercent = range > 0
      ? maxDiscount - ((installments - rules.minInstallments) / range) * (maxDiscount - minDiscount)
      : maxDiscount;
    const discountAmount = totalDebt * discountPercent;
    const baseAmount = totalDebt - discountAmount;

    const amountToFinance = baseAmount - actualDownpayment;

    // ── Aplica fórmula ────────────────────────────────────────────────────────
    let monthly = 0;
    let totalInterest = 0;

    switch (rules.formula) {
      case 'flat_discount': {
        const r = calcFlatDiscount(
          installments,
          amountToFinance,
          rules.discountPerInstallmentLess,
          rules.maxInstallments,
        );
        monthly = r.monthly;
        totalInterest = r.totalInterest;
        break;
      }
      case 'price': {
        const r = calcPrice(installments, amountToFinance, rules.monthlyInterestRate);
        monthly = r.monthly;
        totalInterest = r.totalInterest;
        break;
      }
      case 'sac': {
        const r = calcSAC(installments, amountToFinance, rules.monthlyInterestRate);
        monthly = r.monthly;
        totalInterest = r.totalInterest;
        break;
      }
    }

    // ── Totais ────────────────────────────────────────────────────────────────
    const total = actualDownpayment + monthly * installments;

    // ── Economia ──────────────────────────────────────────────────────────────
    // Economia = desconto nominal concedido sobre a dívida original.
    // Sempre positivo e sempre menor que totalDebt.
    const savings = discountAmount;

    return {
      monthlyPayment: monthly,
      downpayment: actualDownpayment,
      total,
      savings,
      needsDownpayment,
      totalInterest,
      effectiveRate: rules.monthlyInterestRate,
    };
  }

  return {
    /** Regras financeiras ativas para o locale atual. */
    rules,
    /** Valores de exemplo (dívida, desconto, etc.) para o locale atual. */
    debtData: exampleValues,
    /** Função de cálculo — use em qualquer screen de simulação. */
    calculate,
  };
}