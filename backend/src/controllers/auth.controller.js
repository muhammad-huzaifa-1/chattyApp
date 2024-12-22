import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import bcrpyt from "bcryptjs";


export const signup = async (req,res)=>{
    const {fullName, email, password} = req.body;
    try {
        let FindUser = await User.findOne({email:email})
        if (req.body.fullName && req.body.email && req.body.password){
            
            // We are gnerating a salt and hashing for password
            const salt = await bcrpyt.genSalt(10);
            const hashedPassword = await bcrpyt.hash(password, salt);

            // here are we creating user with some autntication logic
            if(!FindUser && password.length >= 6){

                let user = await User.create({fullName:fullName,email:email,password:hashedPassword});
                generateToken(user._id, res)
                await user.save();
                return res.status(201).send(user);

            }else if(password.length<6){

                return res.status(400).send({error:"Password lenght must be greater than 6 words!"});

            }else if(FindUser){

                return res.status(400).send({error:"Email already Exist!"});

            }
            
            
        } else {
            res.status(400).send({error:"Please fill all the fields!"})
        }
    

        
    } catch (error) {
        console.log(error)
    }
};

export const login = async(req,res)=>{
    const {email,password} = req.body;
    const CheckUser = await User.findOne({email:email});
    try {
        if (req.body.email && req.body.password) {
            if(!CheckUser){return res.status(401).send({error:"Invalid Credintals"})}

            const isPasswordCorrect = await bcrpyt.compare(password, CheckUser.password);
            if(!isPasswordCorrect){return res.status(401).send({error:"Invalid Credintals"})};
    
            if(CheckUser && isPasswordCorrect){
                generateToken(CheckUser._id, res);
                return res.send({
                    _id:CheckUser._id,
                    fullName:CheckUser.fullName,
                    email:CheckUser.email,
                })
            }
        } else {
            res.status(401).send({error:"Please fill all the fields"})
        }
    } catch (error) {
        res.status(501).json("Error in Login Controller", error.message)
    }
};

export const logout = (req,res)=>{
   try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({msg:"Logout Successfully"});
   } catch (error) {
    console.log("Error in logout Controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
   }
};

export const UpdateProfile = async(req, res)=>{
    try {

        const {profilePic} = req.body;

        if(!profilePic) return res.status(400).json({error:"Profile pic required!"});

        let uploadResponse = await cloudinary.uploader.upload(profilePic);

        const userUpdate = await User.findByIdAndUpdate(req.params._id,{profilePic:uploadResponse.secure_url}, {new:true});
        res.status(200).json(userUpdate)

    } catch (error) {
        res.status(500).send({error:"Image size is too large!"});
        console.log(error)
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).send(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(501).json({msg:"Server Error"});
    }
}