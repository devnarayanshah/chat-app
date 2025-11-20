import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouts from "./routes/userRoute.js";
import messageRouter from "./routes/messageRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({});
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

// ------------------ FIXED CORS ------------------
app.use(cors({
  origin: [
    "https://nepchat.onrender.com",   // your frontend
    "http://localhost:5173"          // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
// ------------------------------------------------

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouts);
app.use("/api/v1/message", messageRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "404 page not found",
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
