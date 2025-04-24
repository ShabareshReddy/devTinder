const express=require("express");

const app=express();


app.use("/hello",(req,res)=>{
    res.send("this is hello hello!");
});


app.use("/test",(req,res)=>{
    res.send("it is testing route");
});

app.use((req,res)=>{
    res.send("heloo we are created first server using express");
});


app.listen(3000,()=>{
    console.log("server is listening successfully in port 3000");
});