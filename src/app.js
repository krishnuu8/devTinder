const express=require("express");
const app=express(); //creates a express app instance;uses functional approach
app.use("/hello",(req,res)=>{
    res.send("HELLO HELLO HELLO!!!")
})
app.use("/test",(req,res)=>{
    res.send("MIKE TESTING,MIKE TESTING!")
})
app.use("",(req,res)=>{
    res.send("BHAISAAB!!!!")
})//request handler
app.listen(7777,()=>{
    console.log("SERVER IS CREATED SUCCESSFULLY!");
});

//installing nodemon so that my server is automatically refreshed
//installing it as global one on the system!

