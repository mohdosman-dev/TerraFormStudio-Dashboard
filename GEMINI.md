# Terra Form Studio - Dashboard Guidelines

## Project Overview
This dashboard is the administrative hub for Terra Form Studio. it provides insights into sales, artisan activity, collection management, and order fulfillment.

## Recent Integration: Dashboard Overview
- **Backend Sync:** Integrated with `/admin/dashboard/overview`.
- **Dynamic Stats:** Live display of Total Revenue, Active Artisans, Total Collections, and Pending Orders.
- **Time-Series Visualization:** Revenue chart now supports 6-month and 1-year toggles with background API fetching.
- **Artisan Spotlight:** Real-time highlighting of featured artisans based on system spotlight settings or monthly sales.
- **Order Archive:** Real-time feed of the most recent 5 orders with status color coding.
- **Modern Loading States:** Implemented minimalist spinning loaders to maintain the "Modern Ceramics Archive" aesthetic during data transitions.

## Operational Mandate
- **No Automatic Execution:** DO NOT build, run, or test the project automatically. Only execute these operations when explicitly requested by the user.

## Architectural Standards & Refactoring Patterns

### State & API Management
- **Store-Based Actions:** Move all API handling (Axios calls) into Zustand stores (e.g., `useAuthStore`).
- **Unified State:** Stores should manage `isLoading` and `error` states for their respective domains to ensure UI consistency and reduce boilerplate in pages.

### Component Architecture
- **Atomic UI Components:** Highly reusable, low-level components (Button, Input, Alert) live in `src/components/ui/`.
- **Feature Components:** Components specific to a single page or feature live in `src/pages/[feature]/components/`.
- **Composition over Inheritance:** Compose complex UIs using these reusable blocks to maintain the "Modern Ceramics Archive" aesthetic.

### Form Management
- **Library:** Use `react-hook-form` for all form handling.
- **Validation:** Use `zod` schemas for declarative validation logic.
- **Integration:** UI components (like `Input`) must support `forwardRef` to integrate seamlessly with `react-hook-form`.

## Tech Stack Mandates

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 + daisyUI (Aesthetic: Minimalist, Premium, Earthy tones)
- **State Management:** Zustand (Store-based)
- **Routing:** React Router 7
- **HTTP Client:** Axios (Modular API layer)
- **Visuals:** Recharts for data visualization, Lucide React for iconography.
- **Testing:** Vitest + Testing Library + MSW for API mocking.

## Project Structure

- `/src/api`: Axios instance and domain-specific API calls.
- `/src/components`: Atomic and layout components.
- `/src/pages`: Feature-based page containers (e.g., `/dashboard`, `/artisans`).
- `/src/store`: Zustand stores for global state (Auth, UI, Data).
- `/src/hooks`: Reusable React hooks.
- `/src/types`: TypeScript interfaces and types.
- `/src/utils`: Formatting and logic helpers.

## Engineering Standards

- **Component Pattern:** Prefer functional components with explicit prop types.
- **Aesthetic Consistency:** Use the project's design tokens (defined in Tailwind) to maintain the "Modern Ceramics Archive" feel.
- **Error Handling:** Implement graceful loading states and error boundaries.
- **Verification:** Automated tests required for critical business logic and UI flows.
- **Test Execution:** DO NOT run tests automatically. Only execute test suites when explicitly asked by the user.

## Design Principles

- **Clarity:** Information-dense but legible layouts.
- **Feedback:** Interactive elements should have clear hover/active states.
- **Responsiveness:** Mobile-first approach for administrative tasks on the go.
