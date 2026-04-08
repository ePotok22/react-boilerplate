<div align="center">

# 🌿 React Boilerplate

**Production-ready React starter with everything you need — and nothing you don't.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev) [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org) [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev) [![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br />

<sub>Built with React 19 · TanStack Start · Tailwind CSS 4 · DaisyUI 5 · GSAP 3 · Biome · Vitest</sub>

</div>
<img width="1388" height="844" alt="image" src="https://github.com/user-attachments/assets/dc5694f3-a998-430e-8e16-c7723739c7b2" />

---

## ✨ Why This Boilerplate?

> Skip weeks of setup. Start building features on day one.

- **40+ components** following Atomic Design (atoms → molecules → organisms → templates)
- **11 custom hooks** with full test coverage — animations, storage, debounce, media queries
- **Interactive showcase page** — every component, hook, and utility demo'd in one place
- **Auth-ready** — Zustand store, protected routes, JWT refresh, HTTP interceptors
- **Dark/Light/Auto** theme with zero FOUC
- **i18n** — English & Thai out of the box
- **CI/CD pipeline** — GitHub Actions with type check, lint, test, security scan

---

## 🛠 Tech Stack

<table>
<tr><td><b>Category</b></td><td><b>Technology</b></td><td><b>Purpose</b></td></tr>
<tr><td>⚛️ Framework</td><td>React 19 + TypeScript 6</td><td>React Compiler, strict mode</td></tr>
<tr><td>🧭 Routing</td><td>TanStack Start + Router</td><td>File-based, type-safe routes</td></tr>
<tr><td>📡 Data</td><td>TanStack Query + Form</td><td>Server state, form management</td></tr>
<tr><td>🗃️ State</td><td>Zustand 5</td><td>Auth store, toast store</td></tr>
<tr><td>🎨 Styling</td><td>Tailwind CSS 4 + DaisyUI 5</td><td>Utility-first + component library</td></tr>
<tr><td>🎬 Animation</td><td>GSAP 3</td><td>ScrollTrigger, timelines, stagger</td></tr>
<tr><td>🌐 HTTP</td><td>Ky 2</td><td>Typed client, retry, auth interceptors</td></tr>
<tr><td>🌍 i18n</td><td>i18next 26</td><td>EN / TH locales</td></tr>
<tr><td>✅ Validation</td><td>Valibot</td><td>Schema validation, env + forms</td></tr>
<tr><td>🧪 Testing</td><td>Vitest 4 + Testing Library</td><td>37 test files, happy-dom</td></tr>
<tr><td>📋 Code Quality</td><td>Biome 2.4</td><td>Lint + format (no ESLint/Prettier)</td></tr>
<tr><td>🔧 Build</td><td>Vite 8 + Rolldown</td><td>OXC minify, LightningCSS, gzip + brotli</td></tr>
<tr><td>🐳 Deploy</td><td>Docker (multi-stage)</td><td>Node 24 Alpine, non-root user</td></tr>
<tr><td>🔒 Security</td><td>Sentry (optional)</td><td>Error tracking in production</td></tr>
</table>

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/ePotok22/react-boilerplate.git
cd react-boilerplate

# Install
npm install

# Environment
cp .env.example .env

# Start dev server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** — you'll see the interactive component showcase.

---

## 📜 Scripts

