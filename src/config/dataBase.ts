import mongoose from "mongoose"



const connectDB = async():Promise<void>=>{
    const MONGODB_URL = process.env.MONGODB_URL;
    if(!MONGODB_URL){
        console.error("Error connecting to MONGODB in .env");
        throw new Error("Error connecting to MONGODB_URL")
        
    }
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("connected to MongoDB")
    }catch(err:any){
        console.error("An error occured connecting to db", err)
        throw Error
    }
}


export default connectDB
