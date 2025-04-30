const express=require("express");
const authRouter=express.Router();
const User=require("../models/user.js");
const {validateSignUpData}=require("../utils/validations.js");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");





authRouter.post("/signup", async(req,res)=>{
    try{ 
    // validation the data  before the user enter into db
    validateSignUpData(req);

    // Encrypt the password

    const {firstName,lastName,email,password,}=req.body;

    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);


    // Here we create the instance of the model it means we can create a new user to add it to database
    const user= new User({
        firstName,
        lastName,
        email,
        password:passwordHash
    });

  
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
   
}
);



authRouter.post("/login",async(req,res)=>{
// user is there are not check
try{
    const{email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        throw new Error("invalid email id")
    }
    const passwordValid=await bcrypt.compare(password,user.password);
    if(passwordValid){

        // Token logic 
        const token=await jwt.sign({_id:user._id},"NamasteDev@90");
        // console.log(token);

        // add the token to cookie and send responce back to user
        res.cookie("token",token);

        res.send("Login successfull");
    }
    else{
        throw new Error("password is not valid")
    }
}catch(err){
    res.status(400).send(err.message);
}
})

module.exports=authRouter;
