

import express from 'express'
import dotenv from 'dotenv'


import products from './products.js';

import connectDB from './config/db.js';



dotenv.config()


const app=express()

const PORT=process.env.PORT||5000

app.listen(PORT,console.log(`App listening to port ${PORT} in ${process.env.ENV}`))

connectDB();

app.get('/api/products',(req,res)=>{
    res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product=products.find(product=>product._id===req.params.id);
    res.json(product)
})