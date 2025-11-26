const express=require('express');
const authrouter=express.Router();
const {register,login,logout,adminRegister,deleteProfile}=require('../controllers/userauthent');
const usermiddleware = require('../middleware/usermiddleware');
const adminMiddleware=require('../middleware/adminMiddleware')

//register
authrouter.post('/register',register);
authrouter.post('/login',login);
authrouter.post('/logout',usermiddleware,logout);
authrouter.post('/admin/register',adminMiddleware,adminRegister)
// authrouter.get('/getprofile',getprofile);
authrouter.delete('/deleteprofile',usermiddleware,deleteProfile)
authrouter.get('/check',usermiddleware,(req,res)=>{
    const reply={
        firstname:req.result.firstname,
        emailid:req.result.emailid,
        _id:req.result._id,
        role:req.result.role,

    }

    res.status(200).json({
        user:reply,
        message:"valid user"
    })
})

module.exports=authrouter;

//login
//logout
//getprofile