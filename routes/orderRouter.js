const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("cart")
})

router.get('/cat',(req,res)=>{
    res.send("hiii cart")
})

module.exports=router