"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
        console.error("Error connecting to MONGODB in .env");
        throw new Error("Error connecting to MONGODB_URL");
    }
    try {
        await mongoose_1.default.connect(MONGODB_URL);
        console.log("connected to MongoDB");
    }
    catch (err) {
        console.error("An error occured connecting to db", err);
        throw Error;
    }
};
exports.default = connectDB;
//# sourceMappingURL=dataBase.js.map