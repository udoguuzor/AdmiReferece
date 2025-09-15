"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const BookController_1 = require("../controller/BookController");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post("/create", BookController_1.createBook);
exports.bookRouter.get("/getOne/:id", BookController_1.getABook);
exports.bookRouter.get("/getAll", BookController_1.getAllBooks);
exports.bookRouter.patch("/update/:id", BookController_1.updateBook);
exports.bookRouter.delete("/deleteBook/:id", BookController_1.deleteABook);
exports.bookRouter.delete("/deleteAll", BookController_1.deleteAllBooks);
//# sourceMappingURL=BookRoutes.js.map