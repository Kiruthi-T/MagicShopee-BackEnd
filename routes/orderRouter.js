const express=require('express');
const router=express.Router();
const orders=require('../db/order')

router.post('/',async (req,res)=>{
    try{
    const orderData=req.body
    // console.log(orderData);
    const create=await orders.create(orderData);
    // console.log(create);
    
    
    res.status(200).json({message:"user Regestered Sucessfully"});
    }
    catch(err){
        console.log(err);
        
    }
})

router.get('/all',async (req,res)=>{
    try{
        const details=await orders.find();
        res.send(details)
    }
    catch(err){
        console.log(err);
        
    }

})

module.exports=router