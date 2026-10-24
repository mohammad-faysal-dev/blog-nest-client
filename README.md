<div align="center">

# 📝 Blog Nest — Client

### A production-grade blogging platform with role-based dashboards, server-side rendering and a premium user experience.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-7C3AED?style=for-the-badge)](https://www.better-auth.com/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](#license)

<br/>

[Live Demo](#live-demo) •
[Why Blog Nest](#why-blog-nest) •
[Features](#features) •
[Tech Stack](#tech-stack) •
[Architecture](#architecture) •
[Quick Start](#quick-start) •
[Access Control](#access-control) •
[License](#license)

</div>

---

## Overview

**Blog Nest Client** is the user-facing application of the Blog Nest platform. Built on the **Next.js App Router**, it delivers fast page loads through server-side rendering, protects every private page with role-based access control, and gives both readers and administrators a clean, modern interface in light and dark themes.

It connects to the [Blog Nest API](https://github.com/your-username/blog-nest-server), which handles data storage and authentication.

---

## Live Demo

| Resource | Link |
| :-- | :-- |
| Frontend Application | [blog-nest-client.vercel.app](https://blog-nest-client.vercel.app) |
| Backend API | [blog-nest-server-six.vercel.app](https://blog-nest-server-six.vercel.app) |

---

## Why Blog Nest

| What you get | Why it matters |
| :-- | :-- |
| **Fast by default** | React Server Components and streaming keep pages quick to load and light on the browser. |
| **Secure access** | Private pages are guarded at the middleware level, before anything is rendered to the visitor. |
| **Separate experiences** | Admins and regular users each get their own dashboard, built for what they actually need to do. |
| **Reliable forms** | Every form is validated end-to-end, so users get instant feedback and bad data never reaches the server. |
| **Safe configuration** | Environment variables are checked at startup, so misconfiguration is caught before it reaches production. |
| **Polished interface** | Accessible, consistent components with full light and dark theme support. |

---

## Features

- **Authentication** — Secure, session-based login and signup powered by [Better Auth](https://better-auth.com).
- **Role-Based Access** — Separate `admin` and `user` dashboards with middleware-level route protection.
- **Blog Management** — Create, browse and manage posts through clean cards with rich metadata.
- **Post History** — Users can review all of their published posts in one place.
- **Server Components** — Improved performance through React Server Components and streaming.
- **Accessible UI** — Sidebar, cards, badges, tables and forms built with shadcn/ui.
- **Type-Safe Forms** — Built with `@tanstack/react-form` and validated end-to-end with Zod v4.
- **Toast Notifications** — Unobtrusive user feedback through [Sonner](https://sonner.emilkowal.ski).
- **Dark Mode** — First-class light and dark themes using `next-themes`.
- **Validated Environment** — Environment variables verified at startup with `@t3-oss/env-nextjs` and Zod.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
| :-- | :-- | :-- | :-- |
| Framework | [Next.js](https://nextjs.org/) (App Router) | `16.3.1` | Routing, rendering and server actions |
| UI Library | [React](https://react.dev/) | `19.x` | Component-based user interface |
| Language | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Type-safe, maintainable code |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | `v4` | Fast, consistent, responsive styling |
| Components | [shadcn/ui](https://ui.shadcn.com/) · [Base UI](https://base-ui.com/) | latest | Accessible, ready-made UI building blocks |
| Authentication | [Better Auth](https://www.better-auth.com/) | `1.7.x` | Secure sessions and sign-in |
| Forms | [@tanstack/react-form](https://tanstack.com/form) | `1.33.x` | Type-safe form state management |
| Tables | [@tanstack/react-table](https://tanstack.com/table) | `9.x` | Flexible, data-rich tables |
| Validation | [Zod](https://zod.dev/) | `v4` | Schema validation for forms and environment |
| Icons | [Lucide React](https://lucide.dev/) | latest | Clean, consistent icon set |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) | `2.x` | Toast messages |

---

## Architecture

The project is organized so that public pages, protected dashboards, UI components and data access each live in their own place.

```text
blog-nest-client/
├── public/                         # Static assets
└── src/
    ├── app/
    │   ├── (commonLayout)/         # Public pages (Home, Blogs, About, Login, Signup)
    │   └── (dashboardLayout)/      # Protected dashboard
    │       ├── @admin/             # Admin route slot
    │       └── @user/              # User route slot
    │           └── dashboard/
    │               ├── create-blog/    # Create a new post
    │               └── history/        # My post history
    ├── components/
    │   ├── layout/                 # Navbar, Sidebar, Footer
    │   ├── modules/                # Feature components (BlogCard, Forms, ...)
    │   └── ui/                     # Base UI primitives (shadcn)
    ├── actions/                    # Server Actions
    ├── services/                   # API communication layer
    ├── hooks/                      # Custom React hooks
    ├── lib/                        # Utilities and helper functions
    ├── types/                      # Shared TypeScript types
    ├── proxy.ts                    # Middleware route guard
    └── env.ts                      # Type-safe environment configuration
```

---

## Quick Start

**Requirements:** Node.js `18.x` or higher, and the [Blog Nest API](https://github.com/your-username/blog-nest-server) running locally.

### 1. Install

```bash
git clone https://github.com/your-username/blog-nest-client.git
cd blog-nest-client
npm install
```

### 2. Configure

Create a `.env` file in the project root:

```env
BACKEND_URL=http://localhost:5000
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

| Variable | Description |
| :-- | :-- |
| `BACKEND_URL` | Origin of the backend server. |
| `API_URL` | Origin used for API requests (without `/api`). |
| `FRONTEND_URL` | Origin of this frontend application. |
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend origin exposed to the browser. |

> **Note:** All variables are validated at startup. A missing or incorrect value stops the app on purpose, so configuration mistakes are caught early.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

The application is ready for deployment on **Vercel**. Set the following variables in your project settings:

| Variable | Value |
| :-- | :-- |
| `BACKEND_URL` | Backend origin, e.g. `https://blog-nest-server-six.vercel.app` (without `/api`) |
| `API_URL` | Same as `BACKEND_URL` |
| `FRONTEND_URL` | Your deployed frontend origin |
| `NEXT_PUBLIC_FRONTEND_URL` | Your deployed frontend origin |

Authentication is proxied through the frontend's `/api/auth` path, so the session cookie is available to dashboard requests on Vercel.

---

## Access Control

Route protection is enforced at the **middleware level** (`src/proxy.ts`), before any page is rendered.

```text
Request ──▶ Middleware
               ├─ Unauthenticated?               ──▶ /login
               ├─ User accessing /admin-dashboard ──▶ /dashboard
               └─ Admin accessing /dashboard      ──▶ /admin-dashboard
```

| Route | Visitor | User | Admin |
| :-- | :-- | :-- | :-- |
| `/` · `/blogs` · `/about` | Allowed | Allowed | Allowed |
| `/login` · `/signup` | Allowed | Redirected | Redirected |
| `/dashboard` | Redirected to `/login` | Allowed | Redirected to `/admin-dashboard` |
| `/admin-dashboard` | Redirected to `/login` | Redirected to `/dashboard` | Allowed |

---

## Support

Have a question, found an issue or need a new feature? We would be glad to help.

| Channel | Details |
| :-- | :-- |
| Issues | [Open an issue](https://github.com/your-username/blog-nest-client/issues) |
| Email | your-email@example.com |

---

## License

Licensed under the **MIT License**. You are free to use, modify and distribute this project.

---

<div align="center">
  <sub>Built with Next.js, shadcn/ui and Better Auth.</sub>
</div>