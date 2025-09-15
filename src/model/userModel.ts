import mongoose from "mongoose";

export interface IUSer extends Document{
  name:string,
  password: string,
  email:string,
  phoneNo:string,
  isLogin: boolean,
  book: mongoose.Types.ObjectId[]
  role: string

}


const userSchema:mongoose.Schema = new mongoose.Schema<IUSer>({
  name: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  phoneNo: {type: String, required:true},
  isLogin: {type: Boolean, default: false},
  book: [{type:mongoose.Types.ObjectId, ref:"book"}],
  role: {type: String, default: "user"}
},
{timestamps: true}
)


export const userModel = mongoose.model<IUSer>("book", userSchema)