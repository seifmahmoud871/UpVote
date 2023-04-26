import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const signupSchema={
    body:joi.object({
        userName:joi.string().alphanum().min(2).max(25).required(),
        email:generalFields.email,
        password:generalFields.password,
        cPassword:generalFields.cPassword.valid(joi.ref('password')).required(),
        
    }).required(),
    query:joi.object({
        flag:joi.boolean(),
        
    }).required(),
};

export const loginSchema=joi.object({
    email:generalFields.email,
    password:generalFields.password,    
}).required();