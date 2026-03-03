/**
 * Offer Engine — Motor de cálculo de ofertas de renegociação
 *
 * Funções PURAS (sem React). Podem ser testadas isoladamente.
 *
 * ── TRÊS OFERTAS POR CLIENTE ────────────────────────────────────────────────
 *
 *  OFERTA 1 — À vista (cash)
 *    Desconto   : ≤ 20% sobre total_debt
 *    Parcelas   : 1
 *    Juros      : nenhum
 *
 *  OFERTA 2 — Parcelado curto (12x)
 *    Desconto   : ≤ 20%
 *    Fórmula    : Tabela Price sobre (total_debt × (1 - desconto))
 *    Taxa       : taxa_mensal_ponderada
 *
 *  OFERTA 3 — Parcelado longo (36x BR / 24x MX)
 *    Desconto   : ≤ 3%
 *    Fórmula    : Tabela Price
 *    Taxa       : taxa_mensal_ponderada
 *
 * ── CÁLCULO DA TAXA MENSAL PONDERADA ────────────────────────────────────────
 *   i_cc   = (1 + annualRateCC)^(1/12)   - 1
 *   i_loan = (1 + annualRateLoan)^(1/12) - 1
 *   i_med  = (i_cc × ccBalance + i_loan × loanBalance) / totalDebt
 */

import type { Locale } from '../i18n/types';
import type { FinancialRules } from './financialRules';

// ── Tipos públicos ─────────────────────────────────────────────────────────────

export type OfferType = 'cash' | 'installments';

export interface RenegotiationOffer {
  offer_id: string;
  type: OfferType;
  installments: number;
  discount_percent: number;
  original_debt: number;
  /** Valor base após desconto (total_debt × (1 − discount_percent)). */
  base_amount: number;
  /** Taxa mensal ponderada usada nos cálculos parcelados (0 para cash). */
  monthly_interest_rate: number;
  /** Valor único — preenchido apenas para type='cash'. */
  payment_once: number | null;
  /** Parcela mensal — preenchida apenas para type='installments'. */
  monthly_payment: number | null;
  /** Total efetivamente pago (parcelas × n  ou  payment_once). */
  total_paid: number;
  /**
   * Desconto efetivo sobre a dívida original.
   * effective_discount_over_total_debt = 1 − (total_paid / original_debt)
   * Pode ser NEGATIVO em planos parcelados com juros altos (normal).
   */
  effective_discount_over_total_debt: number;
}

export interface ClientOffers {
  id: string;
  country: string;
  currency: string;
  total_debt: number;
  /** Taxa mensal ponderada calculada para este cliente. */
  weighted_monthly_rate: number;
  offers: RenegotiationOffer[];
}

// ── Utilidades numéricas ────────────────────────────────────────────────────────

/** Arredonda para 2 casas decimais. */
function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Converte taxa nominal anual para taxa efetiva mensal.
 * i_mensal = (1 + i_anual)^(1/12) - 1
 */
