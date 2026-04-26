const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const notificationRoute = require("./routes/notificationRoute");

// ✅ CORS (frontend + localhost)
const allowedOrigins = [
  "http://localhost:5173",
  "https://glowing-sunshine-d907db.netlify.app"
]; 

app.use(cors({
  origin: function (origin, callback) {
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

app.use(express.json());

// ✅ Health check (VERY IMPORTANT for Railway)
app.get("/", (req, res) => {
  res.send("Notification Service Running ✅");
});

// ✅ Routes
app.use("/api/notification", notificationRoute);

// ✅ IMPORTANT: Railway port binding
const PORT = process.env.PORT || 5045;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});