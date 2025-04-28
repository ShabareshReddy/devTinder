const validator=require("validator");

const validateSignUpData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("invalid name")
    }
    else if(!validator.isEmail(email)){
        throw new Error("invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("invalid password")
    }
}
module.exports={validateSignUpData};