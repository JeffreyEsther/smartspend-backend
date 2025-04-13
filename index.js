import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";





dotenv.config();

// create an express app
const app = express();

// parses incoming JSON
app.use(express.json());

// make a database connection
await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("databse connected")
}).catch((error) => {
    console.log(error)
});



// Use middlewares

// Use routes
app.use('/api/v1', authRouter)

// Listen for incoming requests
const port = 5000;

app.listen(port, () => {
    console.log(`Server is listinening on port ${port}`)
})
