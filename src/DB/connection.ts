import mongoose from "mongoose";
import config from "../config/dev.config";

export const connectDB = () => {
    mongoose.connect(config.DB_URL as string).then(() => {
        console.log("Connected to MongoDB successfully ✔✔");
    }).catch((err) => {
        console.error("failed to connect to MongoDB 🚨 >>>>>>>>>>>> ",err);
    })
}
