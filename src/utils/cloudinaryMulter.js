
import multer from 'multer';



export const fileValidation={
    image:["image/jpeg","image/png","image/gif"],
    file:["application/pdf","application/msword"],
}

export function fileUpload(customValidation=[]){

    
    const storage=multer.diskStorage({})

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

