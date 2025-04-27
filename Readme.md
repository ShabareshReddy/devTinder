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

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
    const user=await User.findByIdAndDelete(userId);
    res.send("user delete successfully");
    }catch(err){
        res.status(404).send("here the id doesnot shown")
    }

}
)

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        const user=await User.findByIdAndUpdate(userId,data);
        res.send("user sucessfully updates");
    }catch(err){
        res.status(404).send("something went wrong in userId");
    }
})