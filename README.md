# Full Stack Admin Dashboard (Next.js Unified)

A robust, responsive admin dashboard built with Next.js, Tailwind CSS, and MongoDB. The backend is fully integrated into Next.js API Route Handlers.

## Features
- **Unified Architecture**: Frontend and Backend in a single Next.js project.
- **Authentication**: Supports both **Clerk** and **Custom JWT** (Register/Login).
- **Role-Based Access**: Permissions for Admins and Managers.
- **Dashboard**: Interactive charts (Recharts) and stats.
- **User Management**: Full CRUD operations.
- **Dark Mode**: Support for light/dark themes.

## Project Structure
```
admin-dashboard/
└── frontend/         # Next.js App (Everything)
    ├── app/api/      # Backend API Routes
    ├── components/   # UI Components
    ├── lib/          # Utilities (Auth, DB)
    ├── models/       # Mongoose Models
    └── scripts/      # Database Seed Scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Clerk API Keys (if using Clerk)

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
   MONGODB_URI=mongodb://localhost:27017/admin_dashboard
   JWT_SECRET=your_jwt_secret_here
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   ```
4. Seed the database (optional):
   ```bash
   node scripts/seed.js
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used
- **Frontend/Backend**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB & Mongoose
- **Auth**: Clerk & Custom JWT (Bcrypt.js)
- **Icons/Charts**: Lucide React, Recharts
