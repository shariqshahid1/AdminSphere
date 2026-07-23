# Admin Dashboard

**Live Demo:** [https://adminsph.vercel.app](https://adminsph.vercel.app)

A modern admin dashboard built with Next.js, Tailwind CSS, and custom JWT authentication.

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
└── frontend/
    ├── app/          # pages + api routes
    ├── components/   # reusable components
    ├── lib/          # utils, auth, mock db
    └── .env.local    # environment variables
```

## Setup

1. Go to frontend folder
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env.local` in frontend folder:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. Run it
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
