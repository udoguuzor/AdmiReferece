"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletAllUsers = exports.deleteAUser = exports.updateUser = exports.getALlUsers = exports.getAUser = exports.loginUser = exports.signUp = void 0;
const userModel_1 = require("../model/userModel");
const argon2_1 = __importDefault(require("argon2"));
const generate_1 = __importDefault(require("../middlewares/generate"));
const signUp = async (req, res) => {
    try {
        const { email, name, password, phoneNo } = req.body;
        if (!email || !password || !name || !phoneNo) {
            res.status(400).json({ message: "All fileds are required" });
            return;
        }
        const findUser = await userModel_1.userModel.findOne({ email });
        if (findUser) {
            res.status(401).json({ message: "User already exist" });
            return;
        }
        const hashPassword = await argon2_1.default.hash(password);
        const createUser = await userModel_1.userModel.create({ email, password: hashPassword, phoneNo, name, isLogin: false });
        res.status(201).json({ message: "User created successfully", data: createUser });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to  create user", err: err.message });
        return;
    }
};
exports.signUp = signUp;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All field are required" });
            return;
        }
        const user = await userModel_1.userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "no user found" });
            return;
        }
        const isMatch = await argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            res.status(409).json({ message: "invalid credentials" });
            return;
        }
        user.isLogin = true;
        await user.save();
        const token = (0, generate_1.default)(String(user._id), user.role);
        res.status(200).json({ message: "user logged in successfully", name: user.name,
            email: user.email,
            password: user.password,
            phoneNo: user.phoneNo,
            token
        });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to login", err: err.message });
        return;
    }
};
exports.loginUser = loginUser;
const getAUser = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await userModel_1.userModel.findById(id).populate("book");
        if (!getUser) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User gotten succefully", data: getUser });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to get a user", err: err.message });
        return;
    }
};
exports.getAUser = getAUser;
const getALlUsers = async (req, res) => {
    try {
        const users = await userModel_1.userModel.find();
        res.status(200).json({ message: "users gotten successfully", data: users });
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to login", err: err.message });
        return;
    }
};
exports.getALlUsers = getALlUsers;
const updateUser = async (req, res) => {
    try {
        const { name, email, password, phoneNo } = req.body;
        const { id } = req.params;
        const user = await userModel_1.userModel.findByIdAndUpdate(id, { name, email, password, phoneNo }, { new: true });
        if (!user) {
            res.status(404).json({ message: "No user found to update" });
            return;
        }
        res.status(200).json({ message: "user updated successfully", data: user });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to login", err: err.message });
        return;
    }
};
exports.updateUser = updateUser;
const deleteAUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletAUser = await userModel_1.userModel.findByIdAndDelete(id);
        if (!deletAUser) {
            res.status(404).json({ message: " no user found to delete" });
            return;
        }
        res.status(200).json({ message: "user deleted successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to login", err: err.message });
        return;
    }
};
exports.deleteAUser = deleteAUser;
const deletAllUsers = async (req, res) => {
    try {
        await userModel_1.userModel.deleteMany();
        res.status(200).json({ message: "users deleted successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured trying to login", err: err.message });
        return;
    }
};
exports.deletAllUsers = deletAllUsers;
//# sourceMappingURL=userController.js.map