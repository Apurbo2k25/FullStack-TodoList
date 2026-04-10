import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { connectDB } from './config/db.js';
import todoRoutes from "./routes/todo.route.js"

dotenv.config();

const app = express();

//  Added CORS to allow my Netlify frontend to talk to this backend
app.use(cors()); 

app.use(express.json());
app.use("/api/todos", todoRoutes);

// 2. Use process.env.PORT for hosting
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});