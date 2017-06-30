const express=require('express');
const path=require('path');
const cors=require('cors');
const bodyParser=require('body-parser');
const passport=require('passport');
const jwt=require('passport-jwt');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');

const app=express();
const users=require('./routes/users');

const config=require('./config/database');

const PORT = process.env.PORT || 3000;

//connected to database
mongoose.connect(config.database);

//Upon connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to databse :' +config.database);
});

mongoose.connection.on('error',(err)=>{
    console.log('Databse error:'+ err);
});

//Setting up middleware
app.use(cors());

//bodyparser middleware
app.use(bodyParser.json());

app.use('/users',users);

//passport middleware authentication initialise
app.use(passport.initialize());
app.use(passport.session());

//set up static file to hold up client files
app.use(express.static(path.join(__dirname,'public')));

//set index route
app.get('/',(req,res)=>{
    res.send('Invalid endpoint');
});

//setting server port
app.listen(PORT,()=>{
    console.log('Server is running on port :'+ PORT);
});