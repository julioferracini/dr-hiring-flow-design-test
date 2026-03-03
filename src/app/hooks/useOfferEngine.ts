/**
 * useOfferEngine
 *
 * Hook React que gera as 3 ofertas de renegociação para o locale ativo.
 * Consome FINANCIAL_RULES e EXAMPLE_VALUES automaticamente.
 *
 * ── Uso ─────────────────────────────────────────────────────────────────────
 *
 *   const { offers, clientData, weightedRate } = useOfferEngine();
 *
 *   // offers[0] → à vista
 *   // offers[1] → parcelado curto
 *   // offers[2] → parcelado longo
 *
 * ── Output em JSON estruturado ───────────────────────────────────────────────
 *
 *   const { toJSON } = useOfferEngine();
 *   console.log(toJSON());  // { clientes: [ { id, country, offers: [...] } ] }
 *
 * ── Notas sobre effective_discount_over_total_debt ───────────────────────────
 *   Pode ser NEGATIVO em ofertas parceladas com juros altos — isso é
 *   matematicamente correto: o cliente paga mais do que a dívida original
 *   quando os juros superam o desconto concedido.
 */

import { useMemo } from 'react';
import { useTranslation } from '../i18n/context';
import { FINANCIAL_RULES } from '../constants/financialRules';
import { EXAMPLE_VALUES, CURRENCY_CONFIGS } from '../constants/currencies';
import { generateOffers, type ClientOffers, type RenegotiationOffer } from '../constants/offerEngine';

// ── Mapeamento locale → metadados do cliente ──────────────────────────────────

const CLIENT_META: Record<string, { clientId: string; countryCode: string }> = {
  'pt-BR': { clientId: 'cliente_BR_01', countryCode: 'BR' },
  'es-MX': { clientId: 'cliente_MX_01', countryCode: 'MX' },
  'en-US': { clientId: 'cliente_US_01', countryCode: 'US' },
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export interface UseOfferEngineResult {
  /** Dados completos do cliente + 3 ofertas. */
  clientData: ClientOffers;
  /** Atalho para o array de 3 ofertas. */
  offers: RenegotiationOffer[];
  /** Oferta 1 — à vista. */
  offerCash: RenegotiationOffer;
  /** Oferta 2 — parcelado curto. */
  offerShort: RenegotiationOffer;
  /** Oferta 3 — parcelado longo. */
  offerLong: RenegotiationOffer;
  /** Taxa mensal ponderada calculada (decimal). */
  weightedRate: number;
  /** Serializa toda a estrutura no formato JSON do output esperado. */
  toJSON: () => string;
}

export function useOfferEngine(): UseOfferEngineResult {
  const { locale } = useTranslation();

  const result = useMemo(() => {
    const rules      = FINANCIAL_RULES[locale];
    const debtData   = EXAMPLE_VALUES[locale];
    const currency   = CURRENCY_CONFIGS[locale].code;
    const meta       = CLIENT_META[locale] ?? { clientId: `cliente_${locale}`, countryCode: locale };

    const clientData = generateOffers(
      locale,
      rules,
      debtData.ccBalance,
      debtData.loanBalance,
      meta.clientId,
      meta.countryCode,
      currency,
    );

    return clientData;
  }, [locale]);

  const toJSON = () => JSON.stringify({ clientes: [result] }, null, 2);

  return {
    clientData: result,
    offers: result.offers,
    offerCash:  result.offers[0],
    offerShort: result.offers[1],
    offerLong:  result.offers[2],
    weightedRate: result.weighted_monthly_rate,
    toJSON,
  };
}
