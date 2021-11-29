import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv'

import User from './Models/UserModel.js';
import Product from './Models/ProductModel.js'
import Order from './Models/OrderModel.js';

import users from './data/user.js';
import products from './data/products.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData=async()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const currentUsers=await User.insertMany(users);
        const adminUserId=currentUsers[0].id;
        const updatedProducts=products.map(product=>{
            return {...product,user:adminUserId}
        })
        await Product.insertMany(updatedProducts);
        console.log('Data Imported'.green.inverse);
        process.exit()
    } catch (error) {
        console.error(error.red.inverse);
        process.exit(1)
        
    }
}

const exportData=async()=>{
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data removed'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.bold)
        process.exit(1)
        
    }
}

if(process.argv[2]==='-d'){
    
    exportData();
}else{
    importData();
}