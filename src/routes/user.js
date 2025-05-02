const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests",userAuth,async(req,res)=>{

   try {
    const loggedInUser=req.user;
    const newConnectionRequest= await connectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",
    }).populate("fromUserId",["firstName","lastName"]);



    res.json({
        message:"Data feched successfuly",
        data:newConnectionRequest,
    })
}catch(err){
    res.status(400).send(err.message);
}

})

module.exports=userRouter