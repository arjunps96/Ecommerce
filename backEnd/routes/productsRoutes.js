import express from 'express';

const routes=express.Router();
import Product from '../Models/ProductModel.js';

import asyncHandler from 'express-async-handler'

routes.get('/',asyncHandler(async(req,res)=>{
   const products=await Product.find({});
   res.status(200).json({
       products
   })

}))

routes.get('/:id',asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
    res.status(200).json({
        product
    })
    }else{
        res.status(404).json({
            message:"No product found"
        })

    }
    
 
 }))

 export default routes;