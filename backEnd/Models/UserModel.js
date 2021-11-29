import mongoose from 'mongoose';

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
      type:String,
      unique:true  
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:'false'
    }
    
},{
    timestamps:true
})

const User=mongoose.model('User',UserSchema);

export default User;