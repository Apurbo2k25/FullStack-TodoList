import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import todoRoutes from "./routes/todo.route.js"

dotenv.config();


const app = express();


app.use(express.json());

app.use("/api/todos",todoRoutes);

app.listen(8081, ()=>{
    connectDB();
    console.log("Server started at http://localhost:8081");
});;