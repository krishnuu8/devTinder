const express=require("express")
const requestRouter=express.Router()
const {userAuth} = require("../middlewares/auth")
const {ConnectionRequest}=require("../models/connectionRequest")
const { User } = require("../models/user")
requestRouter.post("/request/sent/:status/:toUserId",userAuth,async (req,res)=>{
try{
const toUserId=req.params.toUserId
const fromUserId=req.user._id
const status=req.params.status
const allowedStatus=["intersted","ignored"]
if(!allowedStatus.includes(status)){
return res.json({message:"Invalid status type:"+status})
}
const isUser=await User.findById(toUserId)
if(!isUser){
    throw new Error("Invalid request!")
}
const existingConnectionRequest=await ConnectionRequest.findOne({
    $or:[
        {fromUserId,toUserId}, //to check whether the person trying to send the request ahs already sent the request or not
        {
            toUserId:fromUserId,
            fromUserId:toUserId
        }
    ]
})
if(existingConnectionRequest){
    return res
    .status(400)
    .send({
       message:"Connection Request already exists!"
    })
}


const connectionRequest=new ConnectionRequest({
    toUserId,fromUserId,status
})



const data=await connectionRequest.save()


res.json({
    message:`${req.user.firstName} is ${status} in ${isUser.firstName}`,
    data
})
}catch(err){
    res.status(400).send("ERROR: "+err.message)
}
 })
 module.exports={requestRouter}