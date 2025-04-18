import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import incomeRouter from "./routes/incomeRoutes.js";
import userRouter from "./routes/userRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";





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
// route for auth(register/login)
app.use('/api/auth', authRouter)

// route for users
app.use('/api/user', userRouter)

// route for incomes
app.use('/api', incomeRouter)

// route for wishlist
app.use('/api', wishlistRouter);

// Listen for incoming requests
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listinening on port ${port}`)
})
