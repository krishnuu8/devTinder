const express=require("express");
const app=express(); //creates a express app instance;uses functional approach

app.get("/user",(req,res)=>{
    res.send({
        FirstName:"Krish",
        LastName:"Arora",
        Age:21
    })
})
app.post("/user",(req,res)=>{
    //saving data to DB
    res.send("USER SAVED SUCCESSFULLY TO THE DB!")
})
app.delete("/user",(req,res)=>{
    //deleting user from DB
    res.send("USER DELETED SUCCESSFULLY FROM THE DB!")
})
app.use("/hello/1",(req,res)=>{
    res.send("Hello from one!") 
    
})//request handler
app.use("/hello",(req,res)=>{
    res.send("HELLO HELLO HELLO!!!")
})
app.use("/test/1",(req,res)=>{
    res.send("Testing from one!") 
    
})
app.use("/test",(req,res)=>{
    res.send("MIKE TESTING,MIKE TESTING!")
})
app.use("/",(req,res)=>{
    res.send("BHAISAAB!!!!") 
    
})
app.listen(7777,()=>{
    console.log("SERVER IS CREATED SUCCESSFULLY!");
});

//jo pehle match krgya usko execute krdo!
