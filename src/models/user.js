const mongoose=require("mongoose");
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
    },
    password:{
        type:"String",
        required:true,
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