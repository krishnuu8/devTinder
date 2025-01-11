const express=require("express");
const app=express(); 

//understanding use of symbols in making flexible routes
app.get("/user/:userID/:name",(req,res)=>{
    console.log(req.query)
    console.log(req.params)
    res.send({
        FirstName:"Krish",
        LastName:"Arora",
        Age:21
    })
})


app.listen(7777,()=>{
    console.log("SERVER IS CREATED SUCCESSFULLY!");
});


