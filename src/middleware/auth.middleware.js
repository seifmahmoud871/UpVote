import userModel from "../../DB/model/user.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";


const auth=asyncHandler(async(req,res,next)=>{
    const {authorization}=req.headers;

    if(!authorization?.startsWith(process.env.BEARER_KEY)){
        return next (new Error("In-valid bearer key"));
    }

    const token=authorization.split(process.env.BEARER_KEY)[1];;
    if(!token){
        return next (new Error("In-valid Token"));
    }
    const decoded=verifyToken({token});

    if(!decoded?.id){
        return next (new Error("In-valid Token payload"));
    }

    console.log({decoded});
    const authUser=await userModel.findById(decoded.id);
    if(!authUser){
        return res.json({message:"Not register account"});
    }

    req.user=authUser;
    return next();

})

export default auth;