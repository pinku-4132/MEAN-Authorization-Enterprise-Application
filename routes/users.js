const express=require('express');
const passport=require('passport');
const jwt=require('jsonwebtoken');

const User=require('../models/user');
const router=express.Router();

// Setting up router values
//register
router.post('/register',(req,res,next)=>{
    
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    User.addUser(newUser,(err,user)=>{
        if(err)
            res.json({success:false,msg:'User Registration failed.'});        
        else
            res.json({success:true,msg:'User Succesfully registered'});
    });
});

//authenticate
router.post('/authenticate',(req,res,next)=>{
    res.send('Authentication page');
});

//Profile
router.get('/profile',(req,res,next)=>{
    res.send('Profile page');
});

module.exports=router;



