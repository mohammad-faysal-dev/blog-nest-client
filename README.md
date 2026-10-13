
<p align="center">
  <img src="./public/banner-readme.png" alt="Blog Nest Banner" width="100%" />
</p>

<h1 align="center">📝 Blog Nest — Client</h1>

<p align="center">
  <em>A production-grade blogging platform built on Next.js App Router — with role-based dashboards, server-side rendering, type-safe forms, and a premium UI out of the box.</em>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.3.1-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.better-auth.com/"><img src="https://img.shields.io/badge/Better_Auth-1.7-7C3AED?style=flat-square&logo=shield&logoColor=white" alt="Better Auth" /></a>
  <img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT License" />
</p>

<br />

---

## 📸 Preview

<p align="center">
  <img src="./public/features-readme.png" alt="App Features Preview" width="100%" />
</p>

---

## 🗂️ Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#️-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [🔐 Auth & Role-Based Routing](#-auth--role-based-routing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure, session-based login & signup powered by [Better Auth](https://better-auth.com) |
| 🛡️ **Role-Based Access** | Separate `admin` & `user` dashboards with middleware-level route protection |
| 📝 **Blog Management** | Create, browse, and manage posts with rich UI cards & metadata |
| 📚 **Post History** | Users can review all their published posts in one place |
| 🧭 **Parallel Routes** | Next.js `@admin` / `@user` slots for clean, role-aware layouts — no client-side conditionals |
| ⚡ **Server Components** | Maximizes performance via React Server Components and streaming |
| 🎨 **shadcn/ui** | Accessible, pre-built components — Sidebar, Cards, Badges, Tables, Forms |
| 📋 **Type-safe Forms** | Built with `@tanstack/react-form` and validated end-to-end with `Zod v4` |
| 🔔 **Toast Notifications** | Elegant, non-intrusive user feedback via [Sonner](https://sonner.emilkowal.ski) |
| 🌙 **Dark Mode** | First-class light/dark theme support with `next-themes` |
| 🔒 **Type-safe Env** | Environment variables validated at startup via `@t3-oss/env-nextjs` + Zod |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) — App Router | `16.3.1` |
| **UI Library** | [React](https://react.dev/) | `19.x` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4` |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) · [Base UI](https://base-ui.com/) | latest |
| **Auth** | [Better Auth](https://www.better-auth.com/) | `1.7.x` |
| **Forms** | [@tanstack/react-form](https://tanstack.com/form) | `1.33.x` |
| **Tables** | [@tanstack/react-table](https://tanstack.com/table) | `9.x` |
| **Validation** | [Zod](https://zod.dev/) | `v4` |
| **Icons** | [Lucide React](https://lucide.dev/) | latest |
| **Toasts** | [Sonner](https://sonner.emilkowal.ski/) | `2.x` |
| **Image Opt.** | [Sharp](https://sharp.pixelplumbing.com/) | `0.35.x` |
| **Env Safety** | [@t3-oss/env-nextjs](https://env.t3.gg/) | latest |

---

## 📁 Project Structure

```
blog-nest-client/
│
├── 📂 public/                        # Static assets
│
└── 📂 src/
    ├── 📂 app/
    │   ├── 📂 (commonLayout)/        # ── Public Pages ──────────────────────────
    │   │   ├── page.tsx              #  🏠  Home / Blog Listing
    │   │   ├── blogs/                #  📰  Blog Detail Pages  
    │   │   ├── about/                #  ℹ️   About Page
    │   │   ├── login/                #  🔑  Login
    │   │   └── signup/               #  📝  Sign Up
    │   │
    │   └── 📂 (dashboardLayout)/     # ── Protected Dashboard ───────────────────
    │       ├── layout.tsx            #  🧱  Dashboard Shell (Sidebar + Auth Guard)
    │       ├── 📂 @admin/            #  👑  Admin Parallel Route Slot
    │       │   └── admin-dashboard/  #      Admin Dashboard Page
    │       └── 📂 @user/             #  👤  User Parallel Route Slot
    │           └── dashboard/
    │               ├── page.tsx      #      Dashboard Home
    │               ├── create-blog/  #  ✏️   Create New Post
    │               └── history/      #  🕒  My Blog History
    │
    ├── 📂 components/
    │   ├── layout/                   #  Navbar · Sidebar · Footer
    │   ├── modules/                  #  Feature components (BlogCard, Forms…)
    │   └── ui/                       #  Base UI primitives (shadcn)
    │
    ├── 📂 actions/                   #  Next.js Server Actions
    ├── 📂 services/                  #  API communication layer
    ├── 📂 hooks/                     #  Custom React hooks
    ├── 📂 lib/                       #  Utility & helper functions
    ├── 📂 types/                     #  Shared TypeScript types
    ├── 📂 routes/                    #  Route path constants
    ├── 📂 constants/                 #  App-wide constants (Roles, etc.)
    ├── 📂 providers/                 #  React Context Providers
    ├── proxy.ts                      #  Middleware route guard logic
    └── env.ts                        #  Type-safe env variable config
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Requirement |
|---|---|
| [Node.js](https://nodejs.org/) | `>= 18.x` |
| npm / [pnpm](https://pnpm.io/) | latest |
| **Blog Nest Backend** | Running locally (see backend repo) |

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/blog-nest-client.git
cd blog-nest-client
```

### 2️⃣ Install Dependencies

```bash
npm install
# or, if you prefer pnpm
pnpm install
```

### 3️⃣ Configure Environment Variables

Copy the example below into a new `.env` file at the project root:

```env
# Base URL of your NestJS backend
BACKEND_URL=http://localhost:5000

# Public URL of this Next.js frontend
FRONTEND_URL=http://localhost:3000

# Full API endpoint base (backend + /api prefix)
API_URL=http://localhost:5000/api

# Auth service base URL
AUTH_URL=http://localhost:3000
```

> ⚠️ **Important:** All variables are validated at startup using `@t3-oss/env-nextjs` + Zod.  
> A missing or malformed value will **crash the app intentionally** — this prevents silent misconfiguration in production.

### 4️⃣ Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live. 🎉

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|:---:|---|
| `BACKEND_URL` | ✅ | Base URL of the NestJS backend server |
| `FRONTEND_URL` | ✅ | Public URL of this Next.js frontend |
| `API_URL` | ✅ | Full API endpoint base (`BACKEND_URL + /api`) |
| `AUTH_URL` | ✅ | Auth service base URL (usually same as `FRONTEND_URL`) |

---

## 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | 🔥 Start the dev server with hot-reload |
| `npm run build` | 📦 Build the optimized production bundle |
| `npm start` | 🚀 Serve the production build |
| `npm run lint` | 🔍 Run ESLint across the codebase |

---

## 🔐 Auth & Role-Based Routing

Authentication is handled by **Better Auth** using HTTP-only session cookies.  
Route protection is enforced at the **middleware level** in `src/proxy.ts` — before any page ever renders.

```
Request ──▶ Middleware (proxy.ts)
               │
               ├─ Unauthenticated?           ──▶ /login
               ├─ Role: user  → /admin-dashboard  ──▶ /dashboard
               └─ Role: admin → /dashboard         ──▶ /admin-dashboard
```

### Route Access Matrix

| Route | 🌐 Public | 👤 User | 👑 Admin |
|---|:---:|:---:|:---:|
| `/` · `/blogs` · `/about` | ✅ | ✅ | ✅ |
| `/login` · `/signup` | ✅ | ↩️ redirect | ↩️ redirect |
| `/dashboard` | ❌ | ✅ | ↩️ redirect |
| `/admin-dashboard` | ❌ | ↩️ redirect | ✅ |

### Parallel Routes — Role-Aware Layouts

The dashboard leverages Next.js **Parallel Routes** (`@user` / `@admin` slots) to render entirely different UIs per role — with zero client-side conditionals bleeding into page components. Clean architecture by design.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are always welcome!

```bash
# 1. Fork the repo and create your feature branch
git checkout -b feature/your-feature-name

# 2. Commit your changes with a clear message
git commit -m "feat: add your feature description"

# 3. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please ensure your PR:
- ✅ Follows the existing code style
- ✅ Passes all lint checks (`npm run lint`)
- ✅ Has a clear, descriptive title and description

---

## 📄 License

Licensed under the **MIT License** — free to use, modify, and distribute.  
See the [LICENSE](./LICENSE) file for details.

```
MIT License © 2026 — Blog Nest
```

---

<p align="center">
  <sub>Built with ❤️ using <a href="https://nextjs.org/">Next.js</a> · <a href="https://ui.shadcn.com/">shadcn/ui</a> · <a href="https://www.better-auth.com/">Better Auth</a></sub>
</p>
