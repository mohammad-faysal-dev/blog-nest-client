<div align="center">

# 📝 Blog Nest Client

**A modern, full-featured blog platform built with Next.js 16, featuring role-based access control, server-side rendering, and a clean dashboard experience.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## ✨ Features

- 🔐 **Authentication & Authorization** — Secure login/signup powered by [Better Auth](https://better-auth.com/)
- 🛡️ **Role-Based Access Control** — Separate dashboards for `admin` and regular `user` roles with middleware-level route protection
- 📝 **Blog Management** — Create, read, and manage blog posts with a clean, intuitive UI
- 📚 **Blog History** — Users can view their own published blog post history
- 🧭 **Parallel Routes** — Next.js App Router parallel routes (`@admin` / `@user`) for role-specific dashboard views
- 🚀 **Server Components** — Heavy use of React Server Components for optimal performance
- 🎨 **shadcn/ui** — Pre-built, accessible UI components with a sidebar, tables, forms, and more
- 📋 **Form Handling** — Type-safe forms with `@tanstack/react-form` and `zod` validation
- 🔔 **Toast Notifications** — Elegant feedback with `sonner`
- 🌙 **Theme Support** — Light/Dark mode via `next-themes`
- 📦 **Type-safe Environment Variables** — Validated env config using `@t3-oss/env-nextjs`

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/), [Base UI](https://base-ui.com/) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) |
| **Forms** | [@tanstack/react-form](https://tanstack.com/form) |
| **Tables** | [@tanstack/react-table](https://tanstack.com/table) |
| **Validation** | [Zod v4](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Env Validation** | [@t3-oss/env-nextjs](https://env.t3.gg/) |

---

## 📁 Project Structure

```
blog-nest-client/
├── src/
│   ├── app/
│   │   ├── (commonLayout)/         # Public-facing pages
│   │   │   ├── page.tsx            # Home / Blog listing page
│   │   │   ├── blogs/              # Blog detail pages
│   │   │   ├── about/              # About page
│   │   │   ├── login/              # Login page
│   │   │   └── signup/             # Signup page
│   │   │
│   │   └── (dashboardLayout)/      # Protected dashboard pages
│   │       ├── layout.tsx          # Dashboard layout with sidebar
│   │       ├── @admin/             # Admin parallel route
│   │       │   └── admin-dashboard/ # Admin dashboard
│   │       └── @user/              # User parallel route
│   │           └── dashboard/      # User dashboard
│   │               ├── create-blog/ # Create new blog post
│   │               └── history/    # Blog post history
│   │
│   ├── components/
│   │   ├── layout/                 # Layout components (Sidebar, Navbar)
│   │   ├── modules/                # Feature-specific components
│   │   │   ├── BlogCard.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   └── user/
│   │   └── ui/                     # Reusable shadcn/ui components
│   │
│   ├── actions/                    # Next.js Server Actions
│   ├── services/                   # API service layer
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions
│   ├── types/                      # Global TypeScript types
│   ├── routes/                     # Route constants
│   ├── constants/                  # App-wide constants (e.g., Roles)
│   ├── providers/                  # React Context providers
│   ├── proxy.ts                    # Middleware proxy & route guard logic
│   └── env.ts                      # Type-safe environment variable config
│
├── public/                         # Static assets
├── components.json                 # shadcn/ui configuration
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A running instance of the **Blog Nest Backend** (NestJS API)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-nest-client.git
cd blog-nest-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# The base URL of your NestJS backend server
BACKEND_URL=http://localhost:5000

# The public URL of this frontend application
FRONTEND_URL=http://localhost:3000

# The base API URL (usually same as BACKEND_URL with /api prefix)
API_URL=http://localhost:5000/api

# The authentication endpoint URL
AUTH_URL=http://localhost:3000
```

> **Note:** All environment variables are validated at startup using `@t3-oss/env-nextjs` with Zod. The app will throw an error if any are missing or invalid.

---

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🔐 Authentication & Role-Based Routing

This application uses **Better Auth** for session management. Route protection is handled at the **middleware level** via `src/proxy.ts`:

| Route | Access |
|---|---|
| `/` , `/blogs`, `/about` | **Public** — accessible by anyone |
| `/login`, `/signup` | **Public** — redirects to dashboard if already logged in |
| `/dashboard` | **Protected** — accessible by authenticated `user` role |
| `/admin-dashboard` | **Protected** — accessible by authenticated `admin` role only |

- If an unauthenticated user tries to access a protected route, they are redirected to `/login`.
- If a `user` tries to access `/admin-dashboard`, they are redirected to `/dashboard`.
- If an `admin` tries to access `/dashboard`, they are redirected to `/admin-dashboard`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add some feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please make sure your code follows the existing style and passes linting before submitting.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ using [Next.js](https://nextjs.org/) & [shadcn/ui](https://ui.shadcn.com/)

</div>
