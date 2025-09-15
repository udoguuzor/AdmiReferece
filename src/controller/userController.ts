import { Request, Response } from "express";
import { IUSer, userModel } from "../model/userModel";
import argon2 from "argon2"
import generateToken from "../middlewares/generate";

export const signUp = async(req:Request, res:Response):Promise<void>=>{
    try{
        const {email, name, password, phoneNo} = req.body;
        if(!email || !password || !name || !phoneNo){
            res.status(400).json({message:"All fileds are required"});
            return;
        }
        const findUser = await userModel.findOne({email});
        if(findUser){
            res.status(401).json({message: "User already exist"});
            return;
        }
        const hashPassword = await argon2.hash(password);
        const createUser = await userModel.create({email, password:hashPassword, phoneNo, name, isLogin:false})
        res.status(201).json({message: "User created successfully", data: createUser})
        return;
    }catch(err:any){
        res.status(500).json({message: "An error occured trying to  create user", err: err.message});
        return;
    }
}


export const loginUser = async(req:Request, res:Response): Promise<void>=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({message:"All field are required"});
            return;
        }
        const user = await userModel.findOne({email});
        if(!user){
            res.status(404).json({message: "no user found"})
            return;
        }
        const isMatch = await argon2.verify(user.password, password);
        if(!isMatch){
            res.status(409).json({message: "invalid credentials"})
            return
        }
        user.isLogin = true;
        await user.save()
        const token = generateToken(String(user._id), user.role)
       res.status(200).json({message: "user logged in successfully", name: user.name,
         email: user.email,
          password:user.password, 
          phoneNo:user.phoneNo,
          token
        })
        return;
    }catch(err:any){
        res.status(500).json({message: "An error occured trying to login", err: err.message})
        return
    }
}



export const getAUser = async(req:Request, res: Response):Promise<void>=>{
    try{
      const {id} = req.params; 
      const getUser = await userModel.findById(id).populate("book")
      if(!getUser){
        res.status(401).json({message: "User not found"})
        return
      }
      res.status(200).json({message: "User gotten succefully", data: getUser})
      return
    }catch(err: any){
        res.status(500).json({message: "An error occured trying to get a user",err:err.message})
        return;
    }
}

export const getALlUsers = async(req: Request, res: Response):Promise<void>=>{
    try{
        const users = await userModel.find();
        res.status(200).json({message: "users gotten successfully", data: users})
    }catch(err:any){
        res.status(500).json({message: "An error occured trying to login", err: err.message})
        return
    }
}

export const updateUser = async(req: Request, res:Response):Promise<void>=>{
    try{
        const {name, email, password, phoneNo} = req.body as Partial<IUSer>;
        const {id} = req.params;
        const user = await userModel.findByIdAndUpdate(id, {name, email, password, phoneNo}, {new: true});
        if(!user){
            res.status(404).json({message: "No user found to update"})
            return;
        }
        res.status(200).json({message: "user updated successfully", data: user})
        return;
    }catch(err:any){
        res.status(500).json({message: "An error occured trying to login", err: err.message})
        return
    }
}

export const deleteAUser = async(req:Request, res:Response): Promise<void>=>{
    try{
        const {id} = req.params
        const deletAUser = await userModel.findByIdAndDelete(id)
        if(!deletAUser){
            res.status(404).json({message: " no user found to delete"})
            return
        }
        res.status(200).json({message: "user deleted successfully"})
        return
    }catch(err:any){
        res.status(500).json({message: "An error occured trying to login", err: err.message})
        return
    }
}

export const deletAllUsers = async(req:Request, res:Response): Promise<void>=>{
    try{
        await userModel.deleteMany();
        res.status(200).json({message: "users deleted successfully"})
        return;
    }catch(err:any){
        res.status(500).json({message: "An error occured trying to login", err: err.message})
        return
    }
}