| Command | Description |
|:--|:--|
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Production build (OXC minify + gzip/brotli) |
| `npm run preview` | Preview production build |
| `npm run check` | Biome lint + format (auto-fix) |
| `npm run check:type` | TypeScript type checking |
| `npm run test` | Run all tests |
| `npm run test:cov` | Tests with V8 coverage report |
| `npm run tsr:generate` | Regenerate TanStack route tree |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/           23 components — smallest UI building blocks
│   │   ├── Accordion      Collapsible content panels
│   │   ├── Alert          Contextual feedback (info/success/warning/error)
│   │   ├── Avatar         User avatar with fallback
│   │   ├── Badge          Status labels (9 color variants)
│   │   ├── Button         5 variants × 4 sizes
│   │   ├── Checkbox       Form checkbox with label
│   │   ├── Divider        Visual separator
│   │   ├── Drawer         Slide-out side panel
│   │   ├── EmptyState     No-data placeholder
│   │   ├── ErrorBoundary  React error boundary wrapper
│   │   ├── Kbd            Keyboard shortcut display
│   │   ├── LoadingOverlay Full-area loading state
│   │   ├── ProgressBar    Animated progress indicator
│   │   ├── RadioGroup     Radio button group
│   │   ├── Skeleton       Content placeholder shimmer
│   │   ├── SkipToContent  A11y skip-to-main link
│   │   ├── Spinner        Loading spinner (4 sizes)
│   │   ├── Tabs           Tab navigation
│   │   ├── Tag            Removable tag/chip
│   │   ├── ThemeToggle    Dark/light mode switcher
│   │   ├── ToastContainer GSAP-animated toast renderer
│   │   ├── Toggle         On/off toggle switch
│   │   └── Tooltip        Hover tooltip
│   │
│   ├── molecules/       13 components — composed from atoms
│   │   ├── ButtonGroup    Grouped action buttons
│   │   ├── Card           Content card (title, badge, image, actions)
│   │   ├── CardForm       Form wrapper styled as card
│   │   ├── DatePicker     Single/range calendar (react-day-picker)
│   │   ├── FormField      Label + input + error message
│   │   ├── InputGroup     Input with prefix/suffix addons
│   │   ├── LanguageSwitcher  EN ↔ TH one-click toggle
│   │   ├── Modal          Native <dialog> with portal
│   │   ├── Pagination     Smart ellipsis page nav
│   │   ├── SelectField    Dropdown select with options
│   │   ├── StatsGroup     Statistics display grid
│   │   ├── Table          Sortable, paginated data table
│   │   └── TextareaField  Label + textarea + error
│   │
│   ├── organisms/        4 sections + 14 showcase demos
│   │   ├── Header         Nav bar with GSAP entrance animation
│   │   ├── Footer         Site footer with links
│   │   ├── HeroSection    Landing hero with parallax
│   │   ├── FeatureGrid    Feature cards grid with CTA
│   │   └── showcase/      Interactive component demos
│   │
│   ├── layouts/          AuthLayout · DashboardLayout
│   ├── templates/        PageTemplate (max-width container)
│   └── pages/            ErrorPage (500) · NotFoundPage (404)
│
├── hooks/               11 custom hooks
│   ├── useClickOutside     Detect outside clicks
│   ├── useDebounce         Debounce values
│   ├── useGSAP             GSAP context with auto-cleanup
│   ├── useLocalStorage     Typed localStorage
│   ├── useMagneticHover    Magnetic cursor effect
│   ├── useMediaQuery       Responsive breakpoints
│   ├── usePageTitle        Dynamic document.title
│   ├── useParallax         Scroll parallax effect
│   ├── usePost             React Query CRUD hooks
│   ├── useScrollReveal     Scroll-triggered reveals
│   ├── useStaggerReveal    Staggered entrance animations
│   └── useTextReveal       Text entrance animations
│
├── stores/              Zustand state management
│   ├── auth.store          User, tokens, JWT refresh
│   └── toast.store         Global notifications
│
├── services/            API service layer
│   ├── auth.service        Login, register, logout, refresh
│   └── post.service        CRUD example with qs serialization
│
├── middlewares/          ProtectedRoute auth guard
├── config/              QueryClient + env schema (Valibot)
├── i18n/                i18next with EN/TH locales
├── routes/              TanStack file-based routes
├── types/               Shared TypeScript interfaces
└── utils/
    ├── cn                clsx + tailwind-merge
    ├── http-client       Ky factory (auth, retry, URL sanitization)
    ├── env.helper        Environment parsing + validation
    └── boolean.helper    Truthy boolean parsing
