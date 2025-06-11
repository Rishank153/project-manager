const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const seedAdmin = require('./seed');
seedAdmin();
// Initialize express
const app = express();


// Middleware
app.use(cors({
  origin: 'https://project-manager-client-0dli.onrender.com', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add other methods if needed (e.g., 'PATCH')
  allowedHeaders: ['Content-Type', 'Authorization'] // Optional
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
