 const users = require('../models/userModel')
 const jwt = require('jsonwebtoken')

// register logic
exports.registerController = async (req,res)=>{
    console.log("Inside register function");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        // email is the mogodb users
        const exisitingUser = await users.findOne({email})
        if(exisitingUser){
            // already a user
            res.status(406).json("Account already exist!!! Please login...")
        }else{
            // add /register user : create object for your model
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            // update  mongo db from model
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// login

exports.loginController = async (req,res)=>{
    console.log("Inside Login function ");
    const {email,password} =req.body
    console.log(email,password);
    try{
        const exisitingUser = await users.findOne({email,password})
        if(exisitingUser){
            //token generate
            const token = jwt.sign({userId:exisitingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:exisitingUser,
                token
            })
        }else{
            res.status(404).json("Invalid Email / Password..")
        }
    }catch(err){
        res.status(401).json(err)
    }
}