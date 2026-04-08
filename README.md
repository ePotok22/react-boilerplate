# React Boilerplate

Production-ready React boilerplate with TanStack Start, Tailwind CSS 4, DaisyUI 5, and GSAP animations. Features a complete interactive showcase page demonstrating every component, hook, and utility in the toolkit.

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 6 |
| **SSR / Routing** | TanStack Start + Router (file-based, type-safe) |
| **Data** | TanStack Query + Form + Valibot |
| **State** | Zustand (auth, toast) |
| **Styling** | Tailwind CSS 4 + DaisyUI 5 |
| **Animation** | GSAP 3 (ScrollTrigger, Timelines, Stagger) |
| **HTTP** | Ky (typed, secure, retry) |
| **i18n** | i18next (EN / TH) |
| **Testing** | Vitest + Testing Library (132 tests) |
| **Code Quality** | Biome (lint + format) |
| **Git Hooks** | Husky + lint-staged + commitlint |
| **Error Tracking** | Sentry (optional) |
| **Bundler** | Vite 8 |

## Getting Started

```bash
# 1. Clone and install
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Start development
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run test:cove` | Run tests with coverage |
| `npm run check` | Biome lint + format |
| `npm run tsr:generate` | Regenerate route types |

## Project Structure (Atomic Design)

```
src/
├── components/
│   ├── atoms/              # Smallest UI units — stateless, reusable
│   │   ├── Alert            # Contextual feedback (info, success, warning, error)
│   │   ├── Badge            # Status labels (9 variants)
│   │   ├── Button           # Actions (5 variants × 4 sizes)
│   │   ├── LoadingOverlay   # Full-area loading state
│   │   ├── Skeleton         # Content placeholders
│   │   ├── SkipToContent    # Accessibility skip-to-main link
│   │   ├── Spinner          # Loading indicator (4 sizes)
│   │   └── ToastContainer   # Animated toast renderer (GSAP)
│   ├── molecules/           # Composed atoms — single responsibility
│   │   ├── Card             # Content grouping with title, badge, image
│   │   ├── DatePicker       # Single/range calendar (react-day-picker)
│   │   ├── FormField        # Label + input + error with forwardRef
│   │   ├── Modal            # Native <dialog> wrapper
│   │   ├── Pagination       # Smart ellipsis page navigation
│   │   └── StatsGroup       # Statistics display container
│   ├── organisms/           # Complex UI sections
│   │   ├── FeatureGrid      # Feature cards grid with CTA
│   │   ├── HeroSection      # Landing hero with GSAP animations
│   │   └── showcase/        # Interactive demo sections (14 modules)
│   ├── templates/           # Page-level wrappers
│   │   └── PageTemplate     # Max-width + padding container
│   ├── layouts/             # Structural layouts
│   │   ├── AuthLayout       # Centered card (login/register)
│   │   └── DashboardLayout  # Sidebar + content drawer
│   ├── pages/               # Full error pages
│   │   ├── ErrorPage        # 500 error (i18n)
│   │   └── NotFoundPage     # 404 with home link
│   └── auth/
│       └── ProtectedRoute   # Auth guard redirect
├── hooks/                   # Custom React hooks
│   ├── useClickOutside      # Detect clicks outside element
│   ├── useDebounce          # Debounce values (configurable delay)
│   ├── useGSAP              # GSAP context wrapper with auto-cleanup
│   ├── useLocalStorage      # Typed localStorage persistence
│   ├── useMediaQuery        # Reactive media query matching
│   ├── usePageTitle         # Dynamic document title management
│   └── useScrollReveal      # Scroll-triggered GSAP reveal animations
├── stores/                  # Zustand state management
│   ├── auth.store           # User, tokens, isAuthenticated
│   └── toast.store          # Global notifications with auto-dismiss
├── services/                # API service layer
│   └── auth.service         # Login, register, logout, refresh, profile
├── config/                  # Environment schema (Valibot)
├── constants/               # ENV, HTTP constants
├── enums/                   # Language, Theme enums
├── i18n/                    # i18next + locales (en, th)
├── routes/                  # TanStack file-based routes
├── types/                   # Shared interfaces (User, ApiError, etc.)
└── utils/                   # Helpers
    ├── cn                   # clsx + tailwind-merge
    ├── http-client          # Ky factory with auth, sanitization, retry
    ├── env.helper           # Env parsing + validation
    └── boolean.helper       # Truthy boolean parsing
```

