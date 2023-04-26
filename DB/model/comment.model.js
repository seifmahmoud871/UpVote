import mongoose, { Schema, Types, model } from "mongoose";


const commentSchema=new Schema({

    text:{
        type:String,required:true,
    },
    image:{
        type:Object,
         
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    postId:{
        type:Types.ObjectId,
        ref:"Post",
        required:true,
    },
    like:[{
        type:Types.ObjectId,
        ref:"User",
    }],
    unLike:[{
        type:Types.ObjectId,
        ref:"User",
    }],
    isDeleted:{
        type:Boolean,default:false,
    },
    reply:[{
        type:Types.ObjectId,
        ref:"Comment"
    }]
    ,
    commentType:{
        type:String,
        default:"comment",
        enum:["comment","reply"]
    }
    
},{
    timestamps:true,
});


const commentModel =mongoose.models.Comment || model('Comment',commentSchema);

export default commentModel;