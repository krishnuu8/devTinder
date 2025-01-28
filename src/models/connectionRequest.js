const mongoose=require("mongoose")
const connectionRequestSchema= new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["interested","ignored","rejected","accepted"],
                message:`{VALUE} is not a valid status type!`
            }
        }
},{
    timestamps:true
})
connectionRequestSchema.index({fromUserId:1,toUserId:1});
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //CHECKING THAT THE REQUEST IS NOT BEING SENT TO YOURSELF
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("CANNOT SEND CONNECTION REQUEST TO YOURSELF!")
    } 

//do call next as it is a middleware as the code will not move furthur
next()
})
//understand why this code does not work when placed after ConnectionRequest
const ConnectionRequest=new mongoose.model("connectionRequest",connectionRequestSchema);

module.exports={ConnectionRequest}