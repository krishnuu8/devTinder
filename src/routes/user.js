const express=require("express")
const userRouter=express.Router()
const {userAuth}=require("../middlewares/auth")
const { ConnectionRequest } = require("../models/connectionRequest")
const USER_SAFE_DATA="firstName lastName photoUrl about age gender skills" 
const {User}=require("../models/user")
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
userRouter.get("/feed",userAuth,async (req,res)=>{
        //pagination concept

        let page=parseInt(req.query.page) || 1
        let limit=parseInt(req.query.limit) || 10
    limit=limit>50 ? 50 : limit
    const skip=(page-1)*limit
   try {
    const loggedInUser=req.user
    const userConnections=await ConnectionRequest.find({
        $or:[{fromUserId: loggedInUser._id},{ toUserId: loggedInUser._id}] //jinhone muje send kri hogyi request,aur jinko meine request send kri hogyi!
    }).select("fromUserId toUserId")
    const hideUsersFromFeed=new Set()
    userConnections.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString())
        hideUsersFromFeed.add(req.toUserId.toString())
    })

const users=await User.find({
   $and: [
    {_id:{$nin:Array.from(hideUsersFromFeed)}},
    {_id:{$ne:loggedInUser._id}}]
})
.select(USER_SAFE_DATA)
.skip(skip)
.limit(limit)


    res.status(200).send(users)
}
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})


module.exports={userRouter}