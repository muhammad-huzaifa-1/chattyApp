import User from "../models/user.model.js";
import Messages from "../models/message.model.js";
import cloudinary from "cloudinary";
import { getReceiverSocketId } from "../lib/socket.js";
import {io} from "../lib/socket.js"


export const getUserForSidebar = async(req,res)=>{
    try {
        const LoggedInUser = req.user._id;

        const filterUser = await User.find({_id: {$ne: LoggedInUser}}).select("-password");
        res.status(200).json(filterUser)
    } catch (error) {
        console.log("Error in getUserForSidebar", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getMessages = async (req,res)=>{
    try {
        const userChatId = req.params.userChatId;

        const myId = req.params.senderChatId;

        const messages = await Messages.find({
            $or:[
                {senderId:myId, reciverId:userChatId},
                {senderId:userChatId, reciverId:myId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages Controller : ", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const sendMessages = async (req,res)=>{
    try {

        const {text, image} = req.body;
        const reciverId = req.params.reciverId;
        const senderId = req.params.senderId;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        let newMessage = await Messages.create({
            senderId,
            reciverId,
            text:text,
            image: imageUrl,
        })

        newMessage = await newMessage.save();

        // Realtime functionality with -> Socket.io
        const receiverSocketId = getReceiverSocketId(reciverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(501).json({error:"internal Server error"});
    }
}