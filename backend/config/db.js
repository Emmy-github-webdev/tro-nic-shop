import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

export default connectDB;