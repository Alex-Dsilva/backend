const express=require("express")
const {PostModel} = require("../model/post.model")
const PostRouter=express.Router()

PostRouter.get("/",async(req,res)=>{
    const userID=req.body.userID
    try{
        const posts=await PostModel.find({userID:userID})
        res.send(posts)
    }
    catch(err){
        console.log(err)
        res.send("something wrong while getting your posts")
    }
})

PostRouter.post("/add",async(req,res)=>{
    const userID=req.body.userID
    const {title,body,device}=req.body
    try{
        const user=new PostModel({title,body,device,userID})
        await user.save()
        res.send("successfully added")
    }
    catch(err){
        console.log(err)
        res.send("something wrong while posting")
    }
})


PostRouter.patch("/update/:id",async(req,res)=>{
    const userID=req.body.userID
    const {Id}=req.params
    const payload=req.body
    try{
        await PostModel.findByIdAndUpdate({_id:Id},payload)
        res.send(`post upadted with the id ${Id}`)
    }
    catch(err){
        console.log(err)
        res.send("something wrong while updating your posts")
    }

})

PostRouter.delete("/delete/:id",async(req,res)=>{
    const userID=req.body.userID
    let {Id}=req.params
    try{
        await PostModel.findByIdAndDelete({_id:Id})
        res.send(`Deleted post with id ${Id}`)
    }
    catch(err){
        console.log(err)
        res.send("something wrong while deleting your posts")
    }
})

module.exports={PostRouter}