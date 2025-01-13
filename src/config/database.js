const mongoose=require("mongoose");
const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://krishnuarora:bUp1yO1Ke4J8P0FB@nodejs.66hpv.mongodb.net/devTinder");
}
module.exports={connectDb}








