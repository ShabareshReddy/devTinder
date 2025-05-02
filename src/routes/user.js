const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User=require("../models/user")

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

});



userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const newConnectionRequest=await connectionRequest.find({
          $or: [{ toUserId:loggedInUser._id,status:"accepted"},
               {fromUserId:loggedInUser._id,status:"accepted"}]
            
        }).populate("fromUserId","firstName  lastName" ).populate("toUserId","firstName lastName");

        const data=newConnectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId;
        })


        res.json({
            message:"data fetched of your connection successfuly",
            data
        });

    }catch(err){
        res.status.send("ERROR :" +err.message);
    }
});

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page =parseInt(req.query.page) ||1
        const limit=parseInt(req.query.limit)||10
        const skip=(page-1)*limit

        const newConnectionRequest=await connectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},
                 {toUserId:loggedInUser._id}]
                }).select("fromUserId toUserId");

                const hideUserFromFeed=new Set();
                newConnectionRequest.forEach(req=>{
                    hideUserFromFeed.add(req.fromUserId.toString());
                    hideUserFromFeed.add(req.toUserId.toString());
                });
                
                const users=await User.find({
                    $and:[
                        {_id:{$nin:Array.from(hideUserFromFeed)}},
                        {_id:{$ne:loggedInUser._id}}
                    ]
                }).select("firstName lastName about age gender").skip(skip).limit(limit);

         res.send(users);

    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})

module.exports=userRouter