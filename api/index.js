import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
    
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection errors:", err);
});

// API Route
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes)

// middleware
app.use((err, req, res, next) => {
    console.error("Error Details:", err); // Log full error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: err.stack, // Include full error stack
    });
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on ports ${PORT}`);
});
