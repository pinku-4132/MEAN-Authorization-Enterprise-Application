const express=require('express');
const passport=require('passport');
const jwt=require('jsonwebtoken');

const User=require('../models/user');
const config=require('../config/database');
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
    const username=req.body.username;
    const password=req.body.password;
    User.getUserByName(username,(err,user)=>{
        console.log(user);
        if(err) throw err;
        if(!user){
            
            return res.json({success:false,msg:'UserName not found!'});

        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;;
            if(isMatch){
                const token=jwt.sign(user,config.secret,{
                    expiresIn:604800 //1 week
                });
                res.json({
                    success:true,
                    token:'Jwt'+ token,
                    user:{
                        id:user._id,
                        name:user.name,
                        email:user.email,
                        username:user.username,
                        password:user.password
                    },
                    msg:'Token retrieved.'
                });
            }else
                return res.json({success:false,msg:'Invalid password'});
        });
    });
});

//Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user,msg:'Success! You can not see this without a token'});
});

module.exports=router;



