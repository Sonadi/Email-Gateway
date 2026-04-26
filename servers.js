const express = require('express');
const cors = require('cors');
const app = express();
const notificationRoute = require('./routes/notificationRoute');

require("dotenv").config();


const allowedOrigins = [
  "http://localhost:5173",
  "https://glowing-sunshine-d907db.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
