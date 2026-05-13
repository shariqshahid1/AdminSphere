const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load env vars
dotenv.config();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS for everything
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);

// Root route for backend health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Database connection logic for serverless
let cachedConn = null;

const connectDB = async () => {
  if (cachedConn) return cachedConn;
  
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI is not defined in environment variables');
      return null;
    }
    
    cachedConn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4, // Force IPv4
    });
    console.log('MongoDB Connected...');
    return cachedConn;
  } catch (err) {
    console.error(`Database Error: ${err.message}`);
    console.warn('Backend starting without database connection. Some features may not work.');
    cachedConn = null;
    return null; // Return null instead of throwing to prevent app crash
  }
};

// For Vercel, we need to ensure DB is connected for every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    // Only fail if we absolutely need the DB for this route
    next();
  }
});

const PORT = process.env.PORT || 5001;

// Only listen if not in a serverless environment (like Vercel)
if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });
  });
}

// Export the app for Vercel
module.exports = app;
