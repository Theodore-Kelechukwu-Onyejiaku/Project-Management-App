import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connect(process.env.DB_URL as string)
        .then(() => { console.log("Database Connected!".cyan.underline.bold) })
}

export default connectDB;