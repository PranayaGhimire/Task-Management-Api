import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

app.use(cors({
    origin:'https://task-management-frontend-pranaya.vercel.app',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import mainRoute from "./routes/mainRoute.js"
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

app.use('/',mainRoute)
app.use('/api/auth', authRoutes);
app.use('/api/tasks',taskRoutes);

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} `);
        })
    })
    .catch(err => console.log(err));