const jwt=require("jsonwebtoken");
const User=require("../models/user.js")
const env=require("dotenv")

const auth=async function(req,res,next){
    try{
        const token=req.header("Authorization").replace("Bearer ","");
       const status=jwt.verify(token,process.env.SECRET);
       // { field: { nestedfield: <value> } }
     const user=await User.find({_id:status.id,"tokens.token":token.toString() });
     if(!user){
         throw new Error();
     }
     req.token=token;
     req.user=user;
    }
    catch(e){
        res.status(401).send("please authenticate");

    }
    
}