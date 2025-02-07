const express=require("express");
const app=express(); 
const mongoose=require("mongoose")
const{connectDb}=require("./config/database") 
const {User}=require("./models/user")
const {validateUserData}=require("./utils/validation")
const bcrpyt=require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} =require("./middlewares/auth")
const {authRouter}=require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const {userRouter}=require("./routes/user")
const cors=require("cors")
//now we need to convert JSON=>js object so that server can read it and we can manupilate it
app.use(
    cors({
    origin:"http://localhost:5173",  //whitelisting the domain name!
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

//express will come here goto authRouter match the corresponding url
app.use("/",authRouter) 
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)


connectDb()
.then(()=>{

    console.log("Database connected successfully!")
    app.listen(7777,()=>{
        console.log("SERVER IS CREATED SUCCESSFULLY!");
    });
})
.catch((err)=>console.log("Database not connected,error:",err))


const arr=["name","class","studentId","section"]
const obj={
    "name":"krish",
    "class":"6 sem"
}


