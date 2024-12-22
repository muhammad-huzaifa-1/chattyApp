import express from "express"
import dotenv from "dotenv";
import { dbConnection } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import {app, server} from "./lib/socket.js";


dotenv.config();
dbConnection
const PORT = process.env.PORT || 5000 ;

app.use(express.json({
    limit:"100mb"
}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieparser());

app.use('/api/auth',authRoutes)

app.use('/api/messages', messageRoutes)

server.listen(PORT,()=>{
    console.log("Server is running on port" +" "+ PORT);
});