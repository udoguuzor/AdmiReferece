import express,{ Router } from "express";
import { createBook, deleteABook, deleteAllBooks, getABook, getAllBooks, updateBook } from "../controller/BookController";
import { deleteAUser } from "../controller/userController";



export const bookRouter: Router  = express.Router()

bookRouter.post("/create", createBook);
bookRouter.get("/getOne/:id", getABook);
bookRouter.get("/getAll", getAllBooks);
bookRouter.patch("/update/:id", updateBook);
bookRouter.delete("/deleteBook/:id",deleteABook );
bookRouter.delete("/deleteAll", deleteAllBooks)