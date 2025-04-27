const express=require("express");
const app=express();

app.use("/user",(req,res,next)=>{
    // res.send("this is 1st responce");
    next();
},
(req,res,next)=>{
    // res.send("this is 2nd reponce");
    next();
},
(req,res,next)=>{
    res.send("this is 3rd responce");
    next();
}

)


 app.listen(3000,()=>{
    console.log("server is listening successfully");
})


