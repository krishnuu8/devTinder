    const validator=require("validator")
    const validateUserData=(req)=>{
            const {emailId,password,firstName,lastName}=req.body
        if(!emailId || !password || !firstName || !lastName ){
            throw new Error("Enter all the required Details!")
        }
        else if(!validator.isEmail(emailId)){
            throw new Error("Please enter a valid email!")
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password!")
        }
    }
module.exports={validateUserData}