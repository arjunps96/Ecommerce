

import express from 'express'
import dotenv from 'dotenv'




import connectDB from './config/db.js';

import ProductRoutes from './routes/productsRoutes.js';

import {notFound,genralError} from './middlewares/errorMiddleware.js';



dotenv.config()


const app=express()

const PORT=process.env.PORT||5000

app.listen(PORT,console.log(`App listening to port ${PORT} in ${process.env.ENV}`))

connectDB();




app.use('/api/products',ProductRoutes)
app.use(notFound)
app.use(genralError)





