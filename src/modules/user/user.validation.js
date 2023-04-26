import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';



export const updatePassword={
    body:joi.object({
        oldPassword:generalFields.password,
        newPassword:generalFields.password.invalid(joi.ref('oldPassword')),
        cPassword:generalFields.cPassword.valid(joi.ref('newPassword')),
    }).required(),
};

export const shareProfile={
    params:joi.object({
        id:joi.string().min(24).max(24).required(),
    }).required(),
}

export const profilePic={
    file:generalFields.file.required(),
}
