const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    firstName:{
        type:"String",
        required:true,
        
    },
    lastName:{
        type:"String"
    },
    email:{
        type:"String",
        required:true,
        unique:true,
        lowercase:true,
        minLength:4,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("it is not valid email")
            }
        }
    },
    password:{
        type:"String",
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("it is not strong")
            }
        }
    },
    gender:{
        type:"String",
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    age:{
        type:"Number",
        min:18,
    },
    about:{
        type:"String",
        default:"this is default info about user",
    },
    skills:{
        type:[String],
    },
})

module.exports=mongoose.model("User",userSchema);