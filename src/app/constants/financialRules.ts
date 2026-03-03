/**
 * Financial Rules — Regras financeiras por país/locale
 *
 * ── TAXAS NOMINAIS ANUAIS USADAS ────────────────────────────────────────────
 *
 * Brasil:
 *   CC em atraso / parcelamento de fatura : 90,0% a.a.
 *   Empréstimo pessoal / crédito livre    : 40,0% a.a.
 *
 * México:
 *   Cartão de crédito                     : 38,5% a.a.
 *   Empréstimo pessoal                    : 44,0% a.a.
 *
 * ── CONVERSÃO PARA TAXA MENSAL ──────────────────────────────────────────────
 *   i_mensal = (1 + i_anual)^(1/12) - 1
 *
 * ── TAXA MENSAL PONDERADA (calculada no offerEngine) ────────────────────────
 *   i_media = (i_cc × saldo_cc + i_loan × saldo_loan) / saldo_total
 *
 *   BR  → ≈ 3,9148% a.m.  (armazenada como monthlyInterestRate)
 *   MX  → ≈ 2,9504% a.m.
 *
 * ── FÓRMULAS DISPONÍVEIS ────────────────────────────────────────────────────
 *
 * 'flat_discount'  →  Desconto linear por parcela, sem juros.
 *                     (legado — mantido para en-US / testes)
 *
 * 'price'          →  Tabela Price — parcelas fixas com juros compostos.
 *                     monthly = PV × [i(1+i)^n] / [(1+i)^n − 1]
 *
 * 'sac'            →  Amortização Constante — juros decrescentes.
 *                     (suporte já implementado em useFinancialCalculator)
 *
 * ── COMO CONFIGURAR UM NOVO PAÍS ────────────────────────────────────────────
 * 1. Defina annualRateCC e annualRateLoan com as taxas nominais anuais.
 * 2. Calcule monthlyInterestRate como a taxa mensal ponderada (ou use a
 *    função computeWeightedMonthlyRate do offerEngine).
 * 3. Ajuste as ofertas: offer1/2/3DiscountPercent e offer2/3Installments.
 * 4. Defina formula: 'price' para amortização real com juros.
 */

import type { Locale } from '../i18n/types';

// ── Tipos ─────────────────────────────────────────────────────────────────────

export type AmortizationFormula = 'flat_discount' | 'price' | 'sac';

export interface FinancialRules {
  // ── Slider ──────────────────────────────────────────────────────────────────
  /** Número mínimo de parcelas no slider. */
  minInstallments: number;
  /** Número máximo de parcelas no slider. */
  maxInstallments: number;

  // ── Entrada (down payment) ───────────────────────────────────────────────────
  /** Parcelas > threshold exigem entrada obrigatória. */
  downPaymentThreshold: number;
  /** % mínimo de entrada sobre o total da dívida (0.05 = 5%). */
  downPaymentMinPercent: number;
  /** % máximo de entrada sobre o total da dívida (0.90 = 90%). */
  downPaymentMaxPercent: number;

  // ── Taxas por produto (nominais anuais) ──────────────────────────────────────
  /** Taxa nominal anual do cartão de crédito (ex: 0.90 = 90% a.a.). */
  annualRateCC: number;
  /** Taxa nominal anual do empréstimo pessoal (ex: 0.40 = 40% a.a.). */
  annualRateLoan: number;

  // ── Fórmula e taxa principal ─────────────────────────────────────────────────
  /** Tipo de amortização utilizado no cálculo da parcela mensal. */
  formula: AmortizationFormula;

  /**
   * Taxa mensal efetiva — usada por useFinancialCalculator no Simulation.
   *
   * Para 'price'/'sac': pré-calcule como taxa ponderada:
   *   i_media = (i_cc × saldo_cc + i_loan × saldo_loan) / saldo_total
   *
   * Para 'flat_discount': ignorado.
   */
  monthlyInterestRate: number;

  /**
   * [flat_discount only] Desconto por parcela abaixo do máximo, em moeda local.
   * Ignorado quando formula ≠ 'flat_discount'.
   */
  discountPerInstallmentLess: number;

  // ── Configuração das 3 ofertas de renegociação ───────────────────────────────

  /**
   * OFERTA 1 — À vista (cash).
   * Desconto máximo permitido: ≤ 20%.
   */
  offer1DiscountPercent: number;

