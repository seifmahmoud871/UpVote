import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import postRouter from './modules/post/post.router.js'
import userRouter from './modules/user/user.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'
import { fileURLToPath } from "url";
import path from "path";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const initApp=(app,express)=>{

    app.use(express.json({}));
    app.use('/uploads',express.static(path.join(__dirname,'../uploads')))
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/post',postRouter);
    
    app.all("*",(req,res,next)=>{
        return res.json({message:"In-valid Routing"});
    })

    connectDB();
    app.use(globalErrorHandling);
}


export default initApp;