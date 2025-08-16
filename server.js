import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

app.use('/',(req,res) => res.send("<h2>API Working Fine !!</h2><h3>Endpoints:</h3><h4>/api/auth</h4<br><h4>/api/tasks</h4>"))
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