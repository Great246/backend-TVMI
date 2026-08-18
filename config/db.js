import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONOGDB_URL)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(error)
    }
} 