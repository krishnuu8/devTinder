const mongoose=require("mongoose")
const validator=require("validator")
const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minlength:4,
        maxlength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address!")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter strong password!")
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid!")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.istockphoto.com/vector/user-profile-icon-in-flat-style-member-avatar-vector-illustration-on-isolated-gm1460685694-494809101",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL!")
            }
        }
    },
    about:{
        type:String,
        default:"This is a default description!"
    },
    skills:{
    type:[String]
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema)
module.exports={User}



