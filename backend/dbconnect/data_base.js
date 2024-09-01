import mongoose from "mongoose";
import colors from 'colors'

export const connectToDB = async() =>{
    try {
        const c = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to Mongodb Database ${c.connection.host}`.bgBlue.white.bold);
    }catch (error){
        console.log(`Error in MongoDB connection ${error}`.bgRed.white.bold)
    }
};
