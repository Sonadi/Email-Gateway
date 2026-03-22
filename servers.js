const express = require('express');
const cors = require('cors');
const app = express();
const notificationRoute = require('./routes/notificationRoute');

require("dotenv").config();

// ✅ Enable CORS BEFORE route declarations
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Parse JSON bodies

// Mount routes
app.use('/api/notification', notificationRoute);

const PORT = process.env.PORT || 5045;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
