# IOSBottomSheet Component

Componente reutilizável de Bottom Sheet estilo iOS com animações suaves e comportamento nativo.

## 📦 Importação

```tsx
import IOSBottomSheet from "./components/IOSBottomSheet";
```

## 🎯 Uso Básico

```tsx
function MyScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IOSBottomSheet 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
    >
      <div className="p-6">
        <h2>Meu Conteúdo</h2>
        <p>Qualquer conteúdo aqui...</p>
      </div>
    </IOSBottomSheet>
  );
}
```

## 🔧 Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `isOpen` | `boolean` | - | **Obrigatório.** Controla visibilidade |
| `onClose` | `() => void` | - | **Obrigatório.** Callback ao fechar |
| `children` | `ReactNode` | - | **Obrigatório.** Conteúdo do bottom sheet |
| `height` | `"small" \| "medium" \| "large" \| "auto"` | `"medium"` | Altura do bottom sheet |
| `enableSwipeDown` | `boolean` | `true` | Permite arrastar para baixo para fechar |
| `showHandle` | `boolean` | `true` | Exibe barra handle no topo |
| `className` | `string` | `""` | Classes CSS adicionais |

## 📏 Alturas Disponíveis

```tsx
height="small"   // 35% da altura da tela
height="medium"  // 45% da altura da tela (PADRÃO PIN E INPUTS)
height="large"   // 60% da altura da tela
height="auto"    // Altura automática (max 90%)
```

## 🎨 Exemplos de Uso

### Exemplo 1: Bottom Sheet Pequeno
```tsx
<IOSBottomSheet 
  isOpen={isOpen} 
  onClose={handleClose}
  height="small"
>
  <div className="p-6">
    <h3>Ação Rápida</h3>
    <button>Confirmar</button>
  </div>
</IOSBottomSheet>
```

### Exemplo 2: Bottom Sheet Médio com Handle
```tsx
<IOSBottomSheet 
  isOpen={isOpen} 
  onClose={handleClose}
  height="medium"
  showHandle={true}
  enableSwipeDown={true}
>
  <div className="p-6">
    <h2>Detalhes</h2>
    <p>Arraste para baixo ou clique fora para fechar</p>
  </div>
</IOSBottomSheet>
```

### Exemplo 3: Bottom Sheet Grande (como PIN)
```tsx
<IOSBottomSheet 
  isOpen={isOpen} 
  onClose={handleClose}
  height="large"
  className="!h-[60%]" // Override para altura customizada
>
  <div className="p-6">
    <h2>Formulário Completo</h2>
    {/* Conteúdo extenso aqui */}
  </div>
</IOSBottomSheet>
```

### Exemplo 4: Bottom Sheet Auto (altura dinâmica)
```tsx
<IOSBottomSheet 
  isOpen={isOpen} 
  onClose={handleClose}
  height="auto"
  showHandle={false}
  enableSwipeDown={false}
>
  <div className="p-6">
    {/* Conteúdo com altura variável */}
  </div>
</IOSBottomSheet>
```

## ✨ Características

- ✅ **Backdrop com blur** sutil e fade in/out
- ✅ **Spring physics** padronizado iOS (stiffness: 350, damping: 35, mass: 0.9)
- ✅ **Handle bar** visual para swipe down
- ✅ **Swipe down** para fechar com drag gesture
- ✅ **4 alturas pré-configuradas** (small, medium, large, auto)
- ✅ **Background branco sólido** estendido até o bottom (evita vazamento de conteúdo)
- ✅ **Animações sincronizadas** (todos elementos movem juntos)
- ✅ **Overflow scroll** automático para conteúdo longo

## 🔄 Fluxo de Animação

```
1. Backdrop fade in (0.25s)
2. Bottom sheet desliza de baixo (spring)
3. Handle bar aparece (0.1s delay)
4. Conteúdo fade in (0.15s delay)
   ↓
Usuário interage
   ↓
5. Fechar: Animação reversa
```

## 📱 Casos de Uso no App

### 1. **PIN Screen**
```tsx
<IOSBottomSheet 
  isOpen={isOpen} 
  onClose={handleClose}
  height="large"
  className="!h-[60%]"
>
  {/* Input PIN + Dots */}
</IOSBottomSheet>
```

### 2. **Filtros/Opções**
```tsx
<IOSBottomSheet 
  isOpen={showFilters} 
  onClose={() => setShowFilters(false)}
  height="medium"
>
  {/* Lista de filtros */}
</IOSBottomSheet>
```

### 3. **Confirmação**
```tsx
<IOSBottomSheet 
  isOpen={showConfirm} 
  onClose={() => setShowConfirm(false)}
  height="small"
  showHandle={false}
>
  {/* Mensagem de confirmação */}
</IOSBottomSheet>
```

## 🎯 Best Practices

1. **Sempre controle o estado `isOpen`**
   ```tsx
   const [isOpen, setIsOpen] = useState(false);
   ```

2. **Use `onClose` para limpar estado**
   ```tsx
   const handleClose = () => {
     setIsOpen(false);
     // Limpar outros estados se necessário
   };
   ```

3. **Adicione delay ao fechar para animação completar**
   ```tsx
   const handleClose = () => {
     setIsOpen(false);
     setTimeout(() => {
       // Ações após fechar
     }, 300);
   };
   ```

4. **Use className para override personalizado**
   ```tsx
   className="!h-[60%]"  // Override altura
   className="!rounded-t-[32px]"  // Override border radius
   ```

## 🐛 Troubleshooting

### Bottom sheet não abre teclado mobile
```tsx
// Adicione delay no auto-focus
useEffect(() => {
  const timer = setTimeout(() => {
    inputRef.current?.focus();
  }, 500); // Aguardar animação completar

  return () => clearTimeout(timer);
}, []);
```

### Conteúdo não rola
```tsx
// O IOSBottomSheet já tem overflow-y-auto
// Certifique-se de que o conteúdo tem altura definida
<IOSBottomSheet ...>
  <div className="h-full overflow-y-auto">
    {/* Conteúdo longo */}
  </div>
</IOSBottomSheet>
```

### Animação travando
```tsx
// Reduza stiffness e aumente damping
transition={{ 
  type: "spring", 
  stiffness: 300, // Menor = mais suave
  damping: 40,    // Maior = menos bounce
}}
```

## 🚀 Próximos Passos

Para criar novas telas com Bottom Sheet:

1. **Importe o componente**
   ```tsx
   import IOSBottomSheet from "../../components/IOSBottomSheet";
   ```

2. **Configure estado**
   ```tsx
   const [isOpen, setIsOpen] = useState(false);
   ```

3. **Use o componente**
   ```tsx
   <IOSBottomSheet 
     isOpen={isOpen} 
     onClose={() => setIsOpen(false)}
     height="medium"
   >
     {/* Seu conteúdo aqui */}
   </IOSBottomSheet>
   ```

4. **Adicione animações internas**
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.3 }}
   >
     {/* Conteúdo animado */}
   </motion.div>
   ```

---

**Criado para o protótipo de simulação financeira** 🎯✨