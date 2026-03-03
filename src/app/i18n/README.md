# 🌍 Arquitetura de Internacionalização (i18n)

## 📁 Estrutura de Arquivos

```
/src/app/i18n/
├── README.md                 # Este arquivo - documentação da arquitetura
├── types.ts                  # Type definitions (TypeScript)
├── config.ts                 # Configuração de locales disponíveis
├── context.tsx               # React Context Provider
├── useLocaleData.ts          # Hook customizado
└── locales/                  # 🎯 Traduções por país
    ├── pt-BR.ts             # Português (Brasil) - R$
    ├── en-US.ts             # English (USA) - $
    └── es-MX.ts             # Español (México) - $
```

---

## 🎯 Filosofia da Arquitetura

### ✅ **Centralização Total**
- **TODAS** as strings traduzíveis ficam nos arquivos de locale (`pt-BR.ts`, `en-US.ts`, `es-MX.ts`)
- **NUNCA** textos hardcoded nos componentes
- **UM** arquivo por país = fácil gerenciamento

### 🔒 **Type Safety**
- TypeScript garante que todas as keys existem
- Autocomplete funciona perfeitamente
- Erros detectados em tempo de desenvolvimento

### 🎨 **Tom de Voz por País**
- **PT-BR**: Tom Nubank (Objetivo, Atencioso, Espirituoso, Antenado)
- **ES-MX**: Tom Nubank adaptado para México (uso de "tú", vocabulário local)
- **EN-US**: Tom profissional mas acessível

---

## 📝 Como Adicionar Novas Traduções

### **Passo 1: Atualizar `types.ts`**

Adicione a nova key na interface `Translations`:

```typescript
export interface Translations {
  // ... existing sections
  
  myNewSection: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
}
```

### **Passo 2: Adicionar em TODOS os Locales**

#### `/src/app/i18n/locales/pt-BR.ts`
```typescript
myNewSection: {
  title: 'Meu Novo Título',
  subtitle: 'Subtítulo em português',
  buttonLabel: 'Clique aqui',
},
```

#### `/src/app/i18n/locales/en-US.ts`
```typescript
myNewSection: {
  title: 'My New Title',
  subtitle: 'Subtitle in English',
  buttonLabel: 'Click here',
},
```

#### `/src/app/i18n/locales/es-MX.ts`
```typescript
myNewSection: {
  title: 'Mi Nuevo Título',
  subtitle: 'Subtítulo en español',
  buttonLabel: 'Haz clic aquí',
},
```

### **Passo 3: Usar no Componente**

```tsx
import { useTranslation } from '../i18n/context';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('myNewSection.title')}</h1>
      <p>{t('myNewSection.subtitle')}</p>
      <button>{t('myNewSection.buttonLabel')}</button>
    </div>
  );
}
```

---

## 🔄 Interpolação de Variáveis

### Usando Variáveis Dinâmicas

#### **1. Definir no locale:**
```typescript
discount: 'Ganhe {amount} de desconto',
installments: '{count} parcelas',
```

#### **2. Usar no componente:**
```tsx
t('offerHub.discount', { amount: 'R$ 500,00' })
// Resultado: "Ganhe R$ 500,00 de desconto"

t('summary.installments', { count: '12' })
// Resultado: "12 parcelas"
```

---

## 💰 Formatação de Moeda

### Símbolos por País

```typescript
currency: {
  symbol: 'R$',  // Brasil
  code: 'BRL',
}

currency: {
  symbol: '$',   // USA ou México
  code: 'USD',   // ou 'MXN'
}
```

### Uso no Código

```tsx
const { formatCurrency } = useTranslation();

formatCurrency(1500.50)
// PT-BR: "R$ 1.500,50"
// EN-US: "$1,500.50"
// ES-MX: "$1,500.50"
```

---

## 📅 Formatação de Datas

### Arrays de Datas nos Locales

```typescript
dates: {
  today: 'Hoje',
  tomorrow: 'Amanhã',
  monthShort: ['jan', 'fev', 'mar', ...],
  monthLong: ['janeiro', 'fevereiro', 'março', ...],
  dayShort: ['dom', 'seg', 'ter', ...],
  dayLong: ['domingo', 'segunda-feira', ...],
}
```

### Uso

```tsx
const { formatDate } = useTranslation();

formatDate(new Date(), 'short')
// PT-BR: "26 fev 2026"
// EN-US: "Feb 26, 2026"
```

---

## 📊 Status de Implementação por Screen

