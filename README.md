
<p align="center">
  <img src="./public/banner-readme.png" alt="Blog Nest Banner" width="100%" />
</p>

<h1 align="center">📝 Blog Nest Client</h1>

<p align="center">
  <em>A modern, full-featured blogging platform with role-based dashboards, server-side rendering, and a seamless user experience — built with the latest Next.js App Router.</em>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.3.1-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.better-auth.com/"><img src="https://img.shields.io/badge/Better_Auth-1.7-7C3AED?style=flat-square&logo=shield&logoColor=white" alt="Better Auth" /></a>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" />
</p>

<br />

---

## 📸 Screenshots

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
- [📜 Scripts](#-scripts)
- [🔐 Auth & Role-Based Routing](#-auth--role-based-routing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<table>
  <tr>
    <td>🔐 <strong>Authentication</strong></td>
    <td>Secure session-based login & signup powered by <a href="https://better-auth.com">Better Auth</a></td>
  </tr>
  <tr>
    <td>🛡️ <strong>Role-Based Access</strong></td>
    <td>Separate <code>admin</code> & <code>user</code> dashboards with middleware-level route guarding</td>
  </tr>
  <tr>
    <td>📝 <strong>Blog Management</strong></td>
    <td>Create, browse, and manage blog posts with rich UI cards & metadata</td>
  </tr>
  <tr>
    <td>📚 <strong>Post History</strong></td>
    <td>Users can view their own published blog post history at a glance</td>
  </tr>
  <tr>
    <td>🧭 <strong>Parallel Routes</strong></td>
    <td>Next.js App Router <code>@admin</code> / <code>@user</code> slots for role-aware layouts</td>
  </tr>
  <tr>
    <td>⚡ <strong>Server Components</strong></td>
    <td>Maximizes performance with React Server Components and streaming</td>
  </tr>
  <tr>
    <td>🎨 <strong>shadcn/ui</strong></td>
    <td>Accessible, pre-built components — Sidebar, Cards, Badges, Tables, Forms</td>
  </tr>
  <tr>
    <td>📋 <strong>Type-safe Forms</strong></td>
    <td>Forms built with <code>@tanstack/react-form</code> and validated using <code>Zod v4</code></td>
  </tr>
  <tr>
    <td>🔔 <strong>Toast Notifications</strong></td>
    <td>Elegant, non-intrusive feedback via <a href="https://sonner.emilkowal.ski">Sonner</a></td>
  </tr>
  <tr>
    <td>🌙 <strong>Dark Mode</strong></td>
    <td>Full light/dark theme support with <code>next-themes</code></td>
  </tr>
  <tr>
    <td>🔒 <strong>Type-safe Env</strong></td>
    <td>Environment variables validated at startup using <code>@t3-oss/env-nextjs</code></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `16.3.1` |
| **UI Library** | [React](https://react.dev/) | `19.x` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4` |
| **Components** | [shadcn/ui](https://ui.shadcn.com/), [Base UI](https://base-ui.com/) | latest |
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
├── 📂 public/                        # Static assets (images, icons, etc.)
│
├── 📂 src/
│   │
│   ├── 📂 app/
│   │   ├── 📂 (commonLayout)/        # ─── Public Pages ───────────────────
│   │   │   ├── page.tsx              #  🏠  Home / Blog Listing Page
│   │   │   ├── blogs/                #  📰  Blog Detail Pages
│   │   │   ├── about/                #  ℹ️   About Page
│   │   │   ├── login/                #  🔑  Login Page
│   │   │   └── signup/               #  📝  Signup Page
│   │   │
│   │   └── 📂 (dashboardLayout)/     # ─── Protected Dashboard ─────────────
│   │       ├── layout.tsx            #  🧱  Dashboard Shell (Sidebar + Auth)
│   │       ├── 📂 @admin/            #  👑  Admin Parallel Route Slot
│   │       │   └── admin-dashboard/  #     Admin Dashboard Page
│   │       └── 📂 @user/             #  👤  User Parallel Route Slot
│   │           └── dashboard/        #     User Dashboard
│   │               ├── page.tsx      #     Dashboard Home
│   │               ├── create-blog/  #  ✏️   Create New Post
│   │               └── history/      #  🕒  My Blog History
│   │
│   ├── 📂 components/
│   │   ├── layout/                   # Navbar, Sidebar, Footer
│   │   ├── modules/                  # Feature components (BlogCard, Forms)
│   │   └── ui/                       # Base UI components (shadcn)
│   │
│   ├── 📂 actions/                   # Next.js Server Actions
│   ├── 📂 services/                  # API communication layer
│   ├── 📂 hooks/                     # Custom React hooks
│   ├── 📂 lib/                       # Utility / helper functions
│   ├── 📂 types/                     # Shared TypeScript types
│   ├── 📂 routes/                    # Route path constants
│   ├── 📂 constants/                 # App-wide constants (Roles, etc.)
│   ├── 📂 providers/                 # React Context Providers
│   ├── proxy.ts                      # Middleware route guard logic
│   └── env.ts                        # Type-safe env variable config
│
├── components.json                   # shadcn/ui config
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following are installed on your machine:

| Tool | Version |
|---|---|
| [Node.js](https://nodejs.org/) | `>= 18.x` |
| [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) | latest |
| **Blog Nest Backend** | Running locally on a port |

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/blog-nest-client.git
cd blog-nest-client
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root and fill in your values:

```env
# Base URL of your NestJS backend server
BACKEND_URL=http://localhost:5000

# Public URL of this Next.js frontend
FRONTEND_URL=http://localhost:3000

# API base URL (backend + /api prefix)
API_URL=http://localhost:5000/api

# Authentication endpoint
AUTH_URL=http://localhost:3000
```

> ⚠️ **Note:** All env variables are validated at build/runtime using `@t3-oss/env-nextjs` + Zod. Missing or malformed values will **crash the app on startup** — this is intentional and prevents misconfiguration.

### 4️⃣ Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BACKEND_URL` | ✅ Yes | Base URL of the NestJS backend |
| `FRONTEND_URL` | ✅ Yes | Public URL of this Next.js app |
| `API_URL` | ✅ Yes | Full API endpoint base |
| `AUTH_URL` | ✅ Yes | Auth service base URL |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | 🔥 Start development server with hot-reload |
| `npm run build` | 📦 Build the app for production |
| `npm start` | 🚀 Run the production build |
| `npm run lint` | 🔍 Lint codebase with ESLint |

---

## 🔐 Auth & Role-Based Routing

Authentication is handled by **Better Auth** with session cookies. Route protection is enforced at the **middleware level** via `src/proxy.ts`.

```
Request ──▶ Middleware (proxy.ts)
               │
               ├─ Not authenticated? ──▶ Redirect → /login
               │
               ├─ Role: user  + path /admin-dashboard ──▶ Redirect → /dashboard
               │
               └─ Role: admin + path /dashboard ──▶ Redirect → /admin-dashboard
```

### Route Access Matrix

| Route | 🌐 Public | 👤 User | 👑 Admin |
|---|:---:|:---:|:---:|
| `/` , `/blogs`, `/about` | ✅ | ✅ | ✅ |
| `/login` , `/signup` | ✅ | ↩️ redirect | ↩️ redirect |
| `/dashboard` | ❌ | ✅ | ↩️ redirect |
| `/admin-dashboard` | ❌ | ↩️ redirect | ✅ |

### Role-Specific Dashboard Views (Parallel Routes)

The dashboard uses Next.js **Parallel Routes** (`@user` / `@admin` slots) to render completely different UI based on the authenticated user's role — without any client-side conditionals leaking into the page components.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request 🚀

Please make sure to:
- Follow existing code style
- Pass all lint checks (`npm run lint`)
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License © 2026 — Blog Nest
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, and/or
sell copies — subject to the above copyright notice.
```

---

<p align="center">
  <sub>Built with ❤️ using <a href="https://nextjs.org/">Next.js</a> · <a href="https://ui.shadcn.com/">shadcn/ui</a> · <a href="https://www.better-auth.com/">Better Auth</a></sub>
</p>
