const express = require("express")
require("dotenv").config()
const {connection} = require("./config/db")
const{PostRouter}=require("./router/Post.routes")
const{UserRouter}=require("./router/User.routes")
const{auth}=require("./middleware/auth")


const app=express();
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("welcome")
}) 

app.use("/users",UserRouter)
app.use(auth)
app.use("/posts",PostRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connection to db cloud")
    }
    catch(err){
        console.log(err)
    }
    console.log(`working on ${process.env.port}`)
})