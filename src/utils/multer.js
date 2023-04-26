import fs from 'fs';
import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname=path.dirname(fileURLToPath(import.meta.url))


export const fileValidation={
    image:["image/jpeg","image/png","image/gif"],
    file:["application/pdf","application/msword"],
}

function fileUpload(customPath='general',customValidation=[]){

    const fullPath = path.join(__dirname,`../../uploads/${customPath}`);

    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true});
    }
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, fullPath)
        },

        filename:(req,file,cb)=>{
            const suffixName=nanoid()+'_'+file.originalname;
            file.dest=`uploads/${customPath}/${suffixName}`
            cb(null,suffixName);
        }
    })

    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb('In-valid format',false);
        }

    }
    const upload = multer({ dest: "uploads", fileFilter ,storage });
    return upload
} 

export default fileUpload;