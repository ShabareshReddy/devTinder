const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const connectionRequest=require("../models/connectionRequest.js");
const User=require("../models/user.js")


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;


        const allowedStatus=["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status type"+status
            });
        }
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message:"user not found"})
        }

        const existedConnectionRequest=await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existedConnectionRequest){
            return   res.status(400).json({message:"connection existed already"});
        }

        const newRequest=new connectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data=await newRequest.save();
        res.json({
            message:"Connecction Request send successfuly",
            data,
        });

    }catch(err){
        res.status(400).send("ERROR :"+err.message)
    }
 })

 requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const {status,requestId}=req.params;
        
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"status is not valid!!!"
            });
        }
        
        const newRequest=await connectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });
        if(!newRequest){
            return res.status(400).json({message:"connectionRequest not found!!!!"});
        }

        newRequest.status=status;
        const data=await newRequest.save();
        res.json({
            message:"connection request"+ status,data
        })

    }
    catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
 })


module.exports=requestRouter;