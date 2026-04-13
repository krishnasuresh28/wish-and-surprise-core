import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Nuvvu export chesina method

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Database Connection modaliddaam
// Asynchronous ga connection establish chestham
connectDB();

// Middleware
app.use(express.json());

// 2. Health Check Route
app.get('/api', (req: Request, res: Response) => {
    res.send("Wish and Surprise Backend is LIVE and Connected to DB!");
});

// 3. Start Server
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    console.log(` Mode: ${process.env.NODE_ENV || 'development'}`);
});