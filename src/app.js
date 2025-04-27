const express=require("express");
const app=express();

app.get("/user",(req,res)=>{
    res.send("this is the get call from the db");
})

app.post("/user",(req,res)=>{
    res.send("it is the post call which is the user data will be stored in the db");
})

app.put("/user",(req,res)=>{
    res.send("this call will changes in the db");
})

app.delete("/user",(req,res)=>{
    res.send("this is call will be delete in the db");
})


 app.listen(3000,()=>{
    console.log("server is listening successfully");
})


