const adminAuth=(req,res,next)=>{
    console.log("admin auth is getiing checked")
    const token= "xyz";
    const authen= token === "xyz";
  if(!authen){
    res.status(401).send("unauthorized request")
  }
  else{
    next();
  }
  
};
const userAuth=(req,res,next)=>{
    console.log("this is th auth for authentication")
    const token="xyzfa";
    const authen=token==="xyz";
    if(!authen){
        res.status(401).send("unauthorized")
    }else{
        next();
    }
}

module.exports={adminAuth,userAuth};