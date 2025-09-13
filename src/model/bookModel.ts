import mongoose from "mongoose";



export interface IBook extends Document{
    title: string,
    yearOfPublication: number,
    category:string,
    author: string,
    seller: mongoose.Types.ObjectId
}

const bookSchema:mongoose.Schema = new mongoose.Schema<IBook>({
    title: {type:String,required:true },
    category: {type: String, required:true},
    yearOfPublication: {type: Number, required: true},
    author: {type: String, required: true},
    seller: {type:mongoose.Schema.Types.ObjectId, ref: "Book"}
},
{
    timestamps: true
})

export const bookModel = mongoose.model<IBook>("Book", bookSchema)