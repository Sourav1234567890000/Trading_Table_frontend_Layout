Token Discovery Table – tradeTable Trade (Frontend Task)

A pixel-accurate, performance-optimized replica of tradeTable Trade’s Token Discovery (Pulse) table, built with modern frontend best practices.

https://axiom.trade/pulse - refernce link

Overview

This project implements a real-time token discovery table with multiple interaction patterns, smooth price updates, and robust error handling.
The goal was to demonstrate clean architecture, performance optimization, and reusable component design using Next.js 14 App Router.

Tech Stack

Framework: Next.js 14 (App Router)

Language: TypeScript (strict mode)

Styling: Tailwind CSS

UI Components: Radix UI (accessible primitives)

State & Logic: Custom hooks, memoized components

Architecture: Feature-based / Atomic component design

1-Feature IMplemented
Each column is independently rendered and error-isolated.

Token Columns :-

New Pairs

Final Stretch

Migrated

2-Interactions

Hover cards for quick token insights

Tooltips for contextual hints

Click-to-open modal with detailed token information

Sortable columns (Price / 24h Change)

3- Real-Time Updates

Mock WebSocket-like price updates

Smooth green/red price flash transitions on change

Efficient re-renders using memoization

4- Loading & Error Handling

Skeleton loaders during loading states

Column-level Error Boundaries (isolated failures)

Graceful UI fallback on runtime errors

5- Dark theme matching tradeTable Trade

Smooth hover transitions

No layout shifts (CLS-safe)

Responsive grid layout

project structure

6.Testing Error Boundaries

You can simulate an error by intentionally throwing an error inside a TokenRow or TokenColumn to verify isolated error handling.

...Notes on Scope & Trade-offs...

1.WebSocket is mocked for deterministic behavior

2.Redux Toolkit & React Query were intentionally minimized to avoid unnecessary complexity for static mock data

3.UI closely matches the reference design; minor pixel differences may exist depending on font rendering



Performance Considerations

Memoized sorting and rendering

No unnecessary state lifting

Smooth interactions under 100ms

No layout shifts (CLS-safe)



Conclusion

This implementation focuses on:

Clean, reusable architecture

Performance-first UI

Accessible interaction patterns

Production-grade error handling

Built to scale and extend easily across future features.

Screenshots (lighthouse performance)
1. desktop performance
2. mobile 

folder structure
├── app/
│ └── pulse/
│ └── page.tsx
├── components/
│ ├── pulse/
│ │ ├── TokenColumn.tsx
│ │ ├── TokenRow.tsx
│ │ ├── TokenDetailsModal.tsx
│ │ └── TokenSkeleton.tsx
│ └── common/
│ └── ErrorBoundary.tsx
├── hooks/
│ ├── useMockPriceUpdates.ts
│ └── usePriceFlash.ts
├── data/
│ └── mockTokens.ts
├── types/
│ ├── token.ts
│ └── sort.ts

Setup and RUn

# Install dependencies

npm install

# Run development server

npm run dev


Author

Sourav Singh Negi
Frontend Developer (React / TypeScript / Next.js)
