const express=require("express")
const {UserModel} = require("../model/users.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()
const UserRouter=express.Router()

UserRouter.post("/register",async (req,res)=>{
    const {email,password,name,gender}=req.body
    console.log(req.body)
    try {
        const userPresent=await UserModel.findOne({email})
        if(userPresent?.email){
            res.send("User already exists please login")
        }else{
            bcrypt.hash(password, 5,async function(err, decode) {
                if(err){
                    res.send(`Error while registering user ${err}`)
                }else{
                    const user=new UserModel({email,password:decode,name,gender})
                    await user.save()
                    res.send("sign up successfully")
                }
            }); 
        }
    } catch (error) {
        console.log(err)
        res.send("something wrong while registering")
    }
    
})


UserRouter.post("/login",async (req,res)=>{
    // console.log(req.body) //this is data what we send
    const{email,password}=req.body
    try{
        bcrypt.hash(password, 5,async function(err, decode) {
            if(err){
                res.send("Error While login")
            }else{
                const user=await UserModel.find({email,password:decode})
                if(user.length>0){
                    const token = jwt.sign({"userID":user[0]._id}, process.env.key);
                    res.send({mesg:"Login successfull",token:token})
                    console.log(token)
                    console.log(user)
                }else{
                    res.send("User Dose not exists")
                }
            }
        });
    }
    catch(err){
        console.log(err)
        res.send("Login Failed please try again")
    }
})

module.exports={UserRouter}