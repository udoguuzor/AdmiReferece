import mongoose from "mongoose";
export interface IUSer extends Document {
    name: string;
    password: string;
    email: string;
    phoneNo: string;
    isLogin: boolean;
    book: mongoose.Types.ObjectId[];
    role: string;
}
export declare const userModel: mongoose.Model<IUSer, {}, {}, {}, mongoose.Document<unknown, {}, IUSer, {}, {}> & IUSer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=userModel.d.ts.map