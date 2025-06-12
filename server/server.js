const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const seedAdmin = require('./seed');
seedAdmin();

const app = express();

// ✅ CORS Setup
app.use(cors());



app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('hello rishank');
});

// ✅ API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
