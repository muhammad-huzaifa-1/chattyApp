import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{type:String, required:true},
        fullName:{type:String, required:true},
        password:{type:String, required:true, minlength: 6},
        profilePic:{type:String, default:""}
    },
    {timestamps:true}
);

const User = mongoose.model("ChatUser",userSchema);

export default User;