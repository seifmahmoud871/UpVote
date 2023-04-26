import commentModel from "../../../../DB/model/comment.model.js";
import postModel from "../../../../DB/model/post.model.js";




export const createComment =async(req,res,next)=>{
    req.body.postId=req.params.id;
    req.body.userId=req.user._id;

    const post =await postModel.findById(req.params.id);
    if(!post){
        return next(new Error ('In-valid Post Id',{cause:400}));
    }
    if(req.file){
        req.body.file=req.file.dest;
    }

    const comment = await commentModel.create(req.body);

    return res.json({message:"Done",comment});
}

export const createReplyOnComment =async(req,res,next)=>{
    req.body.postId=req.params.id;
    req.body.userId=req.user._id;

    const comment =await commentModel.findById({_id:req.params.commentId,postId:req.params.id});
    if(!comment){
        return next(new Error ('In-valid comment Id',{cause:400}));
    }
    if(req.file){
        req.body.file=req.file.dest;
    }

    req.body.commentType='reply';
    const reply = await commentModel.create(req.body);
    comment.reply.push(reply._id);
    await comment.save();
    return res.json({message:"Done",comment});
}