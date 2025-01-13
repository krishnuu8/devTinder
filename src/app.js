const express=require("express");
const app=express(); 
const{connectDb}=require("./config/database") 
const {User}=require("./models/user")
//adding data to the database
app.post("/signup",async (req,res)=>{
    //creating instance(object) of User Model
    const newUser1=new User({
        firstName:"Rohit",
        lastName:"Sharma",
        emailId:"rohit@gmail.com",
        password:"rohit123",
        age:37,
        gender:"male"
    })
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





