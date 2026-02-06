import mongoose from "mongoose";

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
        console.log("Connect to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDb", error)
    }
}
export default connectToMongoDB;

// import mongoose from "mongoose";

// export const connectToMongoDb = async () => {
//   await mongoose.connect("YOUR_MONGO_URL");
//   console.log("MongoDB connected");
// }
// export default connectToMongoDb;
