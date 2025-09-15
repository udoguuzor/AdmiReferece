"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dataBase_1 = __importDefault(require("./config/dataBase"));
const userRoutes_1 = require("./Routes/userRoutes");
const BookRoutes_1 = require("./Routes/BookRoutes");
const AdminRoutes_1 = require("./Routes/AdminRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/user", userRoutes_1.userRouter);
app.use("/api/book", BookRoutes_1.bookRouter);
app.use("/api/admin", AdminRoutes_1.AdminRouter);
const PORT = process.env.PORT;
(0, dataBase_1.default)();
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map