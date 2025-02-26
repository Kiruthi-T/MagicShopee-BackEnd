const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users',require:true},
    products:{type:mongoose.Schema.Types.ObjectId,ref:"products",require:true},
    
},
{timestamps:true}
)

module.exports=mongoose.model("recentViews",Schema);