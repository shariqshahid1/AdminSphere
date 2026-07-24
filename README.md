# Admin Dashboard

**Live Demo:** [https://adminsph.vercel.app](https://adminsph.vercel.app)

A modern, fully responsive admin dashboard built with Next.js, Tailwind CSS, and custom JWT authentication.

## Features
- Sign in / Sign up with email and password (JWT auth)
- Role-based access control (Admin, Manager, Editor)
- User CRUD operations
- Dark mode support
- Charts for dashboard analytics
- Fully responsive design (mobile, tablet, desktop)
- Settings page with notifications, security, and display options

## Project Structure
```
admin-dashboard/
├── app/              # pages + API routes
├── components/       # reusable UI components (Navbar, Sidebar, ThemeToggle)
├── lib/              # utilities, auth logic, mock database
├── .env.local        # environment variables
└── package.json      # dependencies & scripts
```

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Create `.env.local`:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

3. Run it
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Demo Credentials
- **Email:** ahmed@admin.io
- **Password:** password123

## Tech Stack
- Next.js 16
- Tailwind CSS 4
- JWT auth (jose + bcryptjs)
- Recharts for charts
- Lucide for icons
