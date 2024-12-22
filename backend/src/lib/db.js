import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = mongoose.connect(process.env.BACKEND_MONGOOSE_CONNECTION);

