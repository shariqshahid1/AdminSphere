# Full Stack Admin Dashboard

A robust, responsive admin dashboard built with React (Next.js), Node.js, Express, and MongoDB.

## Features
- **Authentication**: JWT-based login and session management.
- **Role-Based Access**: Different permissions for Admins and Managers.
- **Dashboard**: Stats cards and interactive charts (Recharts).
- **User Management**: Full CRUD operations for managing users.
- **Dark Mode**: Support for light and dark themes with system preference detection.
- **Responsive Design**: Built with Tailwind CSS for all screen sizes.

## Project Structure
```
admin-dashboard/
├── backend/          # Node.js + Express + MongoDB
└── frontend/         # Next.js + Tailwind CSS + Recharts
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/admin_dashboard
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Initial User Creation
To log in for the first time, you can use a tool like Postman or `curl` to register an admin user:

**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "Admin"
}
```

## Technologies Used
- **Frontend**: Next.js, Tailwind CSS, Lucide React, Recharts, Axios, next-themes.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.js.
