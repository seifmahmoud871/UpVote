import joi from "joi";
import {generalFields} from '../../middleware/validation.js'

export const creatPost={
    body:joi.object({
        title:joi.string().min(5).max(1500).required(),
        caption:joi.string().min(5).max(15000),
    }).required(),
    file:generalFields.file,
}


export const likeOrUnlikePost={
    params:joi.object({
        id:generalFields.id.required(),
    }).required(),

}


export const creatComment={
    body:joi.object({
        text:joi.string().min(5).max(15000),
    }).required(),
    
    file:generalFields.file,
}

export const replyComment={
    body:joi.object({
        text:joi.string().min(5).max(15000),
    }).required(),
    // params:joi.object({
    //     id:generalFields.id.required(),
    //     commentId:generalFields.id.required(),
    // }).required(),
    
    file:generalFields.file,
}

