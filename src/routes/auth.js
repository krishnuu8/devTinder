const express=require("express")
const authRouter=express.Router();
const {validateUserData}=require("../utils/validation")
console.log(authRouter)
const bcrpyt=require("bcrypt")
const {User}=require("../models/user")
const jwt = require("jsonwebtoken")
authRouter.post("/signup",async (req,res)=>{
    try {
      //validating user data
      validateUserData(req)
 
      //encrypting passwords
      
 
         const {emailId,password,firstName,lastName,gender,photoUrl} =req.body
     const hashPassword=await bcrpyt.hash(password,10)
      // creating instance(object) of User Model
      const newUser1=new User({
         firstName,lastName,emailId,password:hashPassword,gender,photoUrl
      })
     await newUser1.save();
     res.send("User created Successfully!")
    } catch (err) {
     
     res.status(400).send("ERROR: "+err)
 }
 })
authRouter.post("/login",async (req,res)=>{
    try{
           const {password,emailId}=req.body
    const user=await User.findOne({emailId:emailId}) //finds the user in database whose emailId matches with the emailId coming from req.body
    if(!user){
        throw new Error("Invalid Credentials!")
    }
    else{
     const isPasswordValid=await user.validatePassword(password);

            if(isPasswordValid){
                //generate JWT Token
                    const token=jwt.sign({_id:user._id},"DEV@TINDER$790",{expiresIn:"1d"})
                // Sending this token back to User
                res.cookie("token",token,{
                    expires:new Date(Date.now() + 8*3600000)
                })
                res.send(user)
            }
            else{
               throw new Error("Invalid Credentials!")
            }
        }
}catch(err){
    res.status(400).send("ERROR:"+err.message)
}
})
authRouter.post("/logout",(req,res)=>{
res.cookie("token",null,{
    expires:new Date(Date.now())
})
res.send("Logout Successfull!!")
})
module.exports={authRouter}