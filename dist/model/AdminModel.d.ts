import mongoose from "mongoose";
export interface IAdmin extends Document {
    name: string;
    password: string;
    email: string;
    phoneNo: string;
    role: string;
    isLogin: boolean;
}
export declare const AdminModel: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=AdminModel.d.ts.map