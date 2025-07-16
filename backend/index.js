import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;
const FRONTEND_URLS = (process.env.FRONTEND_URLS || "http://localhost:5173,https://todo-eight-zeta-12.vercel.app")
  .split(",")
  .map(url => url.trim());

// Log the allowed origins for debug
console.log("Allowed frontend origins:", FRONTEND_URLS);

// Single CORS middleware
app.use(
  cors({
    origin: FRONTEND_URLS,
    credentials: true,
  })
);

// Other middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Database connection
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
