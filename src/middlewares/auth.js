const adminAuth=(req,res,next)=>{
    const token="krish1234"
    const isAdmin = token==="krish1234"
    if(!isAdmin)
        {
            res.status(401).send("Unauthorized Request!")
        }
    else{
        next()
    }
}
const userAuth=(req,res,next)=>{
    const id="1234"
    const isUser = id==="1234"
    if(!isUser){
        res.send("Please Login!")
    }else{
        next()
    }
}
module.exports={adminAuth,userAuth};
