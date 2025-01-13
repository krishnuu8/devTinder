const express=require("express");
const app=express(); 
const{connectDb}=require("./config/database") 
const {User}=require("./models/user")
//now we need to convert JSON=>js object so that server can read it and we can manupilate it
app.use(express.json())
//get user by email
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId
   const userData = await User.find({emailId:userEmail})
   if(userData.length===0){
    res.status(401).send("Something went wrong!")
   }
   else{
    res.send(userData)
   }
})
// get/feed api to get all the users from the database
app.get("/feed",async (req,res)=>{
   try{
    const users = await User.find({})
   if(!users){
    res.status(401).send("Something went wrong!")
   }else{
    res.send(users)
   }
   }catch(err){
res.status(400).send("Something went Wrong")
}
})
//create a user
app.post("/signup",async (req,res)=>{
    // creating instance(object) of User Model
    const newUser1=new User(req.body)
   try {
    await newUser1.save();
    res.send("User created Successfully!")
   } catch (err) {
    res.status(400).send("Error creating in user,Error:",err)
   }
})
//delete a user
app.delete("/user",async (req,res)=>{
    try{
    const userId=req.body.userId
    await User.findByIdAndDelete(userId)
    res.send("User deleted successfully!")
    }catch(err){
        res.status(400).send("Error in deleting your account,Error:",err)
    }
})

connectDb()
.then(()=>{

    console.log("Database connected successfully!")
    app.listen(7777,()=>{
        console.log("SERVER IS CREATED SUCCESSFULLY!");
    });
})
.catch((err)=>console.log("Database not connected,error:",err))