```

---

## 🧩 Component Showcase

The home page (`/`) is a **live interactive showcase** — every component rendered with working demos:

| Section | What's Demonstrated |
|:--|:--|
| 🎬 **GSAP Animations** | Tween, stagger grid, timeline sequence |
| 🔔 **Toast Notifications** | All 4 variants with spring entrance |
| 📅 **Date Picker** | Single, range, disabled, pre-filled |
| ⏳ **Loading States** | Spinners, skeletons, progress, overlay |
| 💬 **Modal** | Basic dialog, confirmation with actions |
| 📄 **Pagination** | Smart ellipsis with page control |
| 📝 **Forms** | Validation, error states, multiple inputs |
| 🔤 **Typography** | Headings, body, prose, code blocks |
| 🏷️ **Atoms** | Alerts, badges, buttons, toggles, tabs |
| 📐 **Layouts** | Auth card + dashboard sidebar preview |
| 🪝 **Hooks** | Live debounce, media query, counter demos |
| 🔐 **Auth System** | Store API, protected routes, role guard |
| ⚠️ **Error Handling** | Boundary, 404, route errors |
| 📊 **Data Table** | Sortable columns, search, pagination |

---

## 🎬 Animation System

Built-in GSAP integration with **5 animation hooks** and auto-cleanup:

```tsx
// Scroll-triggered reveal
const ref = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.6 });
return <div ref={ref}>I appear on scroll</div>;

// Staggered children entrance
const ref = useStaggerReveal<HTMLUListElement>({ stagger: 0.1 });
return <ul ref={ref}>{items.map(item => <li key={item}>{item}</li>)}</ul>;

// GSAP context with cleanup
const containerRef = useRef(null);
useGSAP(() => {
  gsap.to(".box", { rotation: 360, duration: 1 });
}, { scope: containerRef });
```

| Hook | Purpose |
|:--|:--|
| `useGSAP` | Context-safe wrapper with auto-cleanup |
| `useScrollReveal` | ScrollTrigger reveal animations |
| `useStaggerReveal` | Staggered children entrance |
| `useTextReveal` | Text character/word animations |
| `useParallax` | Scroll parallax effect |
| `useMagneticHover` | Cursor magnetic attraction |

---

## 🔐 Auth System

Complete authentication flow ready to connect to any backend:

```tsx
// Login
const login = useAuthStore(s => s.login);
await login({ email, password });

// Protected route
<ProtectedRoute roles={["admin", "editor"]}>
  <DashboardLayout />
</ProtectedRoute>

// Auto token refresh via HTTP interceptor
const client = createHttpClient("https://api.example.com");
// → 401 responses trigger automatic token refresh
```

**Includes:** Zustand persist store · JWT access/refresh tokens · role-based guards · HTTP interceptors · login/register/logout services

---

## 🌍 Internationalization

Switch between **English** and **Thai** with one click:

```
src/i18n/locales/
├── en/
│   ├── common.json
│   ├── components/   (header, footer, dashboard, showcase)
│   └── pages/        (home, errors)
└── th/
    ├── common.json
    ├── components/
    └── pages/
```

Uses `i18next` with namespace separation — add new languages by copying a locale folder.

---

## 🎨 Design System

Custom CSS token system with **automatic dark mode**:

| Token | Light | Dark |
|:--|:--|:--|
| `--sea-ink` | `#173a40` | `#d7ece8` |
| `--lagoon` | `#4fb8b2` | `#60d7cf` |
| `--palm` | `#2f6a4a` | `#6ec89a` |
| `--bg-base` | `#e7f3ec` | `#1c2e36` |
| `--surface` | `rgba(255,255,255,0.74)` | `rgba(38,64,72,0.85)` |

**Fonts:** Manrope (body) · Fraunces (display) · **DaisyUI** theme overrides included.

---

## 🧪 Testing

**37 test files** with Vitest + Testing Library + happy-dom:

```bash
npm run test           # Run all tests
npm run test:cov       # With V8 coverage report
```

Coverage spans:

