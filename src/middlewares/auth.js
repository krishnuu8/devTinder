const jwt  = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth=async (req,res,next)=>{
   try {
    const {token}=req.cookies; 
    if(!token){
        return res.status(404).send("Please Login!")
    }
const decodeData=await jwt.verify(token,"DEV@TINDER$790")
const {_id}=decodeData
const user=await User.findById(_id)
if(!user){
    throw new Error("User not Found!")
}
req.user=user;
next();
}
catch(err){
    res.status(400).send("Error:"+err.message)
}

}
module.exports={userAuth};
