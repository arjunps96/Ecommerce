import mongoose from 'mongoose';
import colors from 'colors'

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            

            
        })
        console.log(`DB connection was successfull on ${conn.connection.host}`.cyan.bold)
        
    } catch (error) {
        console.error(`Error:${error.message}`.red.bold)
        
    }
}
export default connectDB;