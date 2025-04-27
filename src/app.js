const express=require("express");
const {connectionDB} = require("./config/database.js");
const User=require("./models/user.js");
const app=express();

app.post("/signup", async(req,res)=>{
    // Here we create the instance of the model it means we can create a new user to add it to database
    const user= new User({
        firstName:"Mohan",
        lastName:"Reddy",
        email:"tony@gamil.com",
        password:"reddy4333"
    });

    try{ await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("this shows error we will rectify it");
    }
   
});


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

 


