import mongoose, { Schema, model } from "mongoose";


const userSchema=new Schema({

    firstName:String,
    lastName:String,
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    coverimg:String,
    profilePic:String,
    address:String,
    gender:{
        type:String,
        default:"male",
        enum:['male','female']
    },
    phone:String,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"offline",
        enum:['offline','online','block']
    },
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    },

},{
    timestamps:true,
});


const userModel =mongoose.models.User || model('User',userSchema);

export default userModel;