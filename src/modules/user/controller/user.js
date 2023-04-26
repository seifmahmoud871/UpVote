import userModel from "../../../../DB/model/post.model.js";



export const shareProfile= async(req,res,next)=>{
    const {id}=req.params;
    const userProfile=await userModel.findById(id).select("firstName lastName userName email profilePic");
    return profile?res.status(200).json({message:"Done",profile}):next (new Error("In-valid account Id",{cause:404}))

}

export const profile=async(req,res,next)=>{
    const user=await userModel.findById(req.user._id);
    return res.json({message:"Done",user});

}


export const updatePassword=async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body;

    const user = await userModel.findOne(req.user._id);

    const match = compare({plainText:oldPassword,hashValue:user.password});
    if(!match){
        return next(new Error('Invalid old password',{cause:400}));
    }
    const newHashPassword = hashText({plainText:newPassword});
    user.password=newHashPassword;
    await user.save();
    return res.json({message:"Done",user});

}   
