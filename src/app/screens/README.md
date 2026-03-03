# Screens Structure

This directory contains all application screens for the financial simulation flow.

## Flow Sequence

The screens are organized in the following flow order:

1. **Entry Point** → Initial entry screen
2. **Offer Hub** → Display available offers
3. **Simulation** → Monthly payment customization (current implementation)
4. **Down Payment Value** → Define down payment amount
5. **Down Payment Date** → Select down payment date
6. **Installment Value** → Define installment amount
7. **Installment Due Date** → Select installment due date
8. **Summary Screen** → Final summary and confirmation

## Directory Structure

```
/screens
  /EntryPoint
    EntryPoint.tsx
    index.ts
  /OfferHub
    OfferHub.tsx
    index.ts
  /Simulation
    Simulation.tsx       # ✅ Fully implemented with micro-interactions
    index.ts
  /DownPaymentValue
    DownPaymentValue.tsx # 🚧 Placeholder
    index.ts
  /DownPaymentDate
    DownPaymentDate.tsx  # 🚧 Placeholder
    index.ts
  /InstallmentValue
    InstallmentValue.tsx # 🚧 Placeholder
    index.ts
  /InstallmentDueDate
    InstallmentDueDate.tsx # 🚧 Placeholder
    index.ts
  /SummaryScreen
    SummaryScreen.tsx    # 🚧 Placeholder
    index.ts
  index.ts               # Central export
  README.md
```

## Usage

Import screens from the central index:

```typescript
import { 
  EntryPointScreen,
  OfferHubScreen,
  SimulationScreen,
  DownPaymentValueScreen,
  DownPaymentDateScreen,
  InstallmentValueScreen,
  InstallmentDueDateScreen,
  SummaryScreen 
} from './screens';
```

## Screen Guidelines

Each screen should:

- Use design tokens from `/src/app/constants`
- Follow the same structure and naming conventions
- Export as default from the main file
- Re-export through index.ts
- Include JSDoc comments describing the screen purpose
- Maintain 375x812 viewport dimensions
- Use consistent animations from `motion/react`

## Design System

All screens share:

- **Colors**: Defined in `/src/app/constants/colors.ts`
- **Tokens**: Defined in `/src/app/constants/tokens.ts`
- **Fonts**: Graphik (primary), Nu Sans Text (secondary), SF Pro (system)
- **Animations**: Spring physics with consistent transitions

## Implementation Status

| Screen | Status | Notes |
|--------|--------|-------|
| Entry Point | 🚧 Placeholder | To be implemented |
| Offer Hub | 🚧 Placeholder | To be implemented |
| Simulation | ✅ Complete | Full implementation with animations |
| Down Payment Value | 🚧 Placeholder | To be implemented |
| Down Payment Date | 🚧 Placeholder | To be implemented |
| Installment Value | 🚧 Placeholder | To be implemented |
| Installment Due Date | 🚧 Placeholder | To be implemented |
| Summary Screen | 🚧 Placeholder | To be implemented |

## Next Steps

1. Implement navigation logic between screens
2. Add state management for flow data
3. Implement remaining placeholder screens
4. Add screen transition animations
5. Implement back navigation