  /**
   * OFERTA 2 — Parcelado curto.
   * Desconto máximo permitido: ≤ 20%.
   */
  offer2DiscountPercent: number;
  /** Número de parcelas da oferta curta. */
  offer2Installments: number;

  /**
   * OFERTA 3 — Parcelado longo.
   * Desconto máximo permitido: ≤ 3%.
   */
  offer3DiscountPercent: number;
  /** Número de parcelas da oferta longa (36 para BR, 24 para MX). */
  offer3Installments: number;

  // ── Display ──────────────────────────────────────────────────────────────────
  /** Rótulo do encargo local (ex: "IOF", "CAT", "APR"). */
  taxLabel: string;
  /** Nome legível da fórmula (ex: "Tabela Price"). */
  formulaLabel: string;
}

// ── Regras por locale ─────────────────────────────────────────────────────────

export const FINANCIAL_RULES: Record<Locale, FinancialRules> = {

  /**
   * 🇧🇷 Brasil — cliente_BR_01
   *
   * Dívida total: R$ 1.500,00
   *   CC  (78 dias atraso): R$ 600,00   @ 90% a.a. → 5,4947% a.m.
   *   Loan(42 dias atraso): R$ 900,00   @ 40% a.a. → 2,8437% a.m.
   *
   * Taxa ponderada:
   *   i_media = (0,054947 × 600 + 0,028437 × 900) / 1500
   *           = (32,97 + 25,59) / 1500
   *           ≈ 3,9041% a.m.
   */
  'pt-BR': {
    minInstallments: 2,
    maxInstallments: 60,
    downPaymentThreshold: 20,
    downPaymentMinPercent: 0.05,
    downPaymentMaxPercent: 0.90,

    annualRateCC: 0.90,
    annualRateLoan: 0.40,
    formula: 'price',
    monthlyInterestRate: 0.039041,   // taxa ponderada pré-calculada

    discountPerInstallmentLess: 25.00, // legado flat_discount (R$)

    offer1DiscountPercent: 0.20,       // 20% à vista
    offer2DiscountPercent: 0.15,       // 15% em 12x
    offer2Installments: 12,
    offer3DiscountPercent: 0.03,       // 3% em 36x
    offer3Installments: 36,

    taxLabel: 'IOF',
    formulaLabel: 'Tabela Price',
  },

  /**
   * 🇲🇽 México — cliente_MX_01
   *
   * Dívida total: MX$ 1.500,00
   *   CC  (72 dias atraso): MX$ 600,00    @ 38,5% a.a. → 2,7524% a.m.
   *   Loan(39 dias atraso): MX$ 900,00    @ 44,0% a.a. → 3,0844% a.m.
   *
   * Taxa ponderada:
   *   i_media = (0,027524 × 600 + 0,030844 × 900) / 1500
   *           = (16,51 + 27,76) / 1500
   *           ≈ 2,9516% a.m.
   */
  'es-MX': {
    minInstallments: 2,
    maxInstallments: 60,
    downPaymentThreshold: 20,
    downPaymentMinPercent: 0.05,
    downPaymentMaxPercent: 0.90,

    annualRateCC: 0.385,
    annualRateLoan: 0.44,
    formula: 'price',
    monthlyInterestRate: 0.029516,   // taxa ponderada pré-calculada

    discountPerInstallmentLess: 100.00, // legado flat_discount (MX$)

    offer1DiscountPercent: 0.20,        // 20% à vista
    offer2DiscountPercent: 0.15,        // 15% em 12x
    offer2Installments: 12,
    offer3DiscountPercent: 0.03,        // 3% em 24x
    offer3Installments: 24,

    taxLabel: 'CAT',
    formulaLabel: 'Tabla Price',
  },

  /**
   * 🇺🇸 Estados Unidos — placeholder
   * Mantém flat_discount enquanto o cenário US não for definido.
   */
  'en-US': {
    minInstallments: 2,
    maxInstallments: 60,
    downPaymentThreshold: 20,
    downPaymentMinPercent: 0.05,
    downPaymentMaxPercent: 0.90,

    annualRateCC: 0.24,
    annualRateLoan: 0.18,
    formula: 'flat_discount',
    monthlyInterestRate: 0.0150,

    discountPerInstallmentLess: 5.00,

    offer1DiscountPercent: 0.20,
    offer2DiscountPercent: 0.15,
    offer2Installments: 12,
    offer3DiscountPercent: 0.03,
    offer3Installments: 36,

    taxLabel: 'APR',
    formulaLabel: 'Direct discount',
  },
};