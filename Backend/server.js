require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const yogaRouter = require("./routes/yoga.routes");
const cron = require("node-cron");

const app = express();

// ✅ Connect to Database before starting the server
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ CORS Configuration for Production
const allowedOrigins = [
  "https://yoga12.netlify.app", // ✅ Production Frontend
  "http://localhost:5173", // ✅ Local Dev Frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication headers
  })
);

// ✅ API Routes
app.use("/users", userRoutes);
app.use("/yoga", yogaRouter);

// ✅ Graceful Shutdown Handling
process.on("SIGINT", async () => {
  console.log("\nShutting down server...");
  process.exit(0);
});

const PORT = process.env.PORT || 3000;

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