export function annualToMonthly(annualRate: number): number {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

/**
 * Calcula a taxa mensal ponderada pelos saldos de cada produto.
 *
 * @param annualRateCC   - Taxa nominal anual do CC
 * @param annualRateLoan - Taxa nominal anual do empréstimo
 * @param ccBalance      - Saldo do CC em moeda local
 * @param loanBalance    - Saldo do empréstimo em moeda local
 * @returns Taxa mensal efetiva ponderada (decimal, ex: 0.039148)
 */
export function computeWeightedMonthlyRate(
  annualRateCC: number,
  annualRateLoan: number,
  ccBalance: number,
  loanBalance: number,
): number {
  const totalDebt = ccBalance + loanBalance;
  if (totalDebt <= 0) return 0;
  const iCC   = annualToMonthly(annualRateCC);
  const iLoan = annualToMonthly(annualRateLoan);
  return (iCC * ccBalance + iLoan * loanBalance) / totalDebt;
}

/**
 * Tabela Price — parcela mensal fixa com juros compostos.
 * monthly = PV × [i(1+i)^n] / [(1+i)^n − 1]
 *
 * Caso especial: i = 0 → amortização simples (PV / n).
 */
export function calcPriceMonthly(pv: number, monthlyRate: number, n: number): number {
  if (monthlyRate <= 0) return r2(pv / n);
  const factor = Math.pow(1 + monthlyRate, n);
  return r2(pv * (monthlyRate * factor) / (factor - 1));
}

// ── Geração das 3 ofertas ──────────────────────────────────────────────────────

/**
 * Gera as 3 ofertas de renegociação para um cliente.
 *
 * @param locale      - Locale do cliente ('pt-BR', 'es-MX', 'en-US')
 * @param rules       - Regras financeiras do locale
 * @param ccBalance   - Saldo do CC em moeda local
 * @param loanBalance - Saldo do empréstimo em moeda local
 * @param clientId    - ID do cliente para prefixar os offer_ids
 * @param countryCode - 'BR' | 'MX' | 'US'
 * @param currency    - 'BRL' | 'MXN' | 'USD'
 * @returns ClientOffers — estrutura completa com as 3 ofertas
 */
export function generateOffers(
  locale: Locale,
  rules: FinancialRules,
  ccBalance: number,
  loanBalance: number,
  clientId: string,
  countryCode: string,
  currency: string,
): ClientOffers {
  const totalDebt = r2(ccBalance + loanBalance);

  // ── Taxa ponderada ──────────────────────────────────────────────────────────
  const weightedRate = computeWeightedMonthlyRate(
    rules.annualRateCC,
    rules.annualRateLoan,
    ccBalance,
    loanBalance,
  );

  // ── Prefixo dos IDs ─────────────────────────────────────────────────────────
  const pfx = countryCode.toUpperCase();

  // ── OFERTA 1 — À vista ──────────────────────────────────────────────────────
  const disc1       = rules.offer1DiscountPercent;
  const base1       = r2(totalDebt * (1 - disc1));
  const payOnce     = base1;
  const totalPaid1  = payOnce;
  const effDisc1    = r2(1 - totalPaid1 / totalDebt);

  const offer1: RenegotiationOffer = {
    offer_id: `${pfx}_OFFER_1_AVISTA`,
    type: 'cash',
    installments: 1,
    discount_percent: disc1,
    original_debt: totalDebt,
    base_amount: base1,
    monthly_interest_rate: 0,
    payment_once: payOnce,
    monthly_payment: null,
    total_paid: totalPaid1,
    effective_discount_over_total_debt: effDisc1,
  };

  // ── OFERTA 2 — Parcelado curto ──────────────────────────────────────────────
  const disc2      = rules.offer2DiscountPercent;
  const n2         = rules.offer2Installments;
  const base2      = r2(totalDebt * (1 - disc2));
  const monthly2   = calcPriceMonthly(base2, weightedRate, n2);
  const totalPaid2 = r2(monthly2 * n2);
  const effDisc2   = r2(1 - totalPaid2 / totalDebt);

  const offer2: RenegotiationOffer = {
    offer_id: `${pfx}_OFFER_2_${n2}X`,
    type: 'installments',
    installments: n2,
    discount_percent: disc2,
    original_debt: totalDebt,
    base_amount: base2,
    monthly_interest_rate: r2(weightedRate * 10000) / 10000, // 4 decimais
    payment_once: null,
    monthly_payment: monthly2,
    total_paid: totalPaid2,
    effective_discount_over_total_debt: effDisc2,
  };

  // ── OFERTA 3 — Parcelado longo ──────────────────────────────────────────────
  const disc3      = rules.offer3DiscountPercent;
  const n3         = rules.offer3Installments;
  const base3      = r2(totalDebt * (1 - disc3));
  const monthly3   = calcPriceMonthly(base3, weightedRate, n3);
  const totalPaid3 = r2(monthly3 * n3);
  const effDisc3   = r2(1 - totalPaid3 / totalDebt);

  const offer3: RenegotiationOffer = {
    offer_id: `${pfx}_OFFER_3_${n3}X`,
    type: 'installments',
    installments: n3,
    discount_percent: disc3,
    original_debt: totalDebt,
    base_amount: base3,
    monthly_interest_rate: r2(weightedRate * 10000) / 10000,
    payment_once: null,
    monthly_payment: monthly3,
    total_paid: totalPaid3,
    effective_discount_over_total_debt: effDisc3,
  };

  return {
    id: clientId,
    country: countryCode,
    currency,
    total_debt: totalDebt,
    weighted_monthly_rate: r2(weightedRate * 10000) / 10000,
    offers: [offer1, offer2, offer3],
  };
}
