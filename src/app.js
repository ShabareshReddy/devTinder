const express=require("express");
const app=express();
const {adminAuth,userAuth}=require("./middlewares/auth.js")

app.use("/admin",adminAuth);



app.get("/user",userAuth,(req,res)=>{
    res.send("user is repsonded")
})
app.get("/admin/dataUser",(req,res)=>{
    res.send("data si secure")
    console.log("data is secure in db");
})

app.get("/admin/profile",(req,res)=>{
    res.send("profiled")
    console.log("profileis updated");
})


 app.listen(3000,()=>{
    console.log("server is listening successfully");
})


