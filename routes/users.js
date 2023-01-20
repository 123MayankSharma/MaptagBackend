const router=require("express").Router()
const bcrypt = require('bcrypt')

const User=require('../models/User')


/*
  register a new user
*/

router.post("/register",async (req,res)=>{
   const newUser=new User(req.body)
  try{
    //generate new password
    const salt=await bcrypt.genSalt(10)
    const hashedPass=await bcrypt.hash(req.body.password,salt)
    
   
    
    //create new user
    const newUser=new User({...req.body,password:hashedPass})
    const savedUser=await newUser.save()
    
    //save user and send response
    res.status(200).json(savedUser)
    
  }catch(err){
      res.status(500).json(err)
  }
})

/*
  login a user
*/

router.post("/login",async (req,res)=>{
  try{
    //find if user exists or not
    
    const user=await User.findOne({username:req.body.username})
    
    //if user is not found
    if(!user) res.status(400).json("Entered Username or Password is Incorrect!")
    
    //then, validate the password
    const validatePassword=bcrypt.compare(req.body.password,user.password)
    
    //if password of user stored in db does not match password entered by client return client error
    if(!validatePassword) res.status(400).json("Entered Username or Password is Incorrect!")
    
    
    //then success(200) response
    res.status(200).json({_id:user._id,username:user.username});
    
    
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports=router
