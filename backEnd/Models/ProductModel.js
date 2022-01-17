import mongoose from 'mongoose';

const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:String,required:true},
    comment:{type:String,required:true},
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,

    default: 0,
  },
  numReviews: {
    type: Number,

    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  Reviews: [reviewSchema],
});

const Product=mongoose.model('Product',productSchema);

export default Product;