import express from "express"
import dotenv from "dotenv";
import { dbConnection } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import {app, server} from "./src/lib/socket.js";


dotenv.config();
dbConnection
const PORT = process.env.PORT || 5000 ;

app.use(express.json({
    limit:"100mb"
}));
app.use(cors({
    origin:"https://chatty-app-frontend.vercel.app",
    credentials:true
}));
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.send("API Working");
})
app.use('/api/auth',authRoutes)

app.use('/api/messages', messageRoutes)

server.listen(PORT,()=>{
    console.log("Server is running on port" +" "+ PORT);
});
