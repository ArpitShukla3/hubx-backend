import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
async function ConnectMongo()
{
    try {
       await mongoose.connect(process.env.Url);
        console.log("mongodb connected");

    } catch (error) {
        console.log("mongodb failed to connect due to:",error.message)
    }
}
export default ConnectMongo;