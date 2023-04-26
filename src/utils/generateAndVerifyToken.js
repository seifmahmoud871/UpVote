import jwt from 'jsonwebtoken'


export const generateToken=({payload,signater=process.env.TOKEN_SIGNATER,expiresIn=60*30*30}={})=>{
    const token=jwt.sign(payload,signater,{expiresIn:parseInt(expiresIn)});
    return token;
}


export const verifyToken=({token,signater=process.env.TOKEN_SIGNATER}={})=>{
    const decoded=jwt.verify(token,signater);
    return decoded; 
}

