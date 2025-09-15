"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = exports.getAllAdmin = exports.getAdmin = exports.loginAdmin = exports.signUpAdmin = void 0;
const AdminModel_1 = require("../model/AdminModel");
const argon2_1 = __importDefault(require("argon2"));
const signUpAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNo } = req.body;
        if (!name || !email || !password || !phoneNo) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const findAdmin = await AdminModel_1.AdminModel.findOne({ email });
        if (findAdmin) {
            res.status(401).json({ message: "Admin Already Exist" });
            return;
        }
        const hashPassword = await argon2_1.default.hash(password);
        const createAdmin = await AdminModel_1.AdminModel.create({
            name, password: hashPassword, email, phoneNo, isLogin: false, role: "Admin"
        });
        res.status(201).json({ message: "Admin created successfully", data: createAdmin });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured creating Admin", err: err.message });
        return;
    }
};
exports.signUpAdmin = signUpAdmin;
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ message: "All field are required" });
            return;
        }
        const Admin = await AdminModel_1.AdminModel.findOne({ email });
        if (!Admin) {
            res.status(404).json({ message: "No Admin found" });
            return;
        }
        const isMatch = await argon2_1.default.verify(password, Admin.password);
        if (!isMatch) {
            res.status(409).json({ message: "invalid credentials" });
            return;
        }
        Admin.isLogin = true;
        await Admin.save();
        res.status(200).json({ message: "user logged in successfully", name: Admin.name,
            email: Admin.email,
            password: Admin.password,
            phoneNo: Admin.phoneNo,
            role: Admin.role });
    }
    catch (err) {
        res.status(500).json({ message: "An error occured logging Admin", err: err.message });
        return;
    }
};
exports.loginAdmin = loginAdmin;
const getAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const findOneAdmin = await AdminModel_1.AdminModel.findById(id);
        if (!findOneAdmin) {
            res.status(404).json({ message: "Admin not found" });
            req;
        }
        res.status(200).json({ message: "Admin gotten successfully", data: findOneAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occured getting Admin", err: err.message });
        return;
    }
};
exports.getAdmin = getAdmin;
const getAllAdmin = async (req, res) => {
    try {
        const getAllAdmin = await AdminModel_1.AdminModel.find();
        res.status(200).json({ message: "All Admin gotten Successfully", data: getAllAdmin });
    }
    catch (err) {
        res.status(500).json({ message: "An error occured getting All Admin", err: err.message });
        return;
    }
};
exports.getAllAdmin = getAllAdmin;
const updateAdmin = async (req, res) => {
    try {
        const { name, email, password, phoneNo } = req.body;
        const { id } = req.params;
        const updateAdmin = await AdminModel_1.AdminModel.findByIdAndUpdate(id, { name, password, email, phoneNo });
        if (!updateAdmin) {
            res.status(404).json({ message: "No Admin to update" });
            return;
        }
        res.status(200).json({ message: "Admin updated successfully", data: updateAdmin });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "An error occured updating Admin", err: err.message });
        return;
    }
};
exports.updateAdmin = updateAdmin;
//# sourceMappingURL=AdminController.js.map