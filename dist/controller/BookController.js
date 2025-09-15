"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllBooks = exports.deleteABook = exports.updateBook = exports.getABook = exports.getAllBooks = exports.createBook = void 0;
const bookModel_1 = require("../model/bookModel");
const createBook = async (req, res) => {
    try {
        const { title, yearOfPublication, category, author } = req.body;
        if (!title || !yearOfPublication || !category || !author) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const bookExist = await bookModel_1.bookModel.findOne({ title, author }); // Check for a book with both title and author
        if (bookExist) {
            res.status(401).json({ message: "Book Already Exist" });
            return;
        }
        const newBook = await bookModel_1.bookModel.create({ title, category, yearOfPublication, author });
        res.status(201).json({ message: "Book created successfully", data: newBook });
    }
    catch (err) {
        res.status(500).json({ message: " An error occured trying to create book", err: err.message });
        return;
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res) => {
    try {
        const getAll = await bookModel_1.bookModel.find();
        res.status(200).json({ message: "All books gotten successfully", data: getAll });
    }
    catch (err) {
        res.status(500).json({ message: " An error occured trying to getting all books", err: err.message });
        return;
    }
};
exports.getAllBooks = getAllBooks;
const getABook = async (req, res) => {
    try {
        const { id } = req.params;
        // There is nothing to populate on a book model, unless it references a user.
        // Assuming your book schema doesn't reference another model, you just find it.
        const getBook = await bookModel_1.bookModel.findById(id).populate("seller");
        if (!getBook) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.status(200).json({ message: "book gotten successfully", data: getBook });
    }
    catch (err) {
        res.status(500).json({ message: " An error occured trying to getting book", err: err.message });
        return;
    }
};
exports.getABook = getABook;
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Use bookModel instead of userModel
        const updatedBook = await bookModel_1.bookModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBook) {
            res.status(404).json({ message: "No book found to update" });
            return;
        }
        res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    }
    catch (err) {
        res.status(500).json({ message: " An error occured trying to updating book", err: err.message });
        return;
    }
};
exports.updateBook = updateBook;
const deleteABook = async (req, res) => {
    try {
        // Use bookModel instead of userModel
        const deleteBook = await bookModel_1.bookModel.findByIdAndDelete(req.params.id);
        // The condition was backward; if deleteBook exists, it means a book was found and deleted.
        if (!deleteBook) {
            res.status(404).json({ message: "No book found to delete" });
            return;
        }
        res.status(200).json({ message: "Book deleted successfully", data: deleteBook });
        return;
    }
    catch (err) {
        res.status(500).json({ message: " An error occured trying to deleting book", err: err.message });
        return;
    }
};
exports.deleteABook = deleteABook;
const deleteAllBooks = async (req, res) => {
    try {
        // Use bookModel instead of userModel
        await bookModel_1.bookModel.deleteMany();
        res.status(200).json({ message: "Books deleted successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: " An error occured trying to delete All books", err: err.message });
        return;
    }
};
exports.deleteAllBooks = deleteAllBooks;
//# sourceMappingURL=BookController.js.map