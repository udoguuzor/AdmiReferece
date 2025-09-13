import { Request, Response } from "express";
import { AdminModel, IAdmin } from "../model/AdminModel";
import argon2 from "argon2"


export const signUpAdmin = async(req:Request, res:Response):Promise<void>=>{
   try{
    const {name, email, password, phoneNo} = req.body;
    if(!name || !email || !password || !phoneNo){
        res.status(400).json({message: "All fields are required"})
        return
    }
    const findAdmin = await AdminModel.findOne({email});
    if(findAdmin){
        res.status(401).json({message: "Admin Already Exist"})
        return
    }

    const hashPassword = await argon2.hash(password)
    const createAdmin  = await AdminModel.create({
       name, password:hashPassword, email, phoneNo, isLogin: false, role: "Admin"
    })
    res.status(201).json({message: "Admin created successfully", data: createAdmin})
    return
   }catch(err:any){
    res.status(500).json({message: "An error occured creating Admin", err: err.message});
    return
   } 
}


export const loginAdmin = async(req:Request, res:Response): Promise<void>=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(401).json({message: "All field are required"})
            return
        }
        const Admin = await AdminModel.findOne({email});
        if(!Admin){
            res.status(404).json({message: "No Admin found"})
            return
        }
        const isMatch = await argon2.verify(password, Admin.password);
        if(!isMatch){
            res.status(409).json({message: "invalid credentials"});
            return
        }
         Admin.isLogin= true
         await Admin.save()
        res.status(200).json({message: "user logged in successfully", name: Admin.name,
             email:Admin.email,
              password: Admin.password,
               phoneNo: Admin.phoneNo, 
               role:Admin.role })
    }catch(err:any){
    res.status(500).json({message: "An error occured logging Admin", err: err.message});
    return
   } 
}


export const getAdmin = async(req: Request, res: Response): Promise<void> =>{
    try{
        const {id} = req.params;
        const findOneAdmin = await AdminModel.findById(id);
        if(!findOneAdmin){
            res.status(404).json({message: "Admin not found"})
            req
        }
        res.status(200).json({message: "Admin gotten successfully", data: findOneAdmin})
    }catch(err:any){
    res.status(500).json({message: "An error occured getting Admin", err: err.message});
    return
   } 
}

export const getAllAdmin = async(req:Request, res:Response): Promise<void> =>{
    try{
        const getAllAdmin = await AdminModel.find();
        res.status(200).json({message: "All Admin gotten Successfully", data: getAllAdmin})
    }catch(err:any){
    res.status(500).json({message: "An error occured getting All Admin", err: err.message});
    return
   } 
}


export const updateAdmin = async(req: Request, res: Response): Promise<void>=>{
    try{
        const {name, email, password, phoneNo} = req.body as Partial<IAdmin>
        const {id} = req.params
        const updateAdmin = await AdminModel.findByIdAndUpdate(id, {name, password, email, phoneNo})
        if(!updateAdmin){
            res.status(404).json({message: "No Admin to update"})
            return
        }
        res.status(200).json({message: "Admin updated successfully", data: updateAdmin})
        return
    }catch(err:any){
    res.status(500).json({message: "An error occured updating Admin", err: err.message});
    return
   } 
}