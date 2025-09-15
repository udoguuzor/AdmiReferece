"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    isLogin: { type: Boolean, default: false },
    book: [{ type: mongoose_1.default.Types.ObjectId, ref: "book" }],
    role: { type: String, default: "user" }
}, { timestamps: true });
exports.userModel = mongoose_1.default.model("book", userSchema);
//# sourceMappingURL=userModel.js.map