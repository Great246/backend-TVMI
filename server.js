import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import helmet from 'helmet'
// import mongoSanitize from 'express-mongo-sanitize'
import prayerRouter from "./routes/prayerroutes.js";
import Userroutes from "./routes/userroutes.js";
import eventroutes from "./routes/eventsroutes.js";
import path from 'path'
import galleryRouter from "./routes/galleryroutes.js";
import contactRouter from "./routes/contactroutes.js";
import visitorrouter from "./routes/visitorsroutes.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
// app.use(mongoSanitize())
// app.use(helmet()) 

app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/pray", prayerRouter);
app.use("/api/user", Userroutes);
app.use("/api/events", eventroutes)
app.use("/api/gallery", galleryRouter)
app.use("/api/contact", contactRouter)
app.use("/api/visit", visitorrouter)

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("App is working");
});

connectDB(); 
app.listen(PORT, () => {
  console.log("Server is working");
});