| Layer | Tested |
|:--|:--|
| **Atoms** | Alert, Badge, Button, Spinner, Skeleton, LoadingOverlay, SkipToContent, ToastContainer, ThemeToggle, ErrorBoundary, ProgressBar |
| **Molecules** | Card, FormField, Modal, Pagination, StatsGroup, Table, LanguageSwitcher |
| **Hooks** | useDebounce, useLocalStorage, useClickOutside, useGSAP, useScrollReveal, useMediaQuery, usePageTitle, useMagneticHover, useParallax, useStaggerReveal, useTextReveal |
| **Stores** | auth.store, toast.store |
| **Services** | auth.service |
| **Utils** | cn, boolean.helper, http-client, env.helper |

---

## 🏗 Build & Optimization

The production build is heavily optimized via Vite 8 + Rolldown:

| Feature | Detail |
|:--|:--|
| **Minification** | OXC (JS) + LightningCSS (CSS) |
| **Compression** | gzip (level 9) + brotli (max quality) |
| **Code Splitting** | Manual chunks: react, gsap, i18n, tanstack, daisyui, icons, utils |
| **CSS** | Tailwind CSS 4 with code splitting |
| **Source Maps** | Hidden in production |
| **React Compiler** | Babel preset via `@rolldown/plugin-babel` |
| **Bundle Analysis** | `rollup-plugin-visualizer` → `dist/stats.html` |

---

## 🐳 Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Or standalone
docker build -t react-boilerplate .
docker run -p 3000:3000 react-boilerplate
```

Multi-stage Alpine build · non-root user (`uid:1001`) · exposes port 3000.

---

## 📝 Commit Convention

Enforced by **commitlint** + **Husky** pre-commit hooks:

```
<type>(<scope>): <short summary>
```

| Type | Usage |
|:--|:--|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code restructuring |
| `test` | Adding tests |
| `build` | Build changes |
| `ci` | CI/CD changes |
| `perf` | Performance |

```bash
# Examples
feat(auth): add token refresh logic
fix(datepicker): handle timezone offset
test(hooks): add useDebounce edge cases
```

---

## ⚙️ CI/CD Pipeline

GitHub Actions with **4 parallel jobs**:

```
┌─────────────┐
│   Build     │  npm ci + vite build
└──────┬──────┘
       ├──────────────┬──────────────┐
┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐
│  Quality    │ │   Test    │ │  Security  │
│ tsc + biome │ │ vitest    │ │ audit +OSV │
└──────┬──────┘ └─────┬─────┘ └─────┬──────┘
       └──────────────┼──────────────┘
              ┌───────▼───────┐
              │   Summary     │
              └───────────────┘
```

Plus **weekly dependency updates** (auto-PR) and **dependency review** on PRs.

---

## 📄 Environment Variables

| Variable | Required | Description |
|:--|:--|:--|
| `VITE_API_BASE_URL` | No | API base URL |
| `VITE_API_TIMEOUT` | No | Request timeout (default: 30000ms) |
| `VITE_SENTRY_IS_USE` | No | Enable Sentry (`true`/`false`) |
| `VITE_SENTRY_DSN` | Prod* | Sentry DSN |
| `VITE_SENTRY_ORG` | Prod* | Sentry organization |
| `VITE_SENTRY_PROJECT` | Prod* | Sentry project |
| `VITE_SENTRY_AUTH_TOKEN` | Prod* | Sentry auth token |

<sub>*Required only when `VITE_SENTRY_IS_USE=true` in production — validated by Valibot schema at build time.</sub>

---

## 📋 Path Aliases

All imports use `@/` aliases (configured in `tsconfig.json` + Vite):

```tsx
import { Button } from "@/atoms/Button";
import { Card } from "@/molecules/Card";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/stores/auth.store";
```

| Alias | Maps to |
|:--|:--|
| `@/*` | `./src/*` |
| `@/atoms/*` | `./src/components/atoms/*` |
| `@/molecules/*` | `./src/components/molecules/*` |
| `@/organisms/*` | `./src/components/organisms/*` |
| `@/templates/*` | `./src/components/templates/*` |

---

<div align="center">

**Built with 💚 by [ePotok22](https://github.com/ePotok22)**

</div>
