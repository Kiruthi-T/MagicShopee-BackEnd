const express=require('express');
const router=express.Router();
const orders=require('../db/order');
const jwt=require('jsonwebtoken');


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

const getOrders=async (req,res,next)=>{
    const request=req.header('authorization');
    const token=request.split(' ')[1]
    // console.log(token);

    const decoded=jwt.verify(token,process.env.SECRET_KEY);

    // console.log(decoded);

    req.user=decoded.id;
    // console.log(req.user);
    
    
    next();
    
}
router.get('/all',getOrders,async (req,res)=>{
    try{
        userId=req.user
        const details=await orders.find({user:userId});
        res.send(details)
    }
    catch(err){
        console.log(err);
        
    }

})

module.exports=router