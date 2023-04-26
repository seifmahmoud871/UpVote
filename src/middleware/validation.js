import joi from 'joi'
import { Types } from 'mongoose';
const dataMethod = ["body", "query", "params", "headers","file"];

const validateObjectId=(value,helper)=>{
    console.log({value});
    console.log({helper});
    return Types.ObjectId.isValid(value) ? true :helper.message('In-valid Object Id');
}

export const generalFields = {
    userName: joi.string().alphanum().min(2).max(25).required(),
    email: joi.string().email({ maxDomainSegments: 3, minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: joi.valid(joi.ref('password')).required(),
    id:joi.string().custom(validateObjectId).max(24).min(24),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
        dest:joi.string().required(),
    })
    
}

export const validation = (schema) => {
    return (req, res, next) => {
        const validationArr = [];
        dataMethod.forEach(key => {
            if (schema[key]) {
                const validation = schema[key].validate(req[key], { abortEarly: false });
                if (validation.error) {
                    validationArr.push(validation.error.details);
                }

            }

        });
        if (validationArr.length > 0) {
            return res.json({ message: "validation Error", validationArr })
        }
        else
            return next();
    }
}