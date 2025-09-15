"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const JWT = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
        res.status(401).json({ message: "No token found" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await userModel_1.userModel.findById(decoded.id || decoded._id);
        if (!user) {
            res.status(404).json({ message: " user not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(402).json({ message: "invalid token", err: err.message });
        return;
    }
};
exports.JWT = JWT;
//# sourceMappingURL=Jwt.js.map