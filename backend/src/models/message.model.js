import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ChatUser",
        required: true
    },

    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ChatUser",
        required: true
    },

    text:{
        type: String,
    },

    image:{
        type: String
    },
},{timestamps: true});

const Messages = mongoose.model('Messages',messageSchema);

export default Messages;