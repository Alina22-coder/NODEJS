import express from "express";
import mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);


const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("DB Connection Connected");
            await mongoose.connect(config.MONGODB_URI);
            dbCon = true;
            console.log("MongoDB Connection Connected +++++++++++");

        } catch (e) {
            console.error('MongoDB Connection Error: ', e.message);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Listening on port ${config.PORT}`);
        })
    } catch (e) {
        console.error('MongoDB Connection Error: ', e.message);
    }
}

start().catch((e) => {
    console.error('Fatal error:', e);
});

