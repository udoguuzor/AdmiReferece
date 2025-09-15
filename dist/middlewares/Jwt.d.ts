import { Request, Response, NextFunction } from "express";
import { IUSer } from "../model/userModel";
interface AuthRequest extends Request {
    user?: IUSer;
}
export declare const JWT: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=Jwt.d.ts.map