## Features

### GSAP Animation System

The boilerplate includes a complete GSAP integration for React:

- **`useGSAP` hook** — Context-safe wrapper with automatic cleanup on unmount, supports scoped selector text and `contextSafe` for imperative animations
- **`useScrollReveal` hook** — Scroll-triggered reveal using ScrollTrigger with configurable direction, stagger, and easing
- **Animated ToastContainer** — Toasts slide in/out with spring physics
- **Hero entrance** — Timeline animation with staggered nav items
- **Section reveals** — Each showcase section fades in on scroll
- **GSAP Showcase** — Interactive demos for tweens, stagger, and timelines

### Component Showcase

The home page (`/`) is an interactive showcase displaying every component:

- **GSAP Animations** — tween, stagger grid, timeline sequence demos
- **Toast Notifications** — trigger all 4 variants with GSAP entrance
- **Date Picker** — single, range, disabled dates, pre-filled
- **Loading States** — spinners, skeletons, overlay (3s simulation)
- **Modal** — basic dialog, confirmation with delete action
- **Pagination** — interactive with smart ellipsis handling
- **Forms** — validation states, error display, multiple inputs
- **Typography** — headings, body text, cards, all button variants
- **Alerts & Badges** — all variants displayed
- **Layouts** — Auth and Dashboard layout previews
- **Hooks** — live useDebounce, useMediaQuery, GSAP counter demos
- **Auth System** — store API, protected routes, service methods
- **Error Handling** — boundary, 404, route errors

### Architecture Highlights

- **Atomic Design** — atoms → molecules → organisms → templates → pages
- **< 300 lines per file** — all components are concise and focused
- **Accessibility** — Skip-to-content link, ARIA labels, semantic HTML
- **Dark / Light / Auto** theme with FOUC prevention script
- **Type-safe routing** with auto-generated route tree
- **Auth ready** — Zustand store, protected routes, JWT token management
- **Global toasts** — fire-and-forget from anywhere via `useToastStore`
- **Secure HTTP client** — CSRF-safe, URL sanitization, open redirect prevention
- **i18n** — English & Thai with one-click language switcher
- **Env validation** — Valibot schema with production-only checks

## Testing

132 tests across 31 test files covering:

- **Atoms** — Alert, Badge, Button, Spinner, Skeleton, LoadingOverlay, SkipToContent, ToastContainer
- **Molecules** — Card, FormField, Modal, Pagination, StatsGroup
- **Components** — ErrorBoundary, ThemeToggle, LanguageSwitcher
- **Templates** — PageTemplate
- **Hooks** — useDebounce, useLocalStorage, useClickOutside, useGSAP, useScrollReveal, useMediaQuery, usePageTitle
- **Stores** — auth.store, toast.store
- **Services** — auth.service
- **Utils** — cn, boolean.helper, http-client, env.helper

```bash
npm run test              # Run all tests
npm run test:cov     # With coverage report
```

## Commit Convention

Commits must follow the format enforced by commitlint:

```
<type>(<scope>): <short summary>
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `perf`

Examples:
```
feat(auth): add token refresh logic
fix(datepicker): handle timezone offset
test(hooks): add useDebounce edge cases
```

## Docker

```bash
# Build and run
docker compose up --build

# Or manually
docker build -t react-boilerplate .
docker run -p 3000:3000 react-boilerplate
```

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR to `main`/`develop`:
1. **Lint** — Biome check
2. **Test** — Vitest with coverage
3. **Build** — Production build + artifact upload

## License

Private
