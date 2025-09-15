"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
exports.userRouter = (0, express_1.default)();
exports.userRouter.post("/create", userController_1.signUp);
exports.userRouter.post("/login", userController_1.loginUser);
exports.userRouter.get("/getOne/:id", userController_1.getAUser);
exports.userRouter.get("/getAll", userController_1.getALlUsers);
exports.userRouter.patch("/user", userController_1.updateUser);
exports.userRouter.delete("/deleteUser/:id", userController_1.deleteAUser);
exports.userRouter.delete("/deleteAll", userController_1.deletAllUsers);
//# sourceMappingURL=userRoutes.js.map