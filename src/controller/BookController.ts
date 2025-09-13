import express, {Request, Response} from "express"
import { bookModel, IBook } from "../model/bookModel";
import { userModel } from "../model/userModel";


export const createBook = async(req:Request, res:Response): Promise<void>=>{
    try{
        const {title, yearOfPublication, category, author} = req.body;
        if(!title || !yearOfPublication || !category || !author){
            res.status(400).json({mesage:"All fields are required"})
            return;
        }
        const bookExist = await bookModel.findOne({author});
        if(bookExist){
            res.status(401).json({message: "Book Already Exist"})
            return;
        }
        const newBook = await bookModel.create({title, category, yearOfPublication, author});
        res.status(201).json({message: "Book created successfully", data: newBook})
    }catch(err: any){
        res.status(500).json({message: " An error occured trying to create book", err:err.message})
        return;
    }
}

export const getAllBooks = async(req:Request, res:Response): Promise<void>=>{
    try{
        const getAll = await bookModel.find();
        res.status(200).json({message:"All books gotten successfully", data:getAll})
    }catch(err: any){
        res.status(500).json({message: " An error occured trying to getting all books", err:err.message})
        return;
    }
}

export const getABook = async(req:Request, res:Response): Promise<void>=>{
    try{
        const {id} = req.params;
        const getBook = await bookModel.findById(id).populate("Book");
        if(!getBook){
            res.status(404).json({message: "Book not found"});
            return;
        }
        res.status(200).json({message: "book gotten successfully", data: getBook})
    }catch(err: any){
        res.status(500).json({message: " An error occured trying to getting book", err:err.message})
        return;
    }
}
export const updateBook = async(req:Request, res:Response): Promise<void> =>{
    try{
        const {title, author, category, yearOfPublication } = req.body as Partial<IBook>
        const {id} = req.params; 
        const userUpdate = await userModel.findByIdAndUpdate(id)
        if(!userUpdate){
            res.status(404).json({message: " No user found tp update"});
            return;
        }
        res.status(200).json({message: "User updated successfully", data: userUpdate})
    }catch(err: any){
        res.status(500).json({message: " An error occured trying to updating book", err:err.message})
        return;
    }
}

export const deleteABook = async(req:Request, res: Response): Promise<void> =>{
   try{
     const deleteBook = await userModel.findByIdAndDelete(req.params.id)
    if(deleteBook){
        res.status(404).json({message: "No book found to delete"})
        return;
    }
    res.status(200).json({message: "no book found to delete"})
    return
   }catch(err: any){
        res.status(500).json({message: " An error occured trying to deleting book", err:err.message})
        return;
    }
}

export const deleteAllBooks = async(req:Request, res: Response): Promise<void> =>{
    try{
      await userModel.deleteMany()
      res.status(200).json({message: "Books deleted successfully"});
      return
      
    }catch(err: any){
        res.status(500).json({message: " An error occured trying to detete All book", err:err.message})
        return;
    }
}