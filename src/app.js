const express=require("express");
const {connectionDB} = require("./config/database.js");
const User=require("./models/user.js");
const {validateSignUpData}=require("./utils/validations.js");
const bcrypt=require("bcrypt");
const app=express();
const cookieParser=require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth.js");
// const { isJWT } = require("validator");

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async(req,res)=>{
    try{ 
    // validation the data  before the user enter into db
    validateSignUpData(req);

    // Encrypt the password

    const {firstName,lastName,email,password,}=req.body;

    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);


    // Here we create the instance of the model it means we can create a new user to add it to database
    const user= new User({
        firstName,
        lastName,
        email,
        password:passwordHash
    });

  
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
   
});

app.post("/login",async(req,res)=>{
// user is there are not check
try{
    const{email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        throw new Error("invalid email id")
    }
    const passwordValid=await bcrypt.compare(password,user.password);
    if(passwordValid){

        // Token logic 
        const token=await jwt.sign({_id:user._id},"NamasteDev@90");
        // console.log(token);

        // add the token to cookie and send responce back to user
        res.cookie("token",token);

        res.send("Login successfull");
    }
    else{
        throw new Error("password is not valid")
    }
}catch(err){
    res.status(400).send(err.message);
}
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
   const user=req.user;
   res.send(user);
}catch(err){
    res.status(400).send(err.message);
}
})

app.post("/sentRequest",userAuth,(req,res)=>{
   const user=req.user;
    res.send(user.firstName +"will sent connection request");
})


app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=["userId","about","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed){
            throw new Error("User can`t update");
        }
        if(data.skills.length>10){
            throw new Error("only 10 skills")
        }
        const user=await User.findByIdAndUpdate(userId,data);
        res.send("user sucessfully updates");
    }catch(err){
        res.status(404).send(err.message);
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

 


