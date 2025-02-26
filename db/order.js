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
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
      },
      paymentMethod: { type: String, required: true },
      totalPrice: { type: Number, required: true },
},
{ timestamps: true })

module.exports=mongoose.model("orders",Schema)