const express=require("express")
const bcrypt=require("bcrypt")
const profileRouter=express.Router()
const {userAuth} =require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")
const validator=require("validator")
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
 const user=req.user
    res.send(user)
}
    catch(err){
        res.status(400).send("ERROR:"+err.message)
    }
})
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
   
   try{
    if (!validateEditProfileData(req)|| Object.keys(req.body).length===0){
        throw new Error("Invalid Edit Request!")
    }
const loggedInUser=req.user 
console.log(loggedInUser)
// loggedInUser.firstName=req.body.firstName
Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
console.log(loggedInUser)
await loggedInUser.save()
res.json({
    message:`${loggedInUser.firstName},Your profile has been updated!`,
    data:loggedInUser    
})
}
catch(err){
        res.status(400).send("ERROR: "+err.message)
    }

})
profileRouter.patch("/profile/edit/password",userAuth,async(req,res)=>{
    try{
    const loggedInUser=req.user
    const{password}=req.body
if(!validator.isStrongPassword(password)){
    throw new Error("Please enter a Strong password!")
}
    const hashPassword=await bcrypt.hash(password,10)
    loggedInUser.password=hashPassword
    await loggedInUser.save()
    res.send("Password updated successfully!")
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports={profileRouter}




