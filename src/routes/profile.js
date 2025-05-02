const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const {validateEditProfileData}=require("../utils/validations.js")



profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
   const user=req.user;
   res.send(user);
}catch(err){
    res.status(400).send(err.message);
}
})

profileRouter.patch("/profile",userAuth,async(req,res)=>{
    try{
      if (!validateEditProfileData(req)){
        throw new Error("invalid edit request");
      }

      const loggedInUser=req.user;
      console.log(loggedInUser);

     Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);
      console.log(loggedInUser);
      await loggedInUser.save();
      
      res.send(`${loggedInUser.firstName},your profile updated successful`);
        
    }catch(err){
        res.status(400).send(err.message)
    }   
    
})


module.exports=profileRouter;