
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

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure, session-based login & signup powered by [Better Auth](https://better-auth.com) |
| 🛡️ **Role-Based Access** | Separate `admin` & `user` dashboards with middleware-level route protection |
| 📝 **Blog Management** | Create, browse, and manage posts with rich UI cards & metadata |
| 📚 **Post History** | Users can review all their published posts in one place |
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

---

## 📁 Project Structure

```
blog-nest-client/
│
├── 📂 public/                        # Static assets
│
└── 📂 src/
    ├── 📂 app/
    │   ├── 📂 (commonLayout)/        # Public pages (Home, Blogs, About, Login, Signup)
    │   └── 📂 (dashboardLayout)/     # Protected dashboard
    │       ├── 📂 @admin/            # 👑 Admin route slot
    │       └── 📂 @user/             # 👤 User route slot
    │           └── dashboard/
    │               ├── create-blog/  # ✏️  Create new post
    │               └── history/      # 🕒 My post history
    │
    ├── 📂 components/
    │   ├── layout/                   # Navbar · Sidebar · Footer
    │   ├── modules/                  # Feature components (BlogCard, Forms…)
    │   └── ui/                       # Base UI primitives (shadcn)
    │
    ├── 📂 actions/                   # Server Actions
    ├── 📂 services/                  # API communication layer
    ├── 📂 hooks/                     # Custom React hooks
    ├── 📂 lib/                       # Utility & helper functions
    ├── 📂 types/                     # Shared TypeScript types
    ├── proxy.ts                      # Middleware route guard
    └── env.ts                        # Type-safe env config
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js `>= 18.x` and the [Blog Nest Backend](https://github.com/your-username/blog-nest-server) running locally.

### 1️⃣ Clone & Install

```bash
git clone https://github.com/your-username/blog-nest-client.git
cd blog-nest-client
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000/api
AUTH_URL=http://localhost:3000
```

> ⚠️ All variables are validated at startup. A missing or incorrect value will crash the app on purpose — to catch misconfiguration early.

### 3️⃣ Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

##  Auth & Role-Based Routing

Route protection is enforced at the **middleware level** (`src/proxy.ts`) — before any page renders.

```
Request ──▶ Middleware
               ├─ Unauthenticated?              ──▶ /login
               ├─ User  accessing /admin-dash   ──▶ /dashboard
               └─ Admin accessing /dashboard    ──▶ /admin-dashboard
```

| Route | 🌐 Public | 👤 User | 👑 Admin |
|---|:---:|:---:|:---:|
| `/` · `/blogs` · `/about` | ✅ | ✅ | ✅ |
| `/login` · `/signup` | ✅ | ↩️ | ↩️ |
| `/dashboard` | ❌ | ✅ | ↩️ |
| `/admin-dashboard` | ❌ | ↩️ | ✅ |

---

## 📄 License

Licensed under the **MIT License** — free to use, modify, and distribute.

---

<p align="center">
  <sub>Built with ❤️ using <a href="https://nextjs.org/">Next.js</a> · <a href="https://ui.shadcn.com/">shadcn/ui</a> · <a href="https://www.better-auth.com/">Better Auth</a></sub>
</p>
