import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(() => {console.log("Database Connected!".cyan.underline.bold)})
}

export default connectDB;