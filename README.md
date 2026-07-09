# Full Stack Admin Dashboard (Next.js Unified)

**Live Demo:** [https://adminsph.vercel.app](https://adminsph.vercel.app)

A robust, responsive admin dashboard built with Next.js 15+, Tailwind CSS 4, and Clerk Authentication. The backend is fully integrated into Next.js API Route Handlers.

## Features
- **Unified Architecture**: Frontend and Backend in a single Next.js project.
- **Authentication**: Managed exclusively by **Clerk** (Social & Email login).
- **Proxy Protection**: All routes are protected via Clerk Proxy (Middleware).
- **Dashboard**: Interactive charts (Recharts) and real-time stats.
- **User Management**: Full CRUD operations for managing team members.
- **Dark Mode**: Support for light/dark themes using `next-themes`.

## Project Structure
```
admin-dashboard/
└── frontend/         # Next.js App
    ├── app/          # Next.js App Router (Pages & API)
    │   └── api/      # Backend API Routes
    ├── components/   # UI Components (Sidebar, Navbar, etc.)
    ├── lib/          # Utilities & Mock Database
    └── public/       # Static Assets
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Clerk API Keys (Publishable Key & Secret Key)

### Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used
- **Frontend/Backend**: Next.js 15/16
- **Styling**: Tailwind CSS 4
- **Auth**: Clerk
- **Icons/Charts**: Lucide React, Recharts
