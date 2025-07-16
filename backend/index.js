import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 4001
const DB_URI = process.env.MONGODB_URI;


const FRONTEND_URL = process.env.FRONTEND_URL || "https://todo-eight-zeta-12.vercel.app/";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://todo-eight-zeta-12.vercel.app/"],
    credentials: true,
  })
);

// Database connection code
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

console.log("FRONTEND_URL from .env:", process.env.FRONTEND_URL);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});


app.get("/",(req,res)=>{
  res.send("Api Working")
})
