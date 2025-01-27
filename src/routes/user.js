const express=require("express")
const userRouter=express.Router()
const {userAuth}=require("../middlewares/auth")
const { ConnectionRequest } = require("../models/connectionRequest")
const USER_SAFE_DATA="firstName lastName photoUrl about age gender skills" 
userRouter.get("/user/requests/recieved",userAuth,async(req,res)=>{
try {
    const loggedInUser=req.user
if(!loggedInUser){
    throw new Error("Please login to continue!")
}
const requests=await ConnectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested"
}).populate("fromUserId",USER_SAFE_DATA)
res.json({message:"Data fetched Successfully!",
    data:requests
})
} catch (err) {
    res.status(400).send("ERROR: "+err.message)
}


})
module.exports={userRouter}