| Screen | Tradução | Implementação | Prioridade |
|--------|----------|---------------|------------|
| **LanguageSelector** | ✅ 100% | ✅ 100% | - |
| **EntryPoint** | ✅ 100% | ✅ 100% | - |
| **OfferHub** | ✅ 100% | ✅ 100% | - |
| **Simulation** | ✅ 100% | 🟨 60% | 🔥 **ALTA** |
| **InstallmentValue** | ✅ 100% | ❌ 0% | 🟡 MÉDIA |
| **DueDate** | ✅ 100% | ❌ 0% | 🟡 MÉDIA |
| **DownPaymentValue** | ✅ 100% | ❌ 0% | 🟡 MÉDIA |
| **DownPaymentDate** | ✅ 100% | ❌ 0% | 🟡 MÉDIA |
| **Summary** | ✅ 100% | ❌ 0% | 🟡 MÉDIA |
| **TermsConditions** | ✅ 100% | ❌ 0% | 🟢 BAIXA |
| **Pin** | ✅ 100% | ❌ 0% | 🟢 BAIXA |
| **Loading** | ✅ 100% | ❌ 0% | 🟢 BAIXA |
| **Success** | ✅ 100% | ❌ 0% | 🟢 BAIXA |
| **Feedback** | ✅ 100% | ❌ 0% | 🟢 BAIXA |

---

## 🎨 Diretrizes de Tom de Voz

### 🇧🇷 Português (Brasil) - Tom Nubank

**Características:**
- ✅ Objetivo e direto ao ponto
- ✅ Atencioso e acolhedor  
- ✅ Espirituoso (leve, com personalidade)
- ✅ Antenado (linguagem atual)
- ❌ Sem juridiquês ou formalidade excessiva

**Exemplos:**
- ✅ "Acertar as contas"
- ✅ "Ficou bom"
- ✅ "Tudo certo!"
- ❌ "Realizar o pagamento" (muito formal)

### 🇺🇸 English (USA)

**Características:**
- Clear and straightforward
- Professional but approachable
- Action-oriented
- Concise

**Exemplos:**
- ✅ "Settle balance"
- ✅ "Looks good"
- ✅ "All set!"

### 🇲🇽 Español (México) - Tom Nubank

**Características:**
- Directo y claro
- Empático y cercano
- Uso de "tú" (informal pero respetuoso)
- Vocabulário local mexicano
- Sin formalidades excesivas

**Exemplos:**
- ✅ "Liquida tu saldo"
- ✅ "Se ve bien"
- ✅ "¡Todo listo!"
- ✅ "Enganche" (não "pago inicial")
- ✅ "Mensualidades" (não "cuotas" em alguns contextos)

---

## 🛠️ Ferramentas Disponíveis

### Hook `useTranslation()`

```tsx
const { 
  locale,           // 'pt-BR' | 'en-US' | 'es-MX'
  translations,     // Objeto completo de traduções
  setLocale,        // Função para mudar idioma
  t,                // Função de tradução
  formatCurrency,   // Formatar moeda
  formatDate        // Formatar data
} = useTranslation();
```

### Função `t(key, variables?)`

```tsx
// Simples
t('common.continue')
// => "Continuar" (PT-BR)

// Com variáveis
t('offerHub.discount', { amount: 'R$ 500' })
// => "Ganhe R$ 500 de desconto"

// Nested keys
t('simulation.downPayment')
// => "Entrada"
```

---

## 🚀 Próximos Passos

### **Fase 1: Completar Simulation Screen** 🔥
- [ ] Substituir "Installments" em InstallmentInput
- [ ] Substituir labels do slider ("More discount", "More time")
- [ ] Traduzir modal de downpayment alert
- [ ] Traduzir BottomSheetEditor

### **Fase 2: Implementar Screens da Jornada**
- [ ] InstallmentValue
- [ ] DueDate  
- [ ] DownPaymentValue
- [ ] DownPaymentDate
- [ ] Summary

### **Fase 3: Screens Finais**
- [ ] TermsConditions
- [ ] Pin
- [ ] Loading
- [ ] Success
- [ ] Feedback

---

## ✅ Checklist para Adicionar Novo Idioma

Se precisar adicionar um novo país (ex: Colômbia, Argentina):

1. [ ] Criar arquivo `/src/app/i18n/locales/es-CO.ts` (ou outro código)
2. [ ] Adicionar tipo em `types.ts`: `export type Locale = 'en-US' | 'pt-BR' | 'es-MX' | 'es-CO';`
3. [ ] Adicionar em `config.ts` no array de locales disponíveis
4. [ ] Traduzir TODAS as keys seguindo o tom de voz local
5. [ ] Definir símbolo de moeda (`currency.symbol` e `currency.code`)
6. [ ] Traduzir arrays de datas (`monthShort`, `dayLong`, etc.)
7. [ ] Testar todas as screens

---

## 📖 Referências Rápidas

### Estrutura de Keys Disponíveis

```
common.*                    Ações globais (continue, back, close...)
languageSelector.*          Seletor de idioma
entryPoint.*                Tela de entrada
offerHub.*                  Hub de ofertas
simulation.*                Simulação de parcelamento
installmentValue.*          Confirmação do valor
dueDate.*                   Escolha de vencimento
downPaymentValue.*          Valor da entrada
downPaymentDate.*           Data da entrada
summary.*                   Resumo do acordo
terms.*                     Termos e condições
pin.*                       Senha/PIN
loading.*                   Carregamento
success.*                   Sucesso
feedback.*                  Feedback do usuário
errors.*                    Mensagens de erro
currency.*                  Moeda
dates.*                     Datas
```

---

**Última atualização:** 26 de fevereiro de 2026  
**Mantido por:** Equipe de Produto
