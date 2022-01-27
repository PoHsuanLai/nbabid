import mongoose from 'mongoose';
import dotenv from "dotenv-defaults"

async function connect(){
    dotenv.config();

    mongoose.connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res)=>console.log("mongo db connection created"))

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("Mongo Connected!");
    });
}

export default {connect};