const express=require("express");
const app=express(); 
//writing auth code
const {userAuth,adminAuth}=require("./middlewares/auth")
app.use("/admin",adminAuth);
app.post("/user/login",(req,res)=>{
    res.send("Welcome to the page!")
})
app.get("/user/useApp",userAuth,(req,res)=>{
    res.send("PLease fill the form to continue")
})
app.get("/admin/getData",(req,res)=>{
  res.send({name:"Krish",age:"21",semester:"6"})
   })

app.get("/admin/deleteUser",(req,res)=>{
        res.send("User Deleted")
})






app.listen(7777,()=>{
    console.log("SERVER IS CREATED SUCCESSFULLY!");
});


