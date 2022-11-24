import mongoose from "mongoose";
const Client = async () => mongoose.connect(process.env.MONGO_URI);
export default Client;
