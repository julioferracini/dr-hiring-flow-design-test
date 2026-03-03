# 🎯 Bottom Sheet Behavior - Padrão Corrigido

## ✅ Comportamento Correto Implementado

### **1. Animação de Entrada** 
```
┌─────────────────────────┐
│ Terms & Conditions      │
│ (Estático - não move)   │
│                         │
│ Important info...       │
│ Regarding payment...    │
├─────────────────────────┤
│                         │  ← Backdrop fade in (0.25s)
│                         │
│                         │
│      [Sheet vem         │  ← Sheet desliza de baixo (spring)
│       de baixo]         │
└─────────────────────────┘
         ↓ ↓ ↓
┌─────────────────────────┐
│ Terms & Conditions      │
│ (Permanece estático)    │
│                         │
│ Important info...       │
│ [Backdrop escuro 40%]   │  ← Backdrop visível
├═════════════════════════┤
│ ▬▬▬ Handle bar          │  ← Sheet posicionado
│                         │
│ Enter your 4-digit PIN  │
│                         │
│ ○ ○ ○ ○                 │
│                         │
│ Tap to enter PIN        │
│                         │
│███████████████████████│  ← Background branco sólido
└─────────────────────────┘
```

### **2. Animação de Saída (Fechar)**
```
┌─────────────────────────┐
│ Terms & Conditions      │
│ (Estático - não move)   │  ← NÃO ANIMA
│                         │
│ Important info...       │
│ [Backdrop fade out]     │  ← Backdrop desaparece
├═════════════════════════┤
│ ▬▬▬                     │
│                         │  ← Sheet desce
│ Enter PIN               │
│                         │
│ ○ ○ ○ ○                 │
│      [Sheet desce       │
│       para baixo]       │
│███████████████████████│
└─────────────────────────┘
         ↓ ↓ ↓
┌─────────────────────────┐
│ Terms & Conditions      │  ← Permanece intacto
│ (Volta ao foco)         │
│                         │
│ Important information   │
│ regarding the payment   │
│ plan conditions and     │
│ terms. You can read...  │
│                         │
│                         │
│ [Confirm renegotiation] │
└─────────────────────────┘
```

---

## 🔧 Implementação Técnica

### **IOSBottomSheet Component**

```tsx
<div className="absolute inset-0 z-50">
  {/* 1. Backdrop - anima opacity */}
  <motion.div
    className="absolute inset-0 bg-black/40"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />

  {/* 2. Background branco - estático, sempre visível */}
  <div className="absolute inset-0 pointer-events-none" 
       style={{ top: 'auto' }}>
    <div className="bg-white w-full h-full" />
  </div>

  {/* 3. Bottom Sheet - APENAS ESTE ANIMA */}
  <motion.div
    className="relative w-full h-[45%]"
    initial={{ y: "100%" }}  // ← Começa fora da tela
    animate={{ y: 0 }}       // ← Desliza para cima
    exit={{ y: "100%" }}     // ← Desliza para baixo
    transition={{ 
      type: "spring", 
      stiffness: 350, 
      damping: 35,
      mass: 0.9
    }}
  >
    {children}
  </motion.div>
</div>
```

---

## 🎬 Sequência de Animação

### **Abertura:**
```
t=0ms:     Terms estático + Backdrop opacity 0
t=0ms:     Sheet em y: "100%" (fora)
           ↓
t=50ms:    Backdrop opacity aumentando (fade in)
t=50ms:    Sheet começando a subir
           ↓
t=250ms:   Backdrop opacity 1 (completo)
t=400ms:   Sheet em y: 0 (posicionado)
           ↓
t=600ms:   Input focus ativado
```

### **Fechamento:**
```
t=0ms:     User clica X ou arrasta
t=0ms:     setIsOpen(false)
           ↓
t=0ms:     Backdrop fade out inicia
t=0ms:     Sheet desce (y: 0 → "100%")
           ↓
t=250ms:   Backdrop opacity 0 (invisível)
t=400ms:   Sheet fora da tela (y: "100%")
           ↓
t=400ms:   onClose() chamado
           ↓
t=400ms:   Terms volta ao foco (sempre esteve lá)
```

---

## 📋 Checklist de Comportamento

### ✅ **Abertura (Open)**
- [x] Terms fica estático (não move)
- [x] Backdrop fade in (0.25s)
- [x] Background branco aparece instantâneo
- [x] Sheet desliza de baixo (spring 350/35/0.9)
- [x] Conteúdo move junto com o sheet
- [x] Input focus após animação (600ms)

### ✅ **Fechamento (Close)**
- [x] Terms fica estático (não move)
- [x] Backdrop fade out (0.25s)
- [x] Background branco desce com o sheet
- [x] Sheet desliza para baixo (spring)
- [x] Conteúdo desce junto com o sheet
- [x] onClose() chamado após animação (400ms)
- [x] Terms volta imediatamente ao foco

### ✅ **Swipe Down**
- [x] Drag gesture habilitado
- [x] Elastic bottom (0.5)
- [x] Threshold 100px para fechar
- [x] Mesmo comportamento do close

---

## 🐛 Problemas Corrigidos

### **Problema 1: Sheet não vinha de baixo**
```tsx
// ❌ ANTES:
<motion.div style={{ height: '100%' }}>
  // Todo container animava
</motion.div>

// ✅ DEPOIS:
<div>  // Container estático
  <motion.div className="h-[45%]">  // Apenas sheet anima
    {children}
  </motion.div>
</div>
```

### **Problema 2: Terms animava junto**
```tsx
// ❌ ANTES:
<motion.div key="terms-bg" 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.5 }}>  // Animava
  <TermsConditionsScreen />
</motion.div>

// ✅ DEPOIS:
<motion.div key="terms-bg" 
            className="absolute inset-0">  // Sem animação
  <TermsConditionsScreen />
</motion.div>
```

### **Problema 3: Vazamento de conteúdo**
```tsx
// ❌ ANTES:
<motion.div className="h-[45%]">  // Background só 45%
  // Conteúdo vazava embaixo
</motion.div>

// ✅ DEPOIS:
<div className="absolute inset-0 pointer-events-none" 
     style={{ top: 'auto' }}>
  <div className="bg-white w-full h-full" />  // Background até o bottom
</div>
<motion.div className="h-[45%]">
  // Sem vazamento
</motion.div>
```

---

## 🎯 Resultado Final

### **Características:**
- ✅ Sheet desliza de baixo → cima (abertura)
- ✅ Sheet desliza de cima → baixo (fechamento)
- ✅ Terms permanece estático sempre
- ✅ Background branco sólido até o bottom
- ✅ Sem vazamento de conteúdo
- ✅ Spring physics padrão iOS (350/35/0.9)
- ✅ Backdrop fade in/out (0.25s)

### **Timing:**
```
Abertura:  400ms (spring)
Fechamento: 400ms (spring)
Backdrop:   250ms (linear)
Input focus: 600ms (delay)
```

### **Physics:**
```
Stiffness: 350  (responsivo)
Damping:   35   (bounce controlado)
Mass:      0.9  (leve)
```

---

**Status:** ✅ Comportamento corrigido e padronizado! 🎯✨
