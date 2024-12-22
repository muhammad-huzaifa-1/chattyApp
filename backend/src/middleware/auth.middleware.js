import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const Protect_Routes = async(req,res,next)=>{

    try {
        
        const token = req.cookies.jwt;
        if(!token) return res.status(401).send({msg:"Unautorized - No Token Provided"});

        const decode = jwt.verify(token, "mysecretkey");
        if(!decode) return res.status(401).send({msg:"Unautorized - Invalid token"});

        const user = await User.findById(decode.userId).select("-password");

        if(!user) return res.status(404).send({msg:"User not found"});

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in ProtectRoute Controller", error.message);
        res.status(500).json({msg:"Internal Error"})
    }

}