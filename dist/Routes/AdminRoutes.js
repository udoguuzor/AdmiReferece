"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
exports.AdminRouter = express_1.default.Router();
exports.AdminRouter.post("/create", AdminController_1.signUpAdmin);
exports.AdminRouter.post("/login", AdminController_1.loginAdmin);
exports.AdminRouter.get("/getOne/:id", AdminController_1.getAdmin);
exports.AdminRouter.get("/getAll", AdminController_1.getAllAdmin);
exports.AdminRouter.patch("/update", AdminController_1.updateAdmin);
//# sourceMappingURL=AdminRoutes.js.map