const express=require("express");
const {connectionDB} = require("./config/database.js");

const app=express();
// const { isJWT } = require("validator");
const cookieParser=require("cookie-parser");




app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



// app.patch("/user",async(req,res)=>{
//     const userId=req.body.userId;
//     const data=req.body;
//     try{
//         const ALLOWED_UPDATES=["userId","about","age","skills"];
//         const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
//         if(!isUpdateAllowed){
//             throw new Error("User can`t update");
//         }
//         if(data.skills.length>10){
//             throw new Error("only 10 skills")
//         }
//         const user=await User.findByIdAndUpdate(userId,data);
//         res.send("user sucessfully updates");
//     }catch(err){
//         res.status(404).send(err.message);
//     }
// })



connectionDB()
.then(()=>{
    console.log("database connection establised");
    app.listen(3000,()=>{
        console.log("server is listening successfully");
    });
    
    })
    .catch((err)=>{
        console.log("cannot connect db")
});

 


