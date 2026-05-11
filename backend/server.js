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

const PORT = 5001; // Force port 5001 for frontend compatibility

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    family: 4, // Force IPv4 (127.0.0.1)
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => {
    console.error(`Database Error: ${err.message}`);
    console.log('Server continuing without database (limited functionality)...');
  });

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on http://127.0.0.1:${PORT}`);
});
