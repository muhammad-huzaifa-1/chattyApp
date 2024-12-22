import jwt from "jsonwebtoken"

export const generateToken = (userId, res)=>{

    const token = jwt.sign({userId},"mysecretkey",{
        expiresIn:"7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,// in Milli second
        httpOnly: true,
        sameSite: "strict",
        secure: true
    });

    return token;

}