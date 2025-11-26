

const redisclient = require("../config/redis")
const User = require("../models/user")
const validate=require('../utils/validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const  Submission=require('../models/Submission')

const register=async(req,res)=>{
    try{
    //validate the data
    
    validate(req.body);
    
    const {firstname,emailid,password} = req.body;

   req.body.password=await bcrypt.hash(password,10);
         req.body.role = 'user'

    
   const user= await User.create(req.body)

  const token= jwt.sign({_id:user._id,emailid:emailid,role:'user'},process.env.JWT_KEY,{expiresIn:60*60})

    const reply={
        firstname:user.firstname,
        emailid:user.emailid,
        _id:user._id,
        role:user.role,
       }

  res.cookie('token',token,{maxAge:60*60*1000})
    res.status(201).json({
            user:reply,
            message:"login successfully"
         })
    }

    catch(err){
        res.status(400).send("Error:"+err);

    }

}






const login=async (req,res)=>{

    try{

        const {emailid,password}=req.body;

        if(!emailid)
            throw new Error("credential missing")

        if(!password)
            throw new Error("inavalid password")

        const user=await User.findOne({emailid});

       const match=await bcrypt.compare(password,user.password)

       if(!match)
        throw new Error("invalid credentials")


       const reply={
        firstname:user.firstname,
        emailid:user.emailid,
        _id:user._id,
        role:user.role,

       }

         const token= jwt.sign({_id:user._id,emailid:emailid,role:user.role},process.env.JWT_KEY,{expiresIn:60*60})

         res.cookie('token',token,{maxAge:60*60*1000})

         res.status(201).json({
            user:reply,
            message:"login successfully"
         })
    }

    catch(err){
        res.status(401).send("error:"+err)

    }
}

const logout=async(req,res)=>{
    try{

        const {token}=req.cookies;
        const payload=jwt.decode(token);
        await redisclient.set(`token:${token}`,'blocked')
        await redisclient.expireAt(`token:${token}`,payload.exp)

        //token kar dunga redis ke blocklist me
        //cookies ko clear kar dena...

        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logged out successfully")
        
    }

    catch(err){

        res.status(401).send("error"+err.message);

    }
}

const adminRegister=async (req,res)=>{
    try{
    //validate the data
    
    validate(req.body);
    
    const {firstname,emailid,password} = req.body;

   req.body.password=await bcrypt.hash(password,10);
   req.body.role='admin'
    
   const user= await User.create(req.body)

  const token= jwt.sign({_id:user._id,emailid:emailid,role:req.body.role},process.env.JWT_KEY,{expiresIn:60*60})

  res.cookie('token',token,{maxAge:60*60*1000})
  res.status(201).send("user registered successfully")

    }

    catch(err){
        res.status(400).send("Error:"+err);

    }


}

const deleteProfile=async(req,res)=>{
    try{

        const userId=req.result._id;

        //user delete
        await User.findByIdAndDelete(userId);


        //submission se bhi delete karo..

    //   await  Submission.deleteMany({userId})

    

      res.status(200).send("deleted successfully")
    }

    catch(err){

        res.status(500).send("internal server error")

    }

}
module.exports={register,login,logout,adminRegister,deleteProfile};

