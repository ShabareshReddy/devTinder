const express=require("express");
const {connectionDB} = require("./config/database.js");
const User=require("./models/user.js");
const app=express();

app.use(express.json());


app.post("/signup", async(req,res)=>{
    // Here we create the instance of the model it means we can create a new user to add it to database
    const user= new User(req.body);

    try{ 
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("this shows error we will rectify it");
    }
   
});

// app.get("/user",async(req,res)=>{
//     const userEmail=req.body.email
//     try{
//         const users=await User.find({email:userEmail});
//         res.send(users)
//     }catch(err){
//         res.status(404).send("usernot found");
//     }
// })

// app.get("/feed",async(req,res)=>{
//     try{
//         const users=await User.find({});
//     res.send(users);
//     }catch(err){
//         res.status(404).send("something went wrong");
//     }
    
// })

app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const users=await User.find({email:userEmail})
        res.send(users);
    }catch(err){
        res.status(404).send("user nor found")
    }
})
app.get("/feed",async(req,res)=>{
    try{
        const users =await User.find({})
    res.send(users)
    }catch(err){
        res.status(404).send("sww");
    }
    
})


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

 


