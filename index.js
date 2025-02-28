const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const productRouter=require('./routes/productRouter');
const orderRouter=require('./routes/orderRouter')
const users = require('./db/users');
const jwt=require('jsonwebtoken');
const recents=require('./db/recents');


require('dotenv').config();
const Port=process.env.PORT || 8000;
const mongoURI = process.env.MONGODB;
const SECRET_KEY=process.env.SECRET_KEY;



//database connectivity
async function run(){
    await mongoose.connect(mongoURI) ;
    console.log("connected");
}
run();

//Middlewares
// app.use(cors())
app.use(cors());

app.use(express.json());

//Routerss
app.use('/products',productRouter);
app.use('/order',orderRouter);

//user Regestration
app.post('/Register',async (req,res)=>{
    const {name,mail,password}=req.body
    console.log("mail",name,mail,password);
    
    try{
    const Alredyuser=await users.findOne({mail});
    if(Alredyuser) return res.status(400).json({message:"user Alredy Exist"});
        // console.log("psdd",password);
        
    const NewUser=await users.create( {name,mail,password});
    // console.log(NewUser);

    res.status(200).json({message:"user Regestered Sucessfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: "Server error" });
    }

})

//user login verify
app.post('/Login',async (req,res)=>{
    const {mail,password}=req.body
    // console.log("mail",mail,password);

    try{
        const user=await users.findOne({mail});
        // console.log(user);
        
        if(!user) return res.status(404).json({message:'User not fond'});

        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword) return res.status(401).json({ message: "Invalid credentials" });

        const token=jwt.sign({id:user._id,mail:user.mail},SECRET_KEY,{expiresIn:'30d'});

        // console.log(token);

        res.status(200).json({message: "login Sucessfull",token:token}) 
    }
    catch(err){
        res.status(500).json({ error: "Server error" });
    }
})

//recents

const getRecents=async (req,res,next)=>{
    try{
    const request=req.header('authorization');
    const token=request.split(' ')[1]
    // console.log(token);

    const decoded=jwt.verify(token,process.env.SECRET_KEY);

    // console.log(decoded);

    req.user=decoded.id;
    next();
    // console.log(req.user);
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }
        return res.status(403).json({ message: "Invalid token" });
    }
    
   
    
}
app.get('/recents',getRecents,async (req,res)=>{

    userId=req.user
    const products=await recents.find({user:userId}).populate('products');
    // console.log(products);
    // console.log(await recents.find());
    
    // const products=await recents.find({user:userId});
    // const recentproducts=await products.find({_id:{$in:products.products}})
    // console.log(recentproducts);
    res.send(products)
})

app.delete('/recents/del',getRecents,async(req,res)=>{
    userId=req.user
    res.send(await recents.deleteMany({user:userId}));
})

app.get('/profile',getRecents,async(req,res)=>{
   const userId=req.user
   console.log(userId);
   
    const user=await users.findById(userId);
    // console.log(user);
    
    res.send(user)

})
app.listen(Port,()=>console.log(`server is listening ${Port}`));