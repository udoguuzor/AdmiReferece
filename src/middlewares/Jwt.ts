import { Request, Response, NextFunction } from "express";
import  jwt,{ JwtPayload} from "jsonwebtoken"
import { IUSer, userModel } from "../model/userModel";

interface AuthRequest extends Request {
    user?:IUSer
}


export const JWT = async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
    const token = req.header("Authorization")?.replace("Bearer", "");
    if(!token){
        res.status(401).json({message: "No token found"})
        return;
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await userModel.findById(decoded.id || decoded._id);
        if(!user){
            res.status(404).json({message:" user not found"})
            return;
        }
        req.user = user as IUSer;
        next()
    }catch(err:any){
        res.status(402).json({message: "invalid token", err: err.message})
        return
    }
}