const express=require("express");
const app=express();




app.get("/getUserData",(req,res)=>{
    // try{
        throw new Error("ndajfakjf");
        res.send("user data sent");
    // }catch(err){
    //     res.status(500).send("something went wring");
    // }
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("please it is technical issue...contact your team");
    }
})


 app.listen(3000,()=>{
    console.log("server is listening successfully");
})


