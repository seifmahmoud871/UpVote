import mongoose  from "mongoose";

const connectDB=()=>{
    return mongoose.connect(process.env.DB_LOCAL).then(
        result=>{
            console.log("DB connected successfully............");
        }
    ).catch(err=>{
        console.log(`field to connect on DB............${err}`); 
    })
}
export default connectDB;