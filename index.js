import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import reviewRoute from "./routes/reviewroute.js";
import orderRoute from "./routes/orderroute.js";
import messageRoutes from "./routes/messsageroute.js";
import gigRoutes from "./routes/gigroute.js";
import conversationRoutes from "./routes/conversationroute.js";
import authRoute from "./routes/authroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express()

dotenv.config();

const uri = process.env.MONGO;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/user",userRoutes);
app.use("/api/gigs",gigRoutes);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/reviews",reviewRoute);

app.use((err,req,res,next)=>{
   const errorStatus=err.status || 500;
   const errorMessage=err.message || "Something wrong!";

   return res.status(errorStatus).send(errorMessage);
})

app.listen(3000,()=>{
    console.log("Backend server is running!!!");
})

