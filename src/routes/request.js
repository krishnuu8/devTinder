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
const allowedStatus=["interested","ignored"]
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
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
try {
    const {status,requestId}=req.params
   const allowedStatus=["accepted","rejected"]
   const loggedInUser=req.user
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Status not allowed!")
    }
const connectionRequest=await ConnectionRequest.findOne({
    _id:requestId,
    toUserId:loggedInUser._id,
    status:"interested" //checked for the validations :whether the request has been sent or not by chekcing the _id and stuatus type intersted only;also verified that the person to whom the request is sent is only able to accept or reject the
})
if(!connectionRequest){
    return res.status(400).send("No connection request found!")
}
connectionRequest.status=status
const data=await connectionRequest.save()
res.json({message:`Connection Request ${connectionRequest.status}`,data})
} catch (err) {
    res.status(400).send("ERROR: "+err.message)
}




})
 module.exports={requestRouter}