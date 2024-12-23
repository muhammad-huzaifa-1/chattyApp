import express from "express";
import { Protect_Routes } from "../middleware/auth.middleware.js";
import { getUserForSidebar, getMessages, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

 router.get('/user', getUserForSidebar);

 router.get('/:userChatId/:senderChatId', getMessages);

 router.post('/send/:reciverId/:senderId', sendMessages);

export default router
