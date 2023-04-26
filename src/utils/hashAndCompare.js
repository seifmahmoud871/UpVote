import bcrypt from "bcryptjs";


export const hashText=({plainText,salt=process.env.SALT_ROUND}={})=>{
    const hash = bcrypt.hashSync(plainText,parseInt(salt));
    
    return hash;
}

export const compare=({hashText,plainText}={})=>{
    const match=bcrypt.compareSync(plainText,hashText);

    return match;
}