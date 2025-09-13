import mongoose from "mongoose";


export interface IAdmin extends Document{
  name: string, 
  password: string,
  email:string,
  phoneNo:string,
  role: string,
  isLogin: boolean
}

const AdminSchema: mongoose.Schema = new mongoose.Schema<IAdmin>({
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: { type: String, required: true, unique: true},
  phoneNo: { type: String, required: true},
  role: {type: String, default: "Admin"},
  isLogin: { type: Boolean, default: false}
}, 
{timestamps: true}
)



export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema)