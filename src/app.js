const express=require("express");
const app=express(); 
const{connectDb}=require("./config/database") 
const {User}=require("./models/user")
//now we need to convert JSON=>js object so that server can read it and we can manupilate it
app.use(express.json())
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

connectDb()
.then(()=>{
    console.log("Database connected successfully!")
    app.listen(7777,()=>{
        console.log("SERVER IS CREATED SUCCESSFULLY!");
    });
})
.catch((err)=>console.log("Database not connected,error:",err))





