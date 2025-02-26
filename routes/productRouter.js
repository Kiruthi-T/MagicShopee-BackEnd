const express=require('express');
const mongoose=require('mongoose')
const router=express.Router();
const products=require('../db/product');
const jwt =require('jsonwebtoken')
const recents=require('../db/recents');


router.get('/',async (req,res)=>{
    try{
    const product=await products.find();
    res.status(200).send(product);
    console.log("products sended");
    
    }
    catch(err){
        console.log(err);
        
    }
    
})

//MidleWare to add to recents
const addToRecents=async (req,res,next)=>{
    const request=req.header('authorization');
    const token=request.split(' ')[1]
    // console.log(token);

    const decoded=jwt.verify(token,process.env.SECRET_KEY);

    // console.log(decoded);

    req.user=decoded.id
    const {id}=req.params;

    // console.log(req.user,id);

    const recentviews=await recents.create({user:req.user,products:id});
    // console.log(recentviews);
    
    

    next();
    
}


router.get('/:id',addToRecents,async(req,res)=>{

    const {id}=req.params;
    // console.log(id);

    const product=await products.findById(id);
    // console.log(product);
    res.send(product)
    
})

module.exports=router