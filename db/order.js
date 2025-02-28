const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" ,require:true},
    orderedItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products",require:true },
            quantity: Number,
        }
    ],
    shippingAddress: {
        Fname: String,
        Lname: String,
        Email: String,
        mobileNumber:String,
        street: String,
        city: String,
        state: String,
        Zip: String,
        Country: String,
      },
      paymentMethod: { type: String, required: true },
      totalPrice: { type: Number, required: true },
},
{ timestamps: true })

module.exports=mongoose.model("orders",Schema)