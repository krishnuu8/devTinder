const express=require("express");
const app=express(); 
const mongoose=require("mongoose")
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
    
    res.status(400).send("Error creating in user,Error:"+err)
}
})
//delete a user
app.delete("/user",async (req,res)=>{
    try{
    const userId=req.body.userId
    await User.findByIdAndDelete(userId)
    res.send("User deleted successfully!")
    }catch(err){
        res.status(400).send("Error in deleting your account,Error:"+err)
    }
})
//update user
app.patch("/user/:userId",async (req,res)=>{

    try {
        // const userId=req.body.userId
        const userId=req.params?.userId//?. makes sure that your code does not break
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     throw new Error("Invalid userId format");
        // }
        // const objectId = new mongoose.Types.ObjectId(userId);
        const data=req.body //if i include userId in my body ,so then i will need ti include it in update allowed array which i dont want to
        const UPDATES_ALLOWED=["password","gender","photoURrl","about","skills"] //we dont want to allow update in userId
        const isAllowed=Object.keys(data).every((k)=>UPDATES_ALLOWED.includes(k)) //matching two arrays:UPDATES_ALLOWED AND KEYS ARRAY 
        if(!isAllowed){
        throw new Error("Update not allowed!")
        }
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10")
        }
        const user=await User.findByIdAndUpdate(userId,data) 
        console.log(userId)
        console.log(user)       //default is before
        res.send("Data updated Sucessfully")
    } catch (err) {
        res.status(400).send("UPDATE Failed:"+err)
    }

})
//get by user by email
app.patch("/userbyemail",async (req,res)=>{
    try {
        const email=req.body.emailId
        const data=req.body
        const user=await User.findOneAndUpdate({emailId:email},data) 
        console.log(user)       //default is before
        res.send("Data updated Sucessfully")
    } catch (err) {
        res.status(400).send("Error in updating your details,Error:"+err)
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

let obj={a:1,b:2,c:3}
console.log(Object.keys(obj))



