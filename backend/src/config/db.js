import mongoose from "mongoose"

async function connectDB(url) {
    try {
        await mongoose.connect(url)
        console.log("database connected successfully")
    } catch (error) {
        console.error(error)
    }
}

export default connectDB;