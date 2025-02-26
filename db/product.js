const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: { type: Number, min: 0, max: 5 },
  stock: { type: Number, default: 0 },
  sku: String,
  weight: String,
  dimensions: {
    type: { width: Number, height: Number, depth: Number },
    default: { width: 0, height: 0, depth: 0 }
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock", "Preorder","Low Stock"],
    default: "In Stock"
  },
  reviews: [
    {
      rating: { type: Number, min: 0, max: 5 },
      comment: String,
      date: { type: Date, default: Date.now },
      reviewerName: String,
      reviewerEmail: String
    }
  ],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: { type: String },
    qrCode: { type: String }
  },
  images: {
    type: [String],
    validate: v => Array.isArray(v) && v.length > 0
  },
  thumbnail: String

})

const products=mongoose.model('products',schema);

async function run(){
  const response=await fetch("https://dummyjson.com/products?limit=200");
  const json=await response.json();
  const fetchedproducts=json.products;

  // console.log(fetchedproducts);
  await products.insertMany(fetchedproducts);

  console.log('inserted Sucessfully');
  
   
 }
//  run()

 module.exports